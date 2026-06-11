// ─── Ghost Rider Luxury Bikes – Auth Service ────────────────────────────────
// Handles all communication with the Laravel Sanctum backend.
// Base URL is read from the VITE_API_URL env variable (fallback: localhost).

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: AuthUser;
  token?: string; // returned when using token-based Sanctum
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// ── helpers ──────────────────────────────────────────────────────────────────

/**
 * Build common headers for API requests.
 * Attaches the Bearer token when available.
 */
function authHeaders(extra: HeadersInit = {}): HeadersInit {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(extra as Record<string, string>),
  };
}

/**
 * Make a JSON API request.
 * If no token is stored, falls back to the Sanctum SPA CSRF-cookie flow.
 */
async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = localStorage.getItem('auth_token');

  // If we don't have a token, use the CSRF-cookie flow (Sanctum SPA)
  if (!token) {
    try {
      await fetch(`${API_BASE}/sanctum/csrf-cookie`, {
        method: 'GET',
        credentials: 'include',
      });
    } catch {
      // Silently continue – the CSRF cookie may already exist
    }

    const xsrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

    return fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        ...authHeaders(options.headers as Record<string, string>),
        ...(xsrfToken ? { 'X-XSRF-TOKEN': decodeURIComponent(xsrfToken) } : {}),
      },
    });
  }

  // Token-based flow – simpler, no cookies needed
  return fetch(url, {
    ...options,
    headers: authHeaders(options.headers as Record<string, string>),
  });
}

// ── public API ────────────────────────────────────────────────────────────────

/**
 * Login with email + password.
 * Supports both cookie-based (SPA) and token-based Sanctum.
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await apiFetch(`${API_BASE}/api/login`, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = data as ApiError;
    const firstError =
      err.errors ? Object.values(err.errors).flat()[0] : err.message ?? 'Authentication failed.';
    throw new Error(firstError);
  }

  // Persist token when returned (token-mode Sanctum)
  if (data.token) {
    localStorage.setItem('auth_token', data.token);
  }
  if (data.user) {
    localStorage.setItem('auth_user', JSON.stringify(data.user));
  }

  return data as AuthResponse;
}

/** Fetch the currently authenticated user from /api/user */
export async function fetchAuthUser(): Promise<AuthUser | null> {
  try {
    const response = await apiFetch(`${API_BASE}/api/user`, {
      method: 'GET',
    });
    if (!response.ok) return null;
    return (await response.json()) as AuthUser;
  } catch {
    return null;
  }
}

/** Logout – revokes token on server, then clears local storage */
export async function logout(): Promise<void> {
  try {
    await apiFetch(`${API_BASE}/api/logout`, {
      method: 'POST',
    });
  } finally {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }
}

/** Check if a token / session is persisted locally */
export function isLocallyAuthenticated(): boolean {
  return !!localStorage.getItem('auth_token') || !!localStorage.getItem('auth_user');
}

/** Retrieve the locally cached user (may be stale) */
export function getLocalUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem('auth_user');
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

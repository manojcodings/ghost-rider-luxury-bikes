import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/context/AuthContext';

/**
 * Wraps protected routes. Redirects to /login if the user is not authenticated.
 * Shows nothing while the auth state is being restored from storage/server.
 */
export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Full-screen skeleton while verifying session
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-gold border-t-transparent animate-spin" />
          <p className="font-accent text-gold/60 tracking-widest text-sm uppercase">
            Verifying session…
          </p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

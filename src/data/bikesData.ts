export interface FeaturedBike {
  id: number;
  name: string;
  engine: string;
  rating: number;
  price: string;
  image: string;
  alt: string;
}

export interface ShowcaseBike {
  id: number;
  name: string;
  engine: string;
  topSpeed: string;
  price: string;
  image: string;
  alt: string;
}

export interface Collection {
  id: number;
  name: string;
  subtitle: string;
  image: string;
  alt: string;
}

export interface NavLink {
  name: string;
  href: string;
  hasDropdown?: boolean;
}

export interface AboutOption {
  name: string;
  href: string;
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

// Helper to build Pexels URL
const pexels = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&dpr=1`;

// Helper to build Unsplash URL
const unsplash = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80`;

/* ──────────────────────────────────────────────
   FEATURED BIKES (6 cards, 600x450)
   ────────────────────────────────────────────── */
export const featuredBikes: FeaturedBike[] = [
  {
    id: 1,
    name: "Kawasaki Ninja ZX10R",
    engine: "998cc",
    rating: 5,
    price: "16,50,000",
    image: unsplash("1568772585407-9361f9bf3a87", 600, 450),
    alt: "Kawasaki Ninja ZX10R premium superbike in showroom lighting",
  },
  {
    id: 2,
    name: "Suzuki Hayabusa",
    engine: "1340cc",
    rating: 5,
    price: "16,90,000",
    image: pexels(10701887, 600, 450),
    alt: "Suzuki Hayabusa GSX1300R sports touring motorcycle",
  },
  {
    id: 3,
    name: "BMW S1000RR",
    engine: "999cc",
    rating: 5,
    price: "20,50,000",
    image: pexels(26890150, 600, 450),
    alt: "BMW S1000RR white superbike with asymmetric headlights",
  },
  {
    id: 4,
    name: "Ducati Panigale V4",
    engine: "1103cc",
    rating: 5,
    price: "23,50,000",
    image: unsplash("1591637333184-19aa84b3e01f", 600, 450),
    alt: "Ducati Panigale V4 red Italian superbike",
  },
  {
    id: 5,
    name: "KTM RC 390",
    engine: "373cc",
    rating: 4,
    price: "3,20,000",
    image: unsplash("1449426468159-d96dbf08f19f", 600, 450),
    alt: "KTM RC 390 orange and black sports bike",
  },
  {
    id: 6,
    name: "Royal Enfield Bullet",
    engine: "346cc",
    rating: 4,
    price: "1,80,000",
    image: pexels(28223410, 600, 450),
    alt: "Royal Enfield Bullet 350 classic black motorcycle chrome details",
  },
];

/* ──────────────────────────────────────────────
   SHOWCASE BIKES (12 cards, 400x250)
   ────────────────────────────────────────────── */
export const showcaseBikes: ShowcaseBike[] = [
  {
    id: 1,
    name: "Ninja ZX10R",
    engine: "998cc",
    topSpeed: "299 km/h",
    price: "16,50,000",
    image: unsplash("1568772585407-9361f9bf3a87", 400, 250),
    alt: "Kawasaki Ninja ZX10R",
  },
  {
    id: 2,
    name: "Hayabusa",
    engine: "1340cc",
    topSpeed: "312 km/h",
    price: "16,90,000",
    image: pexels(17302064, 400, 250),
    alt: "Suzuki Hayabusa",
  },
  {
    id: 3,
    name: "BMW S1000RR",
    engine: "999cc",
    topSpeed: "305 km/h",
    price: "20,50,000",
    image: pexels(26890150, 400, 250),
    alt: "BMW S1000RR",
  },
  {
    id: 4,
    name: "Ducati Panigale V4",
    engine: "1103cc",
    topSpeed: "300 km/h",
    price: "23,50,000",
    image: unsplash("1591637333184-19aa84b3e01f", 400, 250),
    alt: "Ducati Panigale V4",
  },
  {
    id: 5,
    name: "KTM Duke 390",
    engine: "373cc",
    topSpeed: "167 km/h",
    price: "3,15,000",
    image: pexels(7996372, 400, 250),
    alt: "KTM Duke 390 naked sports bike",
  },
  {
    id: 6,
    name: "KTM RC 390",
    engine: "373cc",
    topSpeed: "179 km/h",
    price: "3,20,000",
    image: unsplash("1449426468159-d96dbf08f19f", 400, 250),
    alt: "KTM RC 390",
  },
  {
    id: 7,
    name: "Royal Enfield Bullet",
    engine: "346cc",
    topSpeed: "110 km/h",
    price: "1,80,000",
    image: pexels(4297508, 400, 250),
    alt: "Royal Enfield Bullet",
  },
  {
    id: 8,
    name: "RE Classic 350",
    engine: "349cc",
    topSpeed: "114 km/h",
    price: "2,05,000",
    image: pexels(984802, 400, 250),
    alt: "Royal Enfield Classic 350",
  },
  {
    id: 9,
    name: "Apache RR310",
    engine: "312cc",
    topSpeed: "160 km/h",
    price: "2,65,000",
    image: pexels(20674847, 400, 250),
    alt: "TVS Apache RR310 sports bike",
  },
  {
    id: 10,
    name: "Yamaha R15 V4",
    engine: "155cc",
    topSpeed: "150 km/h",
    price: "1,85,000",
    image: unsplash("1568772585407-9361f9bf3a87", 400, 250),
    alt: "Yamaha R15 V4",
  },
  {
    id: 11,
    name: "Honda CBR650R",
    engine: "649cc",
    topSpeed: "220 km/h",
    price: "9,35,000",
    image: unsplash("1591637333184-19aa84b3e01f", 400, 250),
    alt: "Honda CBR650R",
  },
  {
    id: 12,
    name: "Triumph Street Triple",
    engine: "765cc",
    topSpeed: "245 km/h",
    price: "10,50,000",
    image: pexels(27704082, 400, 250),
    alt: "Triumph Street Triple 765 R",
  },
];

/* ──────────────────────────────────────────────
   COLLECTIONS (4 cards, 500x700)
   ────────────────────────────────────────────── */
export const collections: Collection[] = [
  {
    id: 1,
    name: "Racing Bikes",
    subtitle: "Feel the Adrenaline",
    image: pexels(17302064, 500, 700),
    alt: "Racing superbike on track with adrenaline fuelled speed",
  },
  {
    id: 2,
    name: "Luxury Bikes",
    subtitle: "Ride in Style",
    image: pexels(26890150, 500, 700),
    alt: "BMW S1000RR luxury superbike in premium showroom",
  },
  {
    id: 3,
    name: "Bullet Collection",
    subtitle: "Timeless Classic",
    image: pexels(8761926, 500, 700),
    alt: "Royal Enfield Bullet classic motorcycle vintage style",
  },
  {
    id: 4,
    name: "Sports Bikes",
    subtitle: "Pure Performance",
    image: unsplash("1591637333184-19aa84b3e01f", 500, 700),
    alt: "Ducati Panigale V4 sports bike performance machine",
  },
];

/* ──────────────────────────────────────────────
   NAVIGATION
   ────────────────────────────────────────────── */
export const navLinks: NavLink[] = [
  { name: "Home",        href: "/"            },  
  { name: "Bikes",       href: "/bikes"       },  
  { name: "Racing",      href: "/racing"      },  
  { name: "Luxury",      href: "/luxury"      },  
  { name: "Collections", href: "/collections" },  
  { name: "Contact",     href: "/contact"     },  
  { name: "About",       href: "/about"       },  
];

/* ──────────────────────────────────────────────
   FOOTER LINKS
   ────────────────────────────────────────────── */
export const footerLinks: {
  quickLinks: FooterLink[];
  categories: FooterLink[];
} = {
  quickLinks: [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "About" },
    { name: "Our Bikes", href: "#bikes" },
    { name: "Test Ride", href: "#contact" },
    { name: "Contact", href: "#contact" },
  ],
  categories: [
    { name: "Racing Bikes", href: "#collections" },
    { name: "Luxury Bikes", href: "#showcase" },
    { name: "Sports Bikes", href: "#showcase" },
    { name: "Bullet Collection", href: "#collections" },
  ],
};

/* ──────────────────────────────────────────────
   SOCIAL MEDIA LINKS (verified profiles)
   ────────────────────────────────────────────── */
export const socialLinks = {
  instagram: "https://www.instagram.com/m.rajpott/",
  facebook: "https://www.facebook.com/",
  twitter: "https://twitter.com/",
  youtube: "https://www.youtube.com/",
  linkedin: "https://www.linkedin.com/",
};

/* ──────────────────────────────────────────────
   HERO BACKGROUND
   ────────────────────────────────────────────── */
export const heroBackground =
  unsplash("1568772585407-9361f9bf3a87", 1920, 1080);

/* ──────────────────────────────────────────────
 BIKE BRANDS DROPDOWN
 ────────────────────────────────────────────── */
export const makeOptions: AboutOption[] = [
  { name: "Ducati", href: "#ducati" },
  { name: "Harley-Davidson", href: "#harley" },
  { name: "BMW Motorrad", href: "#bmw" },
  { name: "Kawasaki", href: "#kawasaki" },
  { name: "Triumph", href: "#triumph" },
];
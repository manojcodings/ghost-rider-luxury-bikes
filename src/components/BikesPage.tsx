import TopHeader from './TopHeader';
import Navbar from './Navbar';
import Footer from './Footer';
import FeaturedBikes from './FeaturedBikes';
import BikeCollections from './BikeCollections';
import BikeShowcase from './BikeShowcase';

export default function BikesPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <TopHeader />
      <Navbar />

      {/* Small spacer for fixed navbar */}
      <div className="pt-[110px]" />

      {/* FeaturedBikes already has its own title & section */}
      <FeaturedBikes />

      {/* BikeCollections already has its own title & section */}
      <BikeCollections />

      {/* BikeShowcase already has its own title & section */}
      <BikeShowcase />

      <Footer />
    </div>
  );
}
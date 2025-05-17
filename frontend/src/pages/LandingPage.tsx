import { Link } from 'react-router-dom';
import { Search, ArrowRight, Star, Shield, Clock } from 'lucide-react';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-dark/95 to-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-96 h-96 bg-primary-light/20 rounded-full blur-3xl absolute -top-32 -left-32"></div>
          <div className="w-80 h-80 bg-primary/10 rounded-full blur-2xl absolute -bottom-20 right-0"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
                Find Your Perfect Ride for Any Occasion
              </h1>
              <p className="text-lg text-secondary mb-8">
                Browse our extensive collection of premium vehicles and book your ideal car in minutes.
                Safe, reliable, and affordable car rentals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/cars" className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors text-center shadow">
                  Browse Cars
                </Link>
                <Link to="/signup" className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-primary transition-colors text-center shadow">
                  Sign Up
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="/assets/hero.png" 
                alt="Luxury car" 
                className="w-full h-auto rounded-lg shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = "/assets/car-placeholder.jpg";
                  e.currentTarget.onerror = () => {
                    e.currentTarget.src = "https://placehold.co/600x400?text=Car+Image";
                    e.currentTarget.onerror = null;
                  };
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-10">
        <div className="container-custom">
          <div className="bg-white p-6 rounded-lg shadow-lg -mt-16 relative z-10">
            <h2 className="text-2xl font-bold mb-4">Find Your Car</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Location"
                  className="input-field pl-10"
                />
              </div>
              <div className="relative">
                <input
                  type="date"
                  className="input-field"
                  placeholder="Pick-up Date"
                />
              </div>
              <div className="relative">
                <input
                  type="date"
                  className="input-field"
                  placeholder="Return Date"
                />
              </div>
              <Link 
                to="/cars"
                className="btn-primary flex items-center justify-center gap-2"
              >
                Search Cars <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <Clock size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quick & Easy Booking</h3>
              <p className="text-gray-600">
                Book your car in minutes with our simple and intuitive platform. No hidden fees or complicated processes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <Star size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Vehicles</h3>
              <p className="text-gray-600">
                Our fleet includes only well-maintained, clean, and comfortable vehicles for the best driving experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Safe & Secure</h3>
              <p className="text-gray-600">
                All our rentals come with comprehensive insurance coverage and 24/7 roadside assistance for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular cars section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Our Popular Cars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden">
              <img 
                src="/assets/car2.png" 
                alt="SUV" 
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/400x200?text=SUV";
                }}
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">Premium SUV</h3>
                <p className="text-gray-600 mb-3">Perfect for family trips and adventures</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl text-primary font-bold">$80/day</span>
                  <Link to="/cars" className="text-primary hover:underline font-medium">View Details</Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden">
              <img 
                src="/assets/car1.png" 
                alt="Sedan" 
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/400x200?text=Sedan";
                }}
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">Luxury Sedan</h3>
                <p className="text-gray-600 mb-3">Comfort and style for business trips</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl text-primary font-bold">$65/day</span>
                  <Link to="/cars" className="text-primary hover:underline font-medium">View Details</Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden">
              <img 
                src="/assets/car3.jpg" 
                alt="Sports Car" 
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/400x200?text=Sports+Car";
                }}
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">Sports Car</h3>
                <p className="text-gray-600 mb-3">Experience the thrill of the drive</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl text-primary font-bold">$120/day</span>
                  <Link to="/cars" className="text-primary hover:underline font-medium">View Details</Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/cars" className="btn-primary inline-block shadow">
              View All Cars
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Book Your Perfect Car?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their ideal rental car with us.
          </p>
          <Link 
            to="/cars"
            className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Browse Available Cars
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

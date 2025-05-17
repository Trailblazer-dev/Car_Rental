import { Users, Shield, Award, Clock } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container-custom py-10">
      {/* Hero Section */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-6">About CarHire</h1>
            <p className="text-gray-600 text-lg mb-6">
              CarHire is a premium car rental service committed to providing high-quality vehicles and exceptional customer service. Founded in 2020, we've quickly become a trusted name in the car rental industry.
            </p>
            <p className="text-gray-600 text-lg">
              Our mission is simple: to make car rental easy, affordable, and enjoyable. Whether you're traveling for business or pleasure, we have the perfect car for your needs.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/assets/car-car-park.jpg" 
              alt="CarHire team" 
              className="w-full h-auto"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/600x400?text=About+Us";
              }}
            />
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-12 bg-gray-50 my-12 rounded-lg">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These core values guide everything we do at CarHire, from how we maintain our vehicles to how we interact with our customers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Clock className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Reliability</h3>
            <p className="text-gray-600">
              We're committed to providing well-maintained vehicles that won't let you down.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Safety</h3>
            <p className="text-gray-600">
              Your safety is our priority, with regular maintenance and thorough cleaning protocols.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Customer Focus</h3>
            <p className="text-gray-600">
              We go above and beyond to ensure our customers have the best possible experience.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Award className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Quality</h3>
            <p className="text-gray-600">
              We offer only the finest vehicles in our fleet, meticulously maintained for your comfort.
            </p>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated professionals who make CarHire the best in the industry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src="/assets/ceo.jpg" 
              alt="Sarah Johnson, CEO" 
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/400x300?text=Team+Member";
              }}
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
              <p className="text-primary mb-3">CEO & Founder</p>
              <p className="text-gray-600">
                With over 15 years of experience in the automotive industry, Sarah leads our team with passion and expertise.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src="/assets/op.jpg" 
              alt="Michael Chen, Operations Director" 
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/400x300?text=Team+Member";
              }}
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Michael Chen</h3>
              <p className="text-primary mb-3">Operations Director</p>
              <p className="text-gray-600">
                Michael ensures our entire fleet operates smoothly and maintains our high standards of quality and service.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src="/assets/cs.png" 
              alt="Lisa Okoye, Customer Service Manager" 
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/400x300?text=Team+Member";
              }}
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Lisa Okoye</h3>
              <p className="text-primary mb-3">Customer Service Manager</p>
              <p className="text-gray-600">
                Lisa leads our customer service team, ensuring every client has an exceptional rental experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

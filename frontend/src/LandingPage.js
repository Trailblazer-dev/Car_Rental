import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <div className="theme-bg min-h-screen">
      {/* Hero Section */}
      <section
        id="features"
        className="h-screen bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
        data-aos="fade-up"
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="theme-heading">Reliable Car Rentals, Anytime</h1>
          <p className="theme-subheading">
            Your next adventure starts with Zero7 Motors
          </p>
          <button className="theme-button">Book Now</button>
        </div>
      </section>

      {/* Car Categories */}
      <section id="cars" className="theme-section" data-aos="fade-up">
        <h2 className="theme-heading">Car Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {["Economy", "SUV", "Luxury", "Van"].map((type) => (
            <div key={type} className="theme-card" data-aos="zoom-in">
              <img
                src={`/images/${type.toLowerCase()}.jpg`}
                alt={type}
                className="w-full h-32 object-cover rounded mb-3"
              />
              <h3 className="theme-text">{type}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section" style={{ textAlign: "center" }} data-aos="fade-up">
        <h2 className="section-title">Contact Us</h2>
        <p>Email: support@zero7motors.com</p>
        <p>Phone: +254 712 345678</p>
        <p>Location: Nairobi, Kenya</p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} Zero7 Motors. All rights reserved.</p>
        <div className="mt-2">
          <a href="#!" className="mx-2 hover:underline">
            About
          </a>
          <a href="#!" className="mx-2 hover:underline">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

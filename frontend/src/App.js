import React, { useEffect } from "react";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import LandingPage from "./LandingPage";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav
        style={{
          backgroundColor: 'var(--primary)',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <h2 style={{ margin: 0 }}>Zero7 Motors</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a
            href="#features"
            style={{ textDecoration: 'none', color: 'var(--text-dark)' }}
          >
            Features
          </a>
          <a
            href="#cars"
            style={{ textDecoration: 'none', color: 'var(--text-dark)' }}
          >
            Cars
          </a>
          <a
            href="#contact"
            style={{ textDecoration: 'none', color: 'var(--text-dark)' }}
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section" data-aos="fade-down">
        <h1>Welcome to Zero7 Motors</h1>
        <p>Drive your dream car today. Affordable. Fast. Reliable.</p>
        <button className="cta-btn">Book Now</button>
      </header>

      {/* About Section */}
      <section className="section" id="about" data-aos="fade-right">
        <h2>Why Choose Us?</h2>
        <p>We offer quality rental cars, unbeatable rates, and exceptional service across Kenya.</p>
      </section>

      {/* Car Showcase Section */}
      <section className="section car-carousel" id="cars" data-aos="zoom-in">
        <h2>Top Vehicles</h2>
        <Carousel autoPlay infiniteLoop showThumbs={false}>
          <div>
            <img src="/images/car1.jpg" alt="Car 1" />
            <p className="legend">Toyota Prado</p>
          </div>
          <div>
            <img src="/images/car2.jpg" alt="Car 2" />
            <p className="legend">Mazda CX-5</p>
          </div>
          <div>
            <img src="/images/car3.jpg" alt="Car 3" />
            <p className="legend">Mercedes GLA</p>
          </div>
        </Carousel>
      </section>

      {/* Testimonials */}
      <section className="section testimonials" data-aos="fade-up">
        <h2>Happy Clients</h2>
        <blockquote>“Fast and smooth process. Highly recommend Zero7 Motors!” – Grace, Nairobi</blockquote>
        <blockquote>“Affordable and clean vehicles. Will use again.” – Brian, Kisumu</blockquote>
      </section>

      {/* Contact Section */}
      <section className="section contact" id="contact" data-aos="fade-left">
        <h2>Get in Touch</h2>
        <p>Email: bookings@zero7motors.co.ke | Phone: +254 712 345678</p>
        <button className="cta-btn">Contact Us</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Zero7 Motors. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

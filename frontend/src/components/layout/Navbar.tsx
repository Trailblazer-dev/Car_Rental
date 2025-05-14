import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import authService from '@/services/authService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated());
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav
      className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-md py-3 transition-all duration-300"
      style={{ WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)' }}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-primary text-2xl font-extrabold tracking-tight drop-shadow-sm">CarHire</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cars" className="nav-link">Browse Cars</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <button 
                onClick={handleLogout}
                className="text-primary font-semibold hover:underline transition-colors"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-primary font-semibold hover:underline transition-colors">Log In</Link>
              <Link to="/signup" className="btn-primary shadow-sm">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-gray-500 hover:text-primary focus:outline-none"
          aria-label="Open menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 px-4 pt-2 pb-4 shadow-lg rounded-b-lg animate-fade-in-down">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="nav-link-mobile" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/cars" className="nav-link-mobile" onClick={() => setIsOpen(false)}>Browse Cars</Link>
            <Link to="/about" className="nav-link-mobile" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/contact" className="nav-link-mobile" onClick={() => setIsOpen(false)}>Contact</Link>
            <div className="flex flex-col gap-2 pt-2">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="nav-link-mobile" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-primary font-semibold py-2 text-left"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-primary font-semibold py-2" onClick={() => setIsOpen(false)}>
                    Log In
                  </Link>
                  <Link to="/signup" className="btn-primary text-center" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// Add these styles to your global CSS (see index.css):
// .nav-link { @apply text-gray-700 hover:text-primary font-medium transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-primary/10; }
// .nav-link-mobile { @apply text-gray-700 hover:text-primary font-medium py-2 px-2 rounded-lg hover:bg-primary/10 transition-colors; }
// .animate-fade-in-down { animation: fadeInDown 0.2s ease; }
// @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px);} to { opacity: 1; transform: translateY(0);} }

import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CarsPage from './pages/cars/CarsPage';
import CarDetail from './pages/cars/CarDetail';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="cars" element={<CarsPage />} />
        <Route path="cars/:id" element={<CarDetail />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        {/* Additional routes will be added as their components are developed */}
        <Route path="*" element={<div className="container-custom py-10 text-center"><h1 className="text-3xl">Page Not Found</h1></div>} />
      </Route>
    </Routes>
  );
}

export default App;

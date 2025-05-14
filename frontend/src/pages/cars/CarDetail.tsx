import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Gauge, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import carService, { Car } from '@/services/carService';
import { getImageUrl } from '@/services/api';

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalDays, setTotalDays] = useState(1);
  
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        if (!id) {
          throw new Error('Car ID is missing');
        }
        const data = await carService.getCarById(Number(id));
        setCar(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch car details. Please try again later.');
        console.error('Error fetching car details:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCarDetails();
  }, [id]);
  
  // Calculate total days between start and end date
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalDays(diffDays || 1);
    }
  }, [startDate, endDate]);
  
  const handleBooking = () => {
    // Here you would typically handle the booking process
    // For now, let's just redirect to a login page if not authenticated
    navigate('/login', { state: { redirect: `/cars/${id}` } });
  };
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Try to use a local asset as fallback first
    e.currentTarget.src = "/src/assets/car-detail-placeholder.jpg";
    
    // Add a second error handler in case the local asset also fails
    e.currentTarget.onerror = () => {
      e.currentTarget.src = "https://placehold.co/800x400?text=Car+Image";
      e.currentTarget.onerror = null; // Prevent infinite loop
    };
  };
  
  if (loading) {
    return (
      <div className="container-custom py-20">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  if (error || !car) {
    return (
      <div className="container-custom py-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error || 'Car not found'}
        </div>
        <Link to="/cars" className="text-primary hover:underline">
          &larr; Back to car listings
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-10">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link to="/cars" className="text-gray-500 hover:text-primary">Cars</Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-primary">{car.car_make} {car.car_model}</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Car Details Column */}
        <div className="lg:col-span-2">
          {/* Main Image */}
          <div className="bg-white p-2 rounded-lg shadow-md mb-6">
            <img 
              src={getImageUrl(car.image)} 
              alt={`${car.car_make} ${car.car_model}`}
              className="w-full h-auto rounded-md object-cover"
              style={{ maxHeight: '400px' }}
              onError={handleImageError}
            />
          </div>
          
          {/* Car Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">{car.car_make} {car.car_model}</h1>
              <div className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${car.availability ? 'bg-green-500' : 'bg-red-500'}`}>
                {car.availability ? 'Available' : 'Unavailable'}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center">
                <Calendar size={18} className="mr-2 text-primary" />
                <span>{car.car_year}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="mr-2 text-primary" />
                <span>{car.location}</span>
              </div>
              <div className="flex items-center">
                <Users size={18} className="mr-2 text-primary" />
                <span>5 Seats</span>
              </div>
              <div className="flex items-center">
                <Gauge size={18} className="mr-2 text-primary" />
                <span>Automatic</span>
              </div>
            </div>
            
            <h2 className="text-xl font-bold mb-3">Description</h2>
            <p className="text-gray-600 mb-6">
              Experience the luxury and performance of the {car.car_year} {car.car_make} {car.car_model}. 
              This vehicle combines style, comfort and reliability, making it perfect for both business trips and family vacations.
              Located in {car.location}, this car is ready for your next adventure.
            </p>
            
            <h2 className="text-xl font-bold mb-3">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['Air Conditioning', 'Bluetooth', 'Cruise Control', 'Parking Sensors', 'Backup Camera', 'Navigation System'].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle size={16} className="mr-2 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Policies */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-3">Rental Policies</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Clock size={18} className="mr-2 text-primary" />
                  Rental Period
                </h3>
                <ul className="text-gray-600 space-y-1 pl-6 list-disc">
                  <li>Minimum rental period: 1 day</li>
                  <li>Maximum rental period: 30 days</li>
                  <li>Late returns incur additional charges</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <AlertCircle size={18} className="mr-2 text-primary" />
                  Requirements
                </h3>
                <ul className="text-gray-600 space-y-1 pl-6 list-disc">
                  <li>Valid driver's license</li>
                  <li>Minimum age: 21 years</li>
                  <li>Credit card required for deposit</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Booking Form Column */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4 pb-4 border-b">Booking Details</h2>
            
            <div className="mb-6">
              <p className="text-2xl font-bold text-primary">${car.price_per_day}<span className="text-sm text-gray-500">/day</span></p>
            </div>
            
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Pick-up Date</label>
                <input 
                  type="date" 
                  className="input-field"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Return Date</label>
                <input 
                  type="date" 
                  className="input-field"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div className="border-t border-b py-4 my-4">
                <div className="flex justify-between mb-2">
                  <span>Daily rate:</span>
                  <span>${car.price_per_day}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Days:</span>
                  <span>{totalDays}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${car.price_per_day * totalDays}</span>
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleBooking}
                disabled={!car.availability}
                className={`w-full py-3 rounded-lg text-white font-bold ${car.availability 
                  ? 'bg-primary hover:bg-primary-dark' 
                  : 'bg-gray-400 cursor-not-allowed'}`}
              >
                {car.availability ? 'Book Now' : 'Currently Unavailable'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;

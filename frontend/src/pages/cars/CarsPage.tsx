import { useState, useEffect } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import CarCard from '../../components/cars/CarCard';
import carService, { Car } from '../../services/carService';

const CarsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch cars data when component mounts
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await carService.getAllCars();
        setCars(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch cars. Please try again later.');
        console.error('Error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCars();
  }, []);
  
  return (
    <div className="container-custom py-10">
      <h1 className="text-3xl font-bold mb-8">Available Cars</h1>
      
      {/* Search and filter section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Location search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input-field pl-10"
              placeholder="Search by location"
            />
          </div>
          
          {/* Date picker */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={18} className="text-gray-400" />
            </div>
            <input
              type="date"
              className="input-field pl-10"
            />
          </div>
          
          {/* Filter dropdown */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select className="input-field pl-10">
              <option value="">Filter by price</option>
              <option value="low">Lowest price first</option>
              <option value="high">Highest price first</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Cars grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No cars available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              id={car.id}
              make={car.car_make}
              model={car.car_model}
              year={car.car_year}
              price={car.price_per_day}
              location={car.location}
              image={car.image}
              availability={car.availability}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarsPage;

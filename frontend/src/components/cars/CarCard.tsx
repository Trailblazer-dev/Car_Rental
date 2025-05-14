import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Gauge } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getImageUrl } from '@/services/api'; // <-- Add this import

interface CarCardProps {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  location: string;
  image: string;
  availability: boolean;
}

const CarCard = ({
  id,
  make,
  model,
  year,
  price,
  location,
  image,
  availability
}: CarCardProps) => {
  // Use getImageUrl to resolve the image path
  const [imageSrc, setImageSrc] = useState<string>(getImageUrl(image));
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageSrc(getImageUrl(image));
    setImageError(false);
  }, [image]);

  const handleImageError = () => {
    if (imageError) return;
    setImageError(true);
    setImageSrc("/src/assets/car-placeholder.jpg");
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
      {/* Car Image */}
      <div className="relative">
        <img 
          src={imageSrc}
          alt={`${make} ${model}`} 
          className="w-full h-48 object-cover"
          onError={handleImageError}
        />
        {/* Availability Badge */}
        {availability ? (
          <span className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 text-xs rounded-full">
            Available
          </span>
        ) : (
          <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-xs rounded-full">
            Unavailable
          </span>
        )}
      </div>

      {/* Car Details */}
      <div className="p-4">
        <h3 className="text-xl font-bold">{make} {model}</h3>
        
        <div className="flex items-center mt-1 text-gray-600">
          <Calendar size={16} className="mr-1" />
          <span className="text-sm">{year}</span>
        </div>

        <div className="flex items-center mt-2 text-gray-600">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Additional Features (optional) */}
        <div className="flex justify-between mt-3">
          <div className="flex items-center text-gray-600">
            <Users size={16} className="mr-1" />
            <span className="text-sm">5 seats</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Gauge size={16} className="mr-1" />
            <span className="text-sm">Auto</span>
          </div>
        </div>

        {/* Price & CTA Button */}
        <div className="flex justify-between items-center mt-4">
          <p className="font-bold text-xl text-primary">${price}<span className="text-sm text-gray-500">/day</span></p>
          
          <Link 
            to={`/cars/${id}`} 
            className="btn-primary py-2 px-4 text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const featuredProducts = [
  {
    id: 1,
    name: "Men's Summer Collection",
    price: 'Starting at $89',
    image: 'https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?auto=format&fit=crop&w=800&q=80',
    category: 'Men',
    path: '/men'
  },
  {
    id: 2,
    name: "Women's Designer Collection",
    price: 'Starting at $129',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    category: 'Women',
    path: '/women'
  },
  {
    id: 3,
    name: 'Kids New Arrivals',
    price: 'Starting at $49',
    image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=800&q=80',
    category: 'Kids',
    path: '/kids'
  },
  {
    id: 4,
    name: 'Luxury Watch Collection',
    price: 'Starting at $299',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80',
    category: 'Watches',
    path: '/watches'
  }
];

export default function ParallaxSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) =>
        current === featuredProducts.length - 1 ? 0 : current + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((current) =>
      current === featuredProducts.length - 1 ? 0 : current + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((current) =>
      current === 0 ? featuredProducts.length - 1 : current - 1
    );
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="min-w-full h-full relative flex-shrink-0"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="text-sm uppercase tracking-wider mb-2">{product.category}</p>
                <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
                <p className="text-2xl mb-6">{product.price}</p>
                <Link 
                  to={product.path}
                  className="inline-block bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {featuredProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
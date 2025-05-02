import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Set up Intersection Observer to detect when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1 // Trigger when 10% visible
    });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.data);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('An error occurred while fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to get the first image from the images array
  const getProductImage = (images) => {
    if (images && images.length > 0) {
      return images[0];
    }
    return '/placeholder-product.jpg'; // Fallback image
  };

  // Format price range
  const formatPriceRange = (priceRange) => {
    if (!priceRange) return 'Price not available';
    
    const { min, max } = priceRange;
    if (min === max) return `${min}`;
    return `${min} - ${max}`;
  };

  return (
    <div 
      ref={sectionRef}
      className="px-4 sm:px-8 md:px-16 lg:px-[150px] py-8 lg:pt-16 overflow-hidden"
    >
      {/* Section header with pink line above - animated */}
      <div className="flex flex-col items-center mb-12 lg:mb-16">
        <div 
          className={`w-12 lg:w-16 h-1 bg-pink-400 mb-4 lg:mb-6 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        ></div>
        <h2 
          className={`text-center transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <span className="text-[32px] lg:text-[52px] font-playfair text-[#18181B]">Explore our </span>
          <span className="text-[32px] lg:text-[52px] font-playfair italic text-[#18181B]">products</span>
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-600">Loading products...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product, index) => (
            <Link 
              to={`/product/${product._id}`} 
              key={product._id}
              className={`group transition-all duration-1000 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${600 + (index * 150)}ms` }}
            >
              {/* Image container with fixed aspect ratio */}
              <div className="aspect-[1/1] overflow-hidden mb-5">
                <img 
                  src={getProductImage(product.images)} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Text content with no card or background */}
              <div className="text-center">
                <h3 className="text-[22px] lg:text-[26px] font-playfair text-[#18181B] mb-1">{product.name}</h3>
                <p className="text-[14px] lg:text-[16px] font-satoshi text-[#323030] mb-2 line-clamp-2">
                  {product.description || 'No description available'}
                </p>
                <span className="text-[16px] lg:text-[18px] font-satoshi font-medium text-[#18181B] mt-1">
                  {formatPriceRange(product.priceRange)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductShowcase;
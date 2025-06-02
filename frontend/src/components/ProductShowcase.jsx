import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Format price
  const formatPrice = (price) => {
    if (!price && price !== 0) return 'Price not available';
    return `₹${price}`;
  };

  if (isMobile) {
    // Mobile layout - horizontal scrolling
    return (
      <section ref={sectionRef} id="products" className="py-8 bg-white">
        {/* Section header */}
        <div className="text-center mb-6 px-6">
          <h2 
            className={`text-2xl font-playfair text-[#18181B] mb-3 transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <span className="font-playfair text-[#18181B]">Explore our </span>
            <span className="font-playfair italic text-[#18181B]">products</span>
          </h2>
          <div 
            className={`w-16 h-1 bg-[#a98028] mx-auto transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          ></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-lg text-gray-600">Loading products...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-lg text-red-500">{error}</p>
          </div>
        ) : (
          <div className="overflow-x-auto px-6">
            <div className="flex space-x-4" style={{ width: `${products.length * 280 + (products.length - 1) * 16}px` }}>
              {products.map((product, index) => (
                <Link 
                  to={`/product/${product._id}`} 
                  key={product._id}
                  className={`flex-shrink-0 w-64 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-1000 transform hover:shadow-md ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                  style={{ transitionDelay: `${600 + (index * 150)}ms` }}
                >
                  {/* Image container */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={getProductImage(product.images)} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.target.src = '/placeholder-product.jpg';
                      }}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-playfair text-[#18181B] mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-sm font-satoshi text-[#323030] mb-3 line-clamp-2">
                      {product.description || 'No description available'}
                    </p>
                    
                    {/* Price and details */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-satoshi font-semibold text-[#18181B]">
                        {formatPrice(product.price)}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Scroll indicator */}
        <div className="text-center mt-4 px-6">
          <p className="text-sm text-gray-500 font-satoshi">← Swipe to explore more products →</p>
        </div>
      </section>
    );
  }

  // Desktop layout - original grid design
  return (
    <section ref={sectionRef} id="products" className="py-12 bg-white px-[20px] sm:px-0 md:px-0 lg:px-[100px]">
      <div className="mx-auto max-w-[1200px]">
        {/* Section header with pink line below - animated */}
        <div className="text-center mb-8">
          <h2 
            className={`text-[32px] lg:text-[52px] font-playfair text-[#18181B] mb-3 transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <span className="text-[32px] lg:text-[52px] font-playfair text-[#18181B]">Explore our </span>
            <span className="text-[32px] lg:text-[52px] font-playfair italic text-[#18181B]">products</span>
          </h2>
          <div 
            className={`w-16 h-1 bg-[#a98028] mx-auto transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          ></div>
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
                    {formatPrice(product.price)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductShowcase;
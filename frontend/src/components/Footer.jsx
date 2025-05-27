import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear();

  // Set up Intersection Observer to detect when footer enters viewport
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
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
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

  return (
    <footer ref={footerRef} className="bg-white text-[#18181B] overflow-hidden w-full">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="bg-[#f2f2f2] rounded-lg p-12 my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Section - Contact info with animation */}
            <div className={`space-y-6 transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`} style={{ transitionDelay: '200ms' }}>
              <div className="mb-6">
                <Link to="/" className="block">
                  <img 
                    src="/logo.png" 
                    alt="Frames and Bows logo" 
                    className="md:h-32 h-28"
                  />
                </Link>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-satoshi mb-2">Contact Us</h3>
                <p className="font-satoshi">Email ID: <a href="mailto:framesandbowsofficial@gmail.com" className="hover:text-[#a98028] transition-colors duration-300">framesandbowsofficial@gmail.com</a></p>
                <p className="font-satoshi">Consultation for customized pieces at <a href="tel:+919149490169" className="hover:text-[#a98028] transition-colors duration-300">+91 9149490169</a></p>
              </div>
              <div className="flex space-x-6 mt-6">
                {/* Instagram Icon */}
                <a href="https://www.instagram.com/framesandbowsofficial?igsh=MXYzdWdlaXppMHgwNA==" target="_blank" rel="noopener noreferrer" className="text-[#18181B] hover:text-[#323030]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                {/* WhatsApp Icon */}
                <a href="https://wa.me/919149490169?text=Hi%20Sharika%2C%20%0AI%E2%80%99d%20like%20to%20enquire%20about%20your%20products" target="_blank" rel="noopener noreferrer" className="text-[#18181B] hover:text-[#323030]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
              {/* Frames And Bows text moved below social icons */}
              <h2 
                className="text-[44px] md:text-[80px] font-['Inter_Tight'] leading-none text-[#18181B] mt-8"
                style={{ 
                  background: 'linear-gradient(180deg, rgba(24,24,27,0.9) 0%, rgba(24,24,27,0.4) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Frames And Bows
              </h2>
            </div>

            {/* Right Section - All Products with nested container for alignment */}
            <div className={`flex flex-col items-start md:items-end transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`} style={{ transitionDelay: '400ms' }}>
              {loading ? (
                <p className="font-satoshi">Loading products...</p>
              ) : error ? (
                <p className="font-satoshi text-red-500">{error}</p>
              ) : (
                <div className="flex flex-col space-y-3 items-start md:w-auto">
                  <h3 className="text-xl font-bold mb-6 font-satoshi">All Products</h3>
                  {products.slice(0, 9).map((product, index) => (
                    <Link 
                      to={`/product/${product._id}`} 
                      key={product._id} 
                      className={`font-satoshi hover:text-[#323030] text-sm transition-all duration-500 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: `${600 + (index * 50)}ms` }}
                    >
                      {product.name}
                    </Link>
                  ))}
                  {products.length > 9 && (
                    <Link 
                      to="/products" 
                      className={`font-satoshi hover:text-[#323030] text-sm font-bold mt-2 transition-all duration-500 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: `${600 + (products.slice(0, 9).length * 50) + 100}ms` }}
                    >
                      View all →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="bg-white w-full my-12">
          <div className={`flex flex-col md:flex-row justify-between items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`} style={{ transitionDelay: '1000ms' }}>
            <p className="font-satoshi text-sm mb-4 md:mb-0 text-[#18181B]">
              © {currentYear} Frames And Bows. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="font-satoshi text-sm text-[#18181B] hover:text-gray-600">
                Privacy Policy
              </Link>
              <Link to="/terms-conditions" className="font-satoshi text-sm text-[#18181B] hover:text-gray-600">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
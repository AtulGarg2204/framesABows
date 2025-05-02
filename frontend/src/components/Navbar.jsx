import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch products for the dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      if (isProductsOpen && products.length === 0) {
        setLoading(true);
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
          const data = await response.json();
          
          if (data.success) {
            setProducts(data.data);
          }
        } catch (err) {
          console.error('Error fetching products:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [isProductsOpen, products.length]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProductsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/15551234567', '_blank');
  };

  return (
    <nav className="bg-white py-3 px-4 md:px-6">
      <div className="container mx-auto flex items-center justify-between">
        {isMobile ? (
          // Mobile layout (logo left, menu right)
          <>
            {/* Left - Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-[#18181B] flex items-center">
                <img src="/logo.png" alt="Frames and Bows logo" className="h-14" />
                <span className="font-playfair text-sm ml-2">Frames And Bows</span>
              </Link>
            </div>

            {/* Right - WhatsApp and Products */}
            <div className="flex items-center gap-4">
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="text-[#18181B] flex items-center font-satoshi text-[14px]"
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Products dropdown */}
                {isProductsOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 max-h-80 overflow-y-auto">
                    <div className="py-2">
                      <Link 
                        to="/catalogue" 
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-satoshi text-[14px]"
                      >
                        View Full Catalogue
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      
                      {loading ? (
                        <div className="px-4 py-2 text-gray-500 font-satoshi text-[14px]">Loading products...</div>
                      ) : products.length === 0 ? (
                        <div className="px-4 py-2 text-gray-500 font-satoshi text-[14px]">No products available</div>
                      ) : (
                        products.map(product => (
                          <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-satoshi text-[14px]"
                          >
                            {product.name}
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* WhatsApp Icon */}
              <button className="text-[#18181B]" onClick={handleWhatsAppClick}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>
            </div>
          </>
        ) : (
          // Desktop layout
          <>
            {/* Left side - WhatsApp button */}
            <div className="flex items-center">
              <button 
                className="text-[#18181B] flex items-center font-satoshi text-[14px] ml-8"
                onClick={handleWhatsAppClick}
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </button>
            </div>

            {/* Center - Logo and brand name */}
            <div className="flex flex-col items-center">
              <Link to="/" className="text-[#18181B] flex items-center">
                <img src="/logo.png" alt="Frames and Bows logo" className="h-16" />
                <span className="font-playfair text-base ml-3">Frames And Bows</span>
              </Link>
            </div>

            {/* Right side - Products dropdown and Catalogue CTA */}
            <div className="flex items-center space-x-4 mr-8">
              {/* Products dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="text-[#18181B] flex items-center font-satoshi text-[14px]"
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                >
                  All Products
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 ml-1 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Products dropdown */}
                {isProductsOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 max-h-80 overflow-y-auto">
                    <div className="py-2">
                      <Link 
                        to="/catalogue" 
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-satoshi text-[14px]"
                      >
                        View Full Catalogue
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      
                      {loading ? (
                        <div className="px-4 py-2 text-gray-500 font-satoshi text-[14px]">Loading products...</div>
                      ) : products.length === 0 ? (
                        <div className="px-4 py-2 text-gray-500 font-satoshi text-[14px]">No products available</div>
                      ) : (
                        products.map(product => (
                          <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-satoshi text-[14px]"
                          >
                            {product.name}
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Catalogue CTA */}
              <Link 
                to="/catalogue"
                className="bg-black text-white font-satoshi text-[14px] py-2 px-4 rounded hover:bg-gray-800 transition duration-300"
              >
                View Catalogue
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
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
    <nav className="bg-white py-3 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between relative">
        {isMobile ? (
          // Mobile layout
          <>
            {/* Left - Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-[#18181B] flex items-center">
                <img src="/logo.png" alt="Frames and Bows logo" className="h-16" />
              </Link>
            </div>

            {/* Center - Brand Name (smaller font for mobile) */}
            <div className="absolute left-1/2 -translate-x-1/2 -ml-4">
              <span className="font-['Monsieur_La_Doulaise'] text-lg whitespace-nowrap">Frames And Bows</span>
            </div>

            {/* Right - Mobile Menu Icon */}
            <div className="flex items-center">
              {/* Mobile Menu Toggle */}
              <button 
                className="text-[#18181B] flex items-center p-2"
                onClick={() => setIsProductsOpen(!isProductsOpen)}
              >
                <svg 
                  className="w-6 h-6"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                </svg>
              </button>
            </div>
          </>
        ) : (
          // Desktop layout (unchanged)
          <>
            {/* Left - Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-[#18181B] flex items-center">
                <img src="/logo.png" alt="Frames and Bows logo" className="h-28" />
              </Link>
            </div>

            {/* Center - Brand Name */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <span className="font-['Monsieur_La_Doulaise'] text-4xl whitespace-nowrap">Frames And Bows</span>
            </div>

            {/* Right side - Products dropdown and Catalogue CTA */}
            <div className="flex items-center space-x-4">
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
              <a 
                href="https://drive.google.com/file/d/1iwU3CUhUmSm8S02J6_kIJYSJOlt9MjCQ/view"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white font-satoshi text-[14px] py-2 px-6 rounded hover:bg-gray-800 transition duration-300 inline-flex items-center justify-center min-w-[120px]"
              >
                View Catalogue
              </a>
            </div>
          </>
        )}
        
        {/* Full-width mobile dropdown - positioned outside of navbar container */}
        {isMobile && isProductsOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 transition-all duration-300 ease-in-out">
            <div className="p-6">
              {/* Top 4 Products Section */}
              <div className="mb-6">
                <h3 className="font-satoshi text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wider">
                  Latest Products
                </h3>
                {loading ? (
                  <div className="text-gray-500 font-satoshi text-sm">Loading products...</div>
                ) : products.length === 0 ? (
                  <div className="text-gray-500 font-satoshi text-sm">No products available</div>
                ) : (
                  <div className="space-y-3">
                    {products
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      .slice(0, 4)
                      .map((product, index) => (
                        <Link
                          key={product._id}
                          to={`/product/${product._id}`}
                          className="block py-2 text-gray-800 hover:text-[#a98028] font-satoshi text-sm transition-colors duration-200"
                          onClick={() => setIsProductsOpen(false)}
                        >
                          {product.name}
                        </Link>
                      ))}
                  </div>
                )}
              </div>

              {/* View Catalogue Button */}
              <div className="border-t border-gray-200 pt-6">
                <a 
                  href="https://drive.google.com/file/d/1iwU3CUhUmSm8S02J6_kIJYSJOlt9MjCQ/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-4 border-2 border-gray-800 text-gray-800 font-satoshi text-sm font-medium text-center uppercase tracking-wider hover:bg-gray-800 hover:text-white transition-colors duration-300"
                  onClick={() => setIsProductsOpen(false)}
                >
                  View Catalogue
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
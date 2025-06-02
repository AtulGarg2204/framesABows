// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isProductsOpen, setIsProductsOpen] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const dropdownRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   // Check for mobile view
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Fetch products for the dropdown
//   useEffect(() => {
//     const fetchProducts = async () => {
//       if (isProductsOpen && products.length === 0) {
//         setLoading(true);
//         try {
//           const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
//           const data = await response.json();
          
//           if (data.success) {
//             setProducts(data.data);
//           }
//         } catch (err) {
//           console.error('Error fetching products:', err);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchProducts();
//   }, [isProductsOpen, products.length]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsProductsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // Handle WhatsApp click
//   const handleWhatsAppClick = () => {
//     window.open('https://wa.me/15551234567', '_blank');
//   };

//   return (
//     <nav className="bg-white py-3">
//       <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between relative">
//         {isMobile ? (
//           // Mobile layout
//           <>
//             {/* Left - Logo */}
//             <div className="flex items-center">
//               <Link to="/" className="text-[#18181B] flex items-center">
//                 <img src="/logo.png" alt="Frames and Bows logo" className="h-24" />
//               </Link>
//             </div>

//             {/* Center - Brand Name */}
//             <div className="absolute left-1/2 -translate-x-1/2">
//               <span className="font-['Monsieur_La_Doulaise'] text-3xl whitespace-nowrap">Frames And Bows</span>
//             </div>

//             {/* Right - Products dropdown */}
//             <div className="flex items-center space-x-4">
//               <div className="relative" ref={dropdownRef}>
//                 <button 
//                   className="text-[#18181B] flex items-center font-satoshi text-[14px]"
//                   onClick={() => setIsProductsOpen(!isProductsOpen)}
//                 >
//                   <svg 
//                     xmlns="http://www.w3.org/2000/svg" 
//                     className={`h-4 w-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} 
//                     fill="none" 
//                     viewBox="0 0 24 24" 
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>

//                 {/* Products dropdown */}
//                 {isProductsOpen && (
//                   <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 max-h-80 overflow-y-auto">
//                     <div className="py-2">
//                       <Link 
//                         to="/catalogue" 
//                         className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-satoshi text-[14px]"
//                       >
//                         View Full Catalogue
//                       </Link>
//                       <div className="border-t border-gray-100 my-1"></div>
                      
//                       {loading ? (
//                         <div className="px-4 py-2 text-gray-500 font-satoshi text-[14px]">Loading products...</div>
//                       ) : products.length === 0 ? (
//                         <div className="px-4 py-2 text-gray-500 font-satoshi text-[14px]">No products available</div>
//                       ) : (
//                         products.map(product => (
//                           <Link
//                             key={product._id}
//                             to={`/product/${product._id}`}
//                             className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-satoshi text-[14px]"
//                           >
//                             {product.name}
//                           </Link>
//                         ))
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* WhatsApp Icon */}
//               <button className="text-[#18181B]" onClick={handleWhatsAppClick}>
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
//                 </svg>
//               </button>
//             </div>
//           </>
//         ) : (
//           // Desktop layout
//           <>
//             {/* Left - Logo */}
//             <div className="flex items-center">
//               <Link to="/" className="text-[#18181B] flex items-center">
//                 <img src="/logo.png" alt="Frames and Bows logo" className="h-28" />
//               </Link>
//             </div>

//             {/* Center - Brand Name */}
//             <div className="absolute left-1/2 -translate-x-1/2">
//               <span className="font-['Monsieur_La_Doulaise'] text-4xl whitespace-nowrap">Frames And Bows</span>
//             </div>

//             {/* Right side - Products dropdown and Catalogue CTA */}
//             <div className="flex items-center space-x-4">
//               {/* Products dropdown */}
//               <div className="relative" ref={dropdownRef}>
//                 <button 
//                   className="text-[#18181B] flex items-center font-satoshi text-[14px]"
//                   onClick={() => setIsProductsOpen(!isProductsOpen)}
//                 >
//                   All Products
//                   <svg 
//                     xmlns="http://www.w3.org/2000/svg" 
//                     className={`h-4 w-4 ml-1 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} 
//                     fill="none" 
//                     viewBox="0 0 24 24" 
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>

//                 {/* Products dropdown */}
//                 {isProductsOpen && (
//                   <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 max-h-80 overflow-y-auto">
//                     <div className="py-2">
//                       <Link 
//                         to="/catalogue" 
//                         className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-satoshi text-[14px]"
//                       >
//                         View Full Catalogue
//                       </Link>
//                       <div className="border-t border-gray-100 my-1"></div>
                      
//                       {loading ? (
//                         <div className="px-4 py-2 text-gray-500 font-satoshi text-[14px]">Loading products...</div>
//                       ) : products.length === 0 ? (
//                         <div className="px-4 py-2 text-gray-500 font-satoshi text-[14px]">No products available</div>
//                       ) : (
//                         products.map(product => (
//                           <Link
//                             key={product._id}
//                             to={`/product/${product._id}`}
//                             className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-satoshi text-[14px]"
//                           >
//                             {product.name}
//                           </Link>
//                         ))
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
              
//               {/* Catalogue CTA */}
//               <a 
//                 href="https://drive.google.com/file/d/1iwU3CUhUmSm8S02J6_kIJYSJOlt9MjCQ/view"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-black text-white font-satoshi text-[14px] py-2 px-6 rounded hover:bg-gray-800 transition duration-300 inline-flex items-center justify-center min-w-[120px]"
//               >
//                 View Catalogue
//               </a>
//             </div>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
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
            <div className="absolute left-1/2 -translate-x-1/2 -ml-6">
              <span className="font-['Monsieur_La_Doulaise'] text-lg whitespace-nowrap">Frames And Bows</span>
            </div>

            {/* Right - Products dropdown */}
            <div className="flex items-center">
              {/* Products dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="text-[#18181B] flex items-center font-satoshi text-[12px] bg-gray-50 px-3 py-2 rounded-full border"
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                >
                  PRODUCTS ({products.length})
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-3 w-3 ml-1 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
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
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 max-h-80 overflow-y-auto transition-all duration-300 ease-in-out">
            <div className="py-2">
              {loading ? (
                <div className="px-4 py-3 text-gray-500 font-satoshi text-[13px]">Loading products...</div>
              ) : products.length === 0 ? (
                <div className="px-4 py-3 text-gray-500 font-satoshi text-[13px]">No products available</div>
              ) : (
                products.map((product, index) => (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="block px-4 py-3 text-gray-800 hover:bg-gray-50 font-satoshi text-[13px] border-b border-gray-100 last:border-b-0 transition-colors duration-200"
                    onClick={() => setIsProductsOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{product.name}</span>
                      {product.price && (
                        <div className="text-[11px] text-gray-500 ml-2">₹{product.price}</div>
                      )}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
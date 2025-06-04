// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   // Check for mobile view
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Auto-advance images for mobile
//   useEffect(() => {
//     if (isMobile && product && product.images && product.images.length > 1) {
//       const autoScroll = setInterval(() => {
//         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
//       }, 3000); // Change image every 3 seconds

//       return () => clearInterval(autoScroll);
//     }
//   }, [isMobile, product]);

//   // Auto-scroll for related products on mobile
//   const [currentRelatedIndex, setCurrentRelatedIndex] = useState(0);
  
//   useEffect(() => {
//     if (isMobile && relatedProducts.length > 1) {
//       const autoScrollRelated = setInterval(() => {
//         setCurrentRelatedIndex((prevIndex) => (prevIndex + 1) % relatedProducts.length);
//       }, 4000); // Change product every 4 seconds

//       return () => clearInterval(autoScrollRelated);
//     }
//   }, [isMobile, relatedProducts.length]);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
//         const data = await response.json();
        
//         if (data.success) {
//           setProduct(data.data);
//           if (data.data.variants && data.data.variants.length > 0) {
//             setSelectedVariant(data.data.variants[0]);
//           }
//         } else {
//           setError('Failed to fetch product details');
//         }
//       } catch (err) {
//         console.error('Error fetching product details:', err);
//         setError('An error occurred while fetching product details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchRelatedProducts = async () => {
//       try {
//         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
//         const data = await response.json();
        
//         if (data.success) {
//           // Filter out current product and limit to 3 products
//           const filtered = data.data.filter(p => p._id !== id).slice(0, 3);
//           setRelatedProducts(filtered);
//         }
//       } catch (err) {
//         console.error('Error fetching related products:', err);
//       }
//     };

//     if (id) {
//       fetchProductDetails();
//       fetchRelatedProducts();
//     }
//   }, [id]);

//   const handleQuantityChange = (e) => {
//     const value = parseInt(e.target.value);
//     if (value > 0) {
//       setQuantity(value);
//     }
//   };

//   const handleVariantChange = (e) => {
//     const selectedId = e.target.value;
//     const variant = product.variants.find(v => v._id === selectedId);
//     setSelectedVariant(variant);
//   };

//   const handleAddToCart = () => {
//     if (product && product.whatsappUrl) {
//       const message = `Hi, I'm interested in purchasing ${product.name} (Quantity: ${quantity})${selectedVariant ? `, Variant: ${selectedVariant.name}` : ''}.`;
//       const encodedMessage = encodeURIComponent(message);
//       const whatsappLink = `${product.whatsappUrl}&text=${encodedMessage}`;
//       window.open(whatsappLink, '_blank');
//     }
//   };

//   const formatPrice = (price) => {
//     if (!price && price !== 0) return 'Price not available';
//     return `₹${price}`;
//   };

//   const getProductImage = (images, index = 0) => {
//     if (images && images.length > index) {
//       return images[index];
//     }
//     return '/placeholder-product.jpg'; // Fallback image
//   };

//   // Function to format description with proper line breaks
//   const formatDescription = (description) => {
//     if (!description) return 'No description available';
    
//     // Split by line breaks and filter out empty lines
//     const lines = description.split('\n').filter(line => line.trim() !== '');
    
//     return lines.map((line, index) => (
//       <React.Fragment key={index}>
//         {line.trim()}
//         {index < lines.length - 1 && <br />}
//       </React.Fragment>
//     ));
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-16 flex justify-center">
//         <p className="text-xl text-gray-600">Loading product details...</p>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="container mx-auto px-4 py-16 flex justify-center">
//         <p className="text-xl text-red-500">{error || 'Product not found'}</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-[150px] py-12">
//         {/* Product Detail Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
//         {/* Left Side - Product Images */}
//         <div>
//           {/* Main Image */}
//           <div className="bg-[#f9f9f9] mb-4 w-full">
//             <img 
//               src={getProductImage(product.images, currentImageIndex)} 
//               alt={product.name}
//               className="w-full h-auto object-cover aspect-square"
//               style={{ objectPosition: 'left center' }}
//             />
//           </div>
          
//           {/* Thumbnail Images */}
//           <div className="grid grid-cols-4 gap-3">
//             {product.images && product.images.slice(0, 4).map((image, index) => (
//               <div 
//                 key={index} 
//                 className={`cursor-pointer bg-[#f9f9f9] aspect-square overflow-hidden ${index === currentImageIndex ? 'border-2 border-[#a98028]' : 'border border-gray-200'}`}
//                 onClick={() => setCurrentImageIndex(index)}
//               >
//                 <img 
//                   src={image} 
//                   alt={`${product.name} - view ${index + 1}`}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                 />
//               </div>
//             ))}
//           </div>
          
//           {/* Mobile Auto-scroll Indicator */}
//           {isMobile && product.images && product.images.length > 1 && (
//             <div className="flex justify-center mt-4 space-x-2">
//               {product.images.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentImageIndex(index)}
//                   className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                     currentImageIndex === index ? 'bg-[#a98028] w-4' : 'bg-gray-300'
//                   }`}
//                   aria-label={`Go to image ${index + 1}`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
        
//         {/* Right Side - Product Details */}
//         <div className="max-w-full overflow-hidden">
//           {/* Pink Line above title */}
//           <div className="w-12 h-1 bg-[#a98028] mb-4"></div>
          
//           <h1 className="text-3xl md:text-4xl font-playfair text-[#18181B] mb-4 break-words">
//             {product.name}
//           </h1>
          
//           <div className="text-gray-700 font-satoshi mb-8 leading-relaxed break-words whitespace-pre-line max-w-full overflow-wrap-anywhere">
//             {formatDescription(product.description)}
//           </div>
          
//           <div className="border-t border-b border-gray-200 py-6 mb-8">
//             <div className="flex items-baseline mb-2">
//               <span className="text-2xl font-medium text-[#18181B] mr-4">
//                 {formatPrice(product.price)}
//               </span>
//               {product.originalPrice && (
//                 <span className="text-lg text-gray-400 line-through">
//                   ₹{product.originalPrice}
//                 </span>
//               )}
//             </div>
//           </div>
          
//           <div className="grid grid-cols-2 gap-6 mb-8">
//             <div>
//               <label className="block uppercase text-xs font-bold mb-2 tracking-wider font-satoshi">
//                 QUANTITY
//               </label>
//               <input 
//                 type="number" 
//                 min="1"
//                 value={quantity}
//                 onChange={handleQuantityChange}
//                 className="border border-gray-300 px-4 py-2 w-full"
//               />
//             </div>
            
//             {product.variants && product.variants.length > 0 && (
//               <div>
//                 <label className="block uppercase text-xs font-bold mb-2 tracking-wider font-satoshi">
//                   SELECT PRODUCT
//                 </label>
//                 <select 
//                   value={selectedVariant?._id || ''}
//                   onChange={handleVariantChange}
//                   className="border border-gray-300 px-4 py-2 w-full appearance-none"
//                 >
//                   {product.variants.map(variant => (
//                     <option key={variant._id} value={variant._id}>
//                       {variant.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//           </div>
          
//           <button 
//             onClick={handleAddToCart}
//             className="w-full bg-black text-white py-3 font-satoshi uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300"
//           >
//             ENQUIRE NOW
//           </button>
//         </div>
//       </div>
      
//       {/* Related Products Section */}
//       {relatedProducts.length > 0 && (
//         <div className="mt-20">
//           <div className="flex flex-col items-center mb-12">
//             <div className="w-12 h-1 bg-[#a98028] mb-6"></div>
//             <h2 className="text-center">
//               <span className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-playfair text-[#18181B]`}>You may also </span>
//               <span className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-playfair italic text-[#18181B]`}>like</span>
//             </h2>
//           </div>
          
//           {isMobile ? (
//             // Mobile: Horizontal scrolling layout
//             <div className="px-6">
//               <div className="overflow-x-auto">
//                 <div className="flex space-x-4" style={{ width: `${relatedProducts.length * 272}px` }}>
//                   {relatedProducts.map((relatedProduct, index) => (
//                     <Link 
//                       to={`/product/${relatedProduct._id}`} 
//                       key={relatedProduct._id}
//                       className={`flex-shrink-0 bg-white border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md`}
//                       style={{ width: '256px' }}
//                     >
//                       {/* Image container */}
//                       <div className="aspect-[4/3] overflow-hidden">
//                         <img 
//                           src={getProductImage(relatedProduct.images)} 
//                           alt={relatedProduct.name}
//                           className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                           onError={(e) => {
//                             e.target.src = '/placeholder-product.jpg';
//                           }}
//                         />
//                       </div>
                      
//                       {/* Content */}
//                       <div className="p-4">
//                         <h3 className="text-lg font-playfair text-[#18181B] mb-2 line-clamp-2">
//                           {relatedProduct.name}
//                         </h3>
//                         <p className="text-sm font-satoshi text-gray-700 mb-3 line-clamp-1">
//                           {relatedProduct.description || 'No description available'}
//                         </p>
                        
//                         {/* Price */}
//                         <div className="flex items-center justify-between">
//                           <span className="text-lg font-satoshi font-semibold text-[#18181B]">
//                             {formatPrice(relatedProduct.price)}
//                           </span>
//                           <div className="flex items-center text-sm text-gray-500">
//                             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                             </svg>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
              
//               {/* Scroll indicator for mobile */}
//               <div className="text-center mt-4">
//                 <p className="text-sm text-gray-500 font-satoshi">← Swipe to see more products →</p>
//               </div>
//             </div>
//           ) : (
//             // Desktop: Grid layout
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {relatedProducts.map((relatedProduct) => (
//                 <Link 
//                   to={`/product/${relatedProduct._id}`} 
//                   key={relatedProduct._id}
//                   className="group"
//                 >
//                   {/* Image container with fixed aspect ratio */}
//                   <div className="aspect-[1/1] overflow-hidden mb-5">
//                     <img 
//                       src={getProductImage(relatedProduct.images)} 
//                       alt={relatedProduct.name}
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                     />
//                   </div>
                  
//                   {/* Text content with no card or background */}
//                   <div className="text-center">
//                     <h3 className="text-xl lg:text-2xl font-playfair text-[#18181B] mb-1">
//                       {relatedProduct.name}
//                     </h3>
//                     <p className="text-base font-satoshi text-gray-700 mb-2 line-clamp-1">
//                       {relatedProduct.description || 'No description available'}
//                     </p>
//                     <span className="text-base lg:text-lg font-satoshi font-medium text-[#18181B] mt-1">
//                       {formatPrice(relatedProduct.price)}
//                     </span>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default ProductDetails;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-advance images for mobile
  useEffect(() => {
    if (isMobile && product && product.images && product.images.length > 1) {
      const autoScroll = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(autoScroll);
    }
  }, [isMobile, product]);

  // Auto-scroll for related products on mobile
  const [currentRelatedIndex, setCurrentRelatedIndex] = useState(0);
  
  useEffect(() => {
    if (isMobile && relatedProducts.length > 1) {
      const autoScrollRelated = setInterval(() => {
        setCurrentRelatedIndex((prevIndex) => (prevIndex + 1) % relatedProducts.length);
      }, 4000); // Change product every 4 seconds

      return () => clearInterval(autoScrollRelated);
    }
  }, [isMobile, relatedProducts.length]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
        const data = await response.json();
        
        if (data.success) {
          setProduct(data.data);
          if (data.data.variants && data.data.variants.length > 0) {
            setSelectedVariant(data.data.variants[0]);
          }
        } else {
          setError('Failed to fetch product details');
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('An error occurred while fetching product details');
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
        const data = await response.json();
        
        if (data.success) {
          // Filter out current product and limit to 3 products
          const filtered = data.data.filter(p => p._id !== id).slice(0, 3);
          setRelatedProducts(filtered);
        }
      } catch (err) {
        console.error('Error fetching related products:', err);
      }
    };

    if (id) {
      fetchProductDetails();
      fetchRelatedProducts();
    }
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleVariantChange = (e) => {
    const selectedId = e.target.value;
    const variant = product.variants.find(v => v._id === selectedId);
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    if (product && product.whatsappUrl) {
      let message;
      if (product.showPrice === false) {
        message = `Hi, I'd like to request the price for ${product.name} (Quantity: ${quantity})${selectedVariant ? `, Variant: ${selectedVariant.name}` : ''}.`;
      } else {
        message = `Hi, I'm interested in purchasing ${product.name} (Quantity: ${quantity})${selectedVariant ? `, Variant: ${selectedVariant.name}` : ''}.`;
      }
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `${product.whatsappUrl}&text=${encodedMessage}`;
      window.open(whatsappLink, '_blank');
    }
  };

  const formatPrice = (product) => {
    if (!product.price && product.price !== 0) return 'Price not available';
    
    // Check if price should be shown
    if (product.showPrice === false) {
      return 'Request for price';
    }
    
    return `₹${product.price}`;
  };

  const formatRelatedPrice = (product) => {
    if (!product.price && product.price !== 0) return 'Price not available';
    
    // Check if price should be shown
    if (product.showPrice === false) {
      return (
        <span className="text-[#18181B] underline">
          Request for price
        </span>
      );
    }
    
    return `₹${product.price}`;
  };

  const getProductImage = (images, index = 0) => {
    if (images && images.length > index) {
      return images[index];
    }
    return '/placeholder-product.jpg'; // Fallback image
  };

  // Function to format description with proper line breaks
  const formatDescription = (description) => {
    if (!description) return 'No description available';
    
    // Split by line breaks and filter out empty lines
    const lines = description.split('\n').filter(line => line.trim() !== '');
    
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line.trim()}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // Get button text based on showPrice setting
  const getButtonText = () => {
    return product.showPrice === false ? 'REQUEST FOR PRICE' : 'ENQUIRE NOW';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <p className="text-xl text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <p className="text-xl text-red-500">{error || 'Product not found'}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-[150px] py-12">
        {/* Product Detail Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Left Side - Product Images */}
        <div>
          {/* Main Image */}
          <div className="bg-[#f9f9f9] mb-4 w-full">
            <img 
              src={getProductImage(product.images, currentImageIndex)} 
              alt={product.name}
              className="w-full h-auto object-cover aspect-square"
              style={{ objectPosition: 'left center' }}
            />
          </div>
          
          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-3">
            {product.images && product.images.slice(0, 4).map((image, index) => (
              <div 
                key={index} 
                className={`cursor-pointer bg-[#f9f9f9] aspect-square overflow-hidden ${index === currentImageIndex ? 'border-2 border-[#a98028]' : 'border border-gray-200'}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - view ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          
          {/* Mobile Auto-scroll Indicator */}
          {isMobile && product.images && product.images.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentImageIndex === index ? 'bg-[#a98028] w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Right Side - Product Details */}
        <div className="max-w-full overflow-hidden">
          {/* Pink Line above title */}
          <div className="w-12 h-1 bg-[#a98028] mb-4"></div>
          
          <h1 className="text-3xl md:text-4xl font-playfair text-[#18181B] mb-4 break-words">
            {product.name}
          </h1>
          
          <div className="text-gray-700 font-satoshi mb-8 leading-relaxed break-words whitespace-pre-line max-w-full overflow-wrap-anywhere">
            {formatDescription(product.description)}
          </div>
          
          <div className="border-t border-b border-gray-200 py-6 mb-8">
            <div className="flex items-baseline mb-2">
              <span className="text-2xl font-medium text-[#18181B] mr-4">
                {formatPrice(product)}
              </span>
              {product.originalPrice && product.showPrice !== false && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block uppercase text-xs font-bold mb-2 tracking-wider font-satoshi">
                QUANTITY
              </label>
              <input 
                type="number" 
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="border border-gray-300 px-4 py-2 w-full"
              />
            </div>
            
            {product.variants && product.variants.length > 0 && (
              <div>
                <label className="block uppercase text-xs font-bold mb-2 tracking-wider font-satoshi">
                  SELECT PRODUCT
                </label>
                <select 
                  value={selectedVariant?._id || ''}
                  onChange={handleVariantChange}
                  className="border border-gray-300 px-4 py-2 w-full appearance-none"
                >
                  {product.variants.map(variant => (
                    <option key={variant._id} value={variant._id}>
                      {variant.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3 font-satoshi uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300"
          >
            {getButtonText()}
          </button>
        </div>
      </div>
      
      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <div className="flex flex-col items-center mb-12">
            <div className="w-12 h-1 bg-[#a98028] mb-6"></div>
            <h2 className="text-center">
              <span className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-playfair text-[#18181B]`}>You may also </span>
              <span className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-playfair italic text-[#18181B]`}>like</span>
            </h2>
          </div>
          
          {isMobile ? (
            // Mobile: Horizontal scrolling layout
            <div className="px-6">
              <div className="overflow-x-auto">
                <div className="flex space-x-4" style={{ width: `${relatedProducts.length * 272}px` }}>
                  {relatedProducts.map((relatedProduct, index) => (
                    <Link 
                      to={`/product/${relatedProduct._id}`} 
                      key={relatedProduct._id}
                      className={`flex-shrink-0 bg-white border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md`}
                      style={{ width: '256px' }}
                    >
                      {/* Image container */}
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={getProductImage(relatedProduct.images)} 
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            e.target.src = '/placeholder-product.jpg';
                          }}
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-lg font-playfair text-[#18181B] mb-2 line-clamp-2">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-sm font-satoshi text-gray-700 mb-3 line-clamp-1">
                          {relatedProduct.description || 'No description available'}
                        </p>
                        
                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-satoshi font-semibold text-[#18181B]">
                            {formatRelatedPrice(relatedProduct)}
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
              
              {/* Scroll indicator for mobile */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500 font-satoshi">← Swipe to see more products →</p>
              </div>
            </div>
          ) : (
            // Desktop: Grid layout
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  to={`/product/${relatedProduct._id}`} 
                  key={relatedProduct._id}
                  className="group"
                >
                  {/* Image container with fixed aspect ratio */}
                  <div className="aspect-[1/1] overflow-hidden mb-5">
                    <img 
                      src={getProductImage(relatedProduct.images)} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Text content with no card or background */}
                  <div className="text-center">
                    <h3 className="text-xl lg:text-2xl font-playfair text-[#18181B] mb-1">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-base font-satoshi text-gray-700 mb-2 line-clamp-1">
                      {relatedProduct.description || 'No description available'}
                    </p>
                    <span className="text-base lg:text-lg font-satoshi font-medium text-[#18181B] mt-1">
                      {formatRelatedPrice(relatedProduct)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default ProductDetails;
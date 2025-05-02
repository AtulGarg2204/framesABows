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
      const message = `Hi, I'm interested in purchasing ${product.name} (Quantity: ${quantity})${selectedVariant ? `, Variant: ${selectedVariant.name}` : ''}.`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `${product.whatsappUrl}&text=${encodedMessage}`;
      window.open(whatsappLink, '_blank');
    }
  };

  const formatPrice = (priceRange) => {
    if (!priceRange) return 'Price not available';
    
    const { min, max } = priceRange;
    if (min === max) return `$${min}`;
    return `$${min} - $${max}`;
  };

  const getProductImage = (images, index = 0) => {
    if (images && images.length > index) {
      return images[index];
    }
    return '/placeholder-product.jpg'; // Fallback image
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
          <div className="bg-[#f9f9f9] mb-4">
            <img 
              src={getProductImage(product.images, currentImageIndex)} 
              alt={product.name}
              className="w-full h-auto object-contain aspect-square"
            />
          </div>
          
          {/* Thumbnail Images */}
          <div className="grid grid-cols-3 gap-4">
            {product.images && product.images.slice(0, 3).map((image, index) => (
              <div 
                key={index} 
                className={`cursor-pointer bg-[#f9f9f9] aspect-square overflow-hidden ${index === currentImageIndex ? 'border-2 border-pink-400' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Side - Product Details */}
        <div>
          {/* Pink Line above title */}
          <div className="w-12 h-1 bg-pink-400 mb-4"></div>
          
          <h1 className="text-3xl md:text-4xl font-playfair text-[#18181B] mb-4">
            {product.name}
          </h1>
          
          <p className="text-gray-700 font-satoshi mb-8">
            {product.description}
          </p>
          
          <div className="border-t border-b border-gray-200 py-6 mb-8">
            <div className="flex items-baseline mb-2">
              <span className="text-2xl font-medium text-[#18181B] mr-4">
                {formatPrice(product.priceRange)}
              </span>
              {product.priceRange && product.priceRange.original && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.priceRange.original}
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
            ADD TO CART
          </button>
        </div>
      </div>
      
      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <div className="flex flex-col items-center mb-12">
            <div className="w-12 h-1 bg-pink-400 mb-6"></div>
            <h2 className="text-center">
              <span className="text-3xl md:text-4xl font-playfair text-[#18181B]">You may also </span>
              <span className="text-3xl md:text-4xl font-playfair italic text-[#18181B]">like</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
              <Link 
                to={`/product/${product._id}`} 
                key={product._id}
                className="group"
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
                  <h3 className="text-xl lg:text-2xl font-playfair text-[#18181B] mb-1">
                    {product.name}
                  </h3>
                  <p className="text-base font-satoshi text-gray-700 mb-2 line-clamp-2">
                    {product.description || 'No description available'}
                  </p>
                  <span className="text-base lg:text-lg font-satoshi font-medium text-[#18181B] mt-1">
                    {formatPrice(product.priceRange)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default ProductDetails;
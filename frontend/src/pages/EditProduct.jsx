import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priceRange: {
      min: '',
      max: ''
    },
    whatsappUrl: '',
    images: []
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Check if admin is logged in
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isAdminLoggedIn) {
      navigate('/admin');
    } else {
      fetchProduct();
    }
  }, [id, navigate]);

  // Fetch product by ID
  const fetchProduct = async () => {
    setFetchLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setFormData({
          name: data.data.name,
          description: data.data.description,
          priceRange: {
            min: data.data.priceRange.min,
            max: data.data.priceRange.max
          },
          whatsappUrl: data.data.whatsappUrl,
          images: data.data.images || []
        });
        
        // Set image previews from existing images
        setImagePreview(data.data.images || []);
      } else {
        setError(data.message || 'Failed to fetch product');
      }
    } catch (err) {
      setError('An error occurred while fetching the product');
      console.error(err);
    } finally {
      setFetchLoading(false);
    }
  };

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'minPrice') {
      setFormData({
        ...formData,
        priceRange: {
          ...formData.priceRange,
          min: value
        }
      });
    } else if (name === 'maxPrice') {
      setFormData({
        ...formData,
        priceRange: {
          ...formData.priceRange,
          max: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      
      // Calculate how many more images can be added
      const remainingSlots = 5 - imagePreview.length;
      
      if (files.length > remainingSlots) {
        setError(`You can only upload ${remainingSlots} more image${remainingSlots !== 1 ? 's' : ''}`);
        return;
      }
      
      setImageFiles([...imageFiles, ...files]);
      
      // Convert files to base64 for preview and storage
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(prev => [...prev, reader.result]);
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, reader.result]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Remove image from the list
  const removeImage = (index) => {
    // Create new arrays without the removed image
    const newImagePreview = [...imagePreview];
    newImagePreview.splice(index, 1);
    setImagePreview(newImagePreview);
    
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Validate form
    if (!formData.name || !formData.description || !formData.whatsappUrl) {
      setError('Please fill out all required fields');
      setLoading(false);
      return;
    }
    
    if (!formData.priceRange.min || !formData.priceRange.max) {
      setError('Please specify the price range');
      setLoading(false);
      return;
    }
    
    if (parseFloat(formData.priceRange.min) > parseFloat(formData.priceRange.max)) {
      setError('Minimum price cannot be greater than maximum price');
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess('Product updated successfully!');
        // Fetch the updated product
        fetchProduct();
      } else {
        setError(data.message || 'Failed to update product');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Update product error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold text-gray-900 font-playfair">Edit Product</h1>
              <button
                onClick={() => navigate('/admin/products')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-satoshi"
              >
                Back to Products
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {fetchLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                  <p className="text-sm text-red-700 font-satoshi">{error}</p>
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                  <p className="text-sm text-green-700 font-satoshi">{success}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Product Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 font-satoshi">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-satoshi"
                      required
                    />
                  </div>
                  
                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 font-satoshi">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-satoshi"
                      required
                    />
                  </div>
                  
                  {/* Price Range */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 font-satoshi">
                        Minimum Price (₹) *
                      </label>
                      <input
                        type="number"
                        id="minPrice"
                        name="minPrice"
                        min="0"
                        step="0.01"
                        value={formData.priceRange.min}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-satoshi"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 font-satoshi">
                        Maximum Price (₹) *
                      </label>
                      <input
                        type="number"
                        id="maxPrice"
                        name="maxPrice"
                        min="0"
                        step="0.01"
                        value={formData.priceRange.max}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-satoshi"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* WhatsApp URL */}
                  <div>
                    <label htmlFor="whatsappUrl" className="block text-sm font-medium text-gray-700 font-satoshi">
                      WhatsApp URL *
                    </label>
                    <input
                      type="url"
                      id="whatsappUrl"
                      name="whatsappUrl"
                      value={formData.whatsappUrl}
                      onChange={handleChange}
                      placeholder="https://wa.me/91XXXXXXXXXX"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-satoshi"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500 font-satoshi">
                      Format: https://wa.me/91XXXXXXXXXX (include country code)
                    </p>
                  </div>
                  
                  {/* Images */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 font-satoshi">
                      Product Images (Maximum 5)
                    </label>
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="images"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                          >
                            <span className="font-satoshi">Upload images</span>
                            <input
                              id="images"
                              name="images"
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleImageChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1 font-satoshi">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 font-satoshi">
                          PNG, JPG, GIF up to 5MB each
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Image Previews */}
                  {imagePreview.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                      {imagePreview.map((src, index) => (
                        <div key={index} className="relative">
                          <img
                            src={src}
                            alt={`Preview ${index + 1}`}
                            className="h-32 w-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-satoshi ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {loading ? 'Updating Product...' : 'Update Product'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EditProduct;
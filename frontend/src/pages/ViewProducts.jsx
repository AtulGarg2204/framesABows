import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const ViewProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Check if admin is logged in
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isAdminLoggedIn) {
      navigate('/admin');
    } else {
      fetchProducts();
    }
  }, [navigate]);

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      } else {
        setError(data.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError('An error occurred while fetching products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Open delete confirmation modal
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Close delete confirmation modal
  const cancelDelete = () => {
    setDeleteId(null);
    setShowDeleteModal(false);
  };

  // Handle delete product
  const handleDelete = async () => {
    if (!deleteId) return;
    
    setDeleteLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${deleteId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setProducts(products.filter(product => product._id !== deleteId));
        setSuccessMessage('Product deleted successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(data.message || 'Failed to delete product');
        setTimeout(() => setError(''), 3000);
      }
    } catch (err) {
      setError('An error occurred while deleting the product');
      console.error(err);
      setTimeout(() => setError(''), 3000);
    } finally {
      setDeleteLoading(false);
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  // Navigate to edit product page
  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold text-gray-900 font-playfair">Products</h1>
              <Link
                to="/admin/add-product"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-satoshi"
              >
                Add New Product
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {/* Success Message */}
          {successMessage && (
            <div className="max-w-7xl mx-auto mb-4">
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700 font-satoshi">
                      {successMessage}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="max-w-7xl mx-auto mb-4">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 font-satoshi">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 sm:p-6">
                  <p className="text-center text-gray-500 font-satoshi">No products found</p>
                </div>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {products.map(product => (
                    <li key={product._id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {product.images && product.images.length > 0 ? (
                              <div className="flex-shrink-0 h-16 w-16 mr-4">
                                <img 
                                  className="h-16 w-16 rounded-md object-cover" 
                                  src={product.images[0]} 
                                  alt={product.name} 
                                />
                              </div>
                            ) : (
                              <div className="flex-shrink-0 h-16 w-16 mr-4 bg-gray-200 rounded-md flex items-center justify-center">
                                <svg className="h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium text-indigo-600 truncate font-playfair">
                                {product.name}
                              </p>
                              <p className="text-sm text-gray-500 truncate font-satoshi">
                                ₹{product.priceRange.min} - ₹{product.priceRange.max}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(product._id)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-satoshi"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => confirmDelete(product._id)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-satoshi"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 font-playfair">
                      Delete Product
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 font-satoshi">
                        Are you sure you want to delete this product? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm font-satoshi ${
                    deleteLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {deleteLoading ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  type="button"
                  onClick={cancelDelete}
                  disabled={deleteLoading}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm font-satoshi"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
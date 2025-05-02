import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isAdminLoggedIn) {
      navigate('/admin');
    } else {
      // Fetch product count
      fetchProductCount();
    }
  }, [navigate]);

  // Fetch product count
  const fetchProductCount = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
      const data = await response.json();
      
      if (data.success) {
        setProductCount(data.count);
      }
    } catch (err) {
      console.error('Error fetching product count:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem('isAdminLoggedIn');
    // Redirect to login page
    navigate('/admin');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold text-gray-900 font-playfair">Dashboard</h1>
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-satoshi"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl font-semibold text-gray-900 font-playfair">Welcome to the Admin Dashboard</h2>
              
              <div className="mt-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Products Stats Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dt className="text-sm font-medium text-gray-500 truncate font-satoshi">Total Products</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900 font-satoshi">
                              {loading ? '...' : productCount}
                            </div>
                          </dd>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={() => navigate('/admin/products')}
                          className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-satoshi"
                        >
                          View all products
                          <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Add Product Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dt className="text-sm font-medium text-gray-500 truncate font-satoshi">Add New Product</dt>
                          <dd className="flex items-baseline">
                            <div className="text-lg font-semibold text-gray-900 font-satoshi">
                              Create and publish new products
                            </div>
                          </dd>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={() => navigate('/admin/add-product')}
                          className="w-full flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 font-satoshi"
                        >
                          Add Product
                          <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
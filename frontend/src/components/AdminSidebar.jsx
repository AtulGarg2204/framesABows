import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  // Check if the current path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen flex-shrink-0">
      <div className="p-4">
        <h2 className="text-2xl font-bold font-playfair">Admin Panel</h2>
      </div>
      <nav className="mt-6">
        <ul>
          <li className="px-4">
            <Link 
              to="/admin/dashboard" 
              className={`flex items-center py-3 px-4 rounded transition-colors ${isActive('/admin/dashboard') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              <span className="material-icons-outlined mr-3">dashboard</span>
              <span className="font-satoshi">Dashboard</span>
            </Link>
          </li>
          
          {/* Products Dropdown */}
          <li className="px-4 mt-2">
            <div 
              className={`flex items-center justify-between py-3 px-4 rounded cursor-pointer transition-colors ${
                isActive('/admin/products') || isActive('/admin/add-product') ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => setIsProductsOpen(!isProductsOpen)}
            >
              <div className="flex items-center">
                <span className="material-icons-outlined mr-3">inventory_2</span>
                <span className="font-satoshi">Products</span>
              </div>
              <span className="material-icons-outlined">
                {isProductsOpen ? 'expand_less' : 'expand_more'}
              </span>
            </div>
            
            {/* Dropdown Items */}
            {isProductsOpen && (
              <ul className="ml-6 mt-2">
                <li>
                  <Link 
                    to="/admin/add-product" 
                    className={`flex items-center py-2 px-4 rounded transition-colors ${
                      isActive('/admin/add-product') ? 'bg-gray-600' : 'hover:bg-gray-600'
                    }`}
                  >
                    <span className="material-icons-outlined mr-3 text-sm">add</span>
                    <span className="font-satoshi">Add Product</span>
                  </Link>
                </li>
                <li className="mt-1">
                  <Link 
                    to="/admin/products" 
                    className={`flex items-center py-2 px-4 rounded transition-colors ${
                      isActive('/admin/products') ? 'bg-gray-600' : 'hover:bg-gray-600'
                    }`}
                  >
                    <span className="material-icons-outlined mr-3 text-sm">list</span>
                    <span className="font-satoshi">View Products</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
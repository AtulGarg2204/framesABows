import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import VideoFeaturesSection from '../components/VideoFeaturesSection';
import React, { useState, useEffect } from 'react';
import ProductShowcase from '../components/ProductShowcase';
import InstagramFeed from '../components/InstagramFeed';
import Footer from '../components/Footer';
const Landing = () => {
  const [message, setMessage] = useState('');
  console.log(message);
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api`);
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error('Error fetching API:', error);
        setMessage('Failed to connect to API');
      }
    };
    
    fetchAPI();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar />
      <HeroSection/>
      <VideoFeaturesSection/>
      <ProductShowcase/>
      <InstagramFeed />
      <Footer/>
    </div>
  );
};

export default Landing;

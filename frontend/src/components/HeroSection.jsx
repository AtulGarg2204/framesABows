import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Set up Intersection Observer to detect when section enters viewport
  useEffect(() => {
    // Hero section should animate immediately on page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // Also use Intersection Observer as fallback for when component isn't initially visible
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1 // Trigger when 10% visible
    });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      clearTimeout(timer);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="px-[20px] sm:px-0 md:px-0 lg:px-[100px] overflow-hidden" ref={sectionRef}>
      <section className="relative px-4 md:px-10 lg:px-20 py-12 md:py-16 lg:py-20">
        {/* Background image with fade-in animation */}
        <div 
          className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat hidden sm:block transition-opacity duration-1500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: 'url(/hero_banner.png)' }}
        ></div>
        <div 
          className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat sm:hidden transition-opacity duration-1500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: 'url(/hero_banner.png)' }}
        ></div>
        
        {/* Content overlay with staggered animations */}
        <div className="container mx-auto relative z-10 flex flex-col justify-center h-full md:min-h-[550px]">
          <div className="max-w-lg">
            {/* Small pink line above heading - slides in from left */}
            <div 
              className={`w-16 h-1 bg-pink-400 mb-6 transition-all duration-1000 transform ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
              style={{ transitionDelay: '200ms' }}
            ></div>
            
            {/* Heading with staggered word reveal */}
            <h1 className="text-[40px] sm:text-5xl md:text-6xl lg:text-[68px] leading-tight font-bold text-[#18181B] mb-6 font-playfair overflow-hidden">
              <span 
                className={`inline-block transition-all duration-1000 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                The best stories <br/>
              </span>
              <span 
                className={`italic inline-block transition-all duration-1000 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                start
              </span>
              <span 
                className={`inline-block transition-all duration-1000 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '700ms' }}
              >
                &nbsp;with Mirrors
              </span>
            </h1>
            
            {/* Paragraph fades in */}
            <p 
              className={`text-[16px] text-[#323030] sm:text-base md:text-lg lg:text-[18px] mb-8 sm:text-gray-700 font-satoshi transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '900ms' }}
            >
              Discover our exquisite collection of mirrors that bring elegance and light to any space. 
              Handcrafted designs that transform your home into a reflection of your style.
            </p>
            
            {/* Buttons stagger in from bottom */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
              <Link 
                to="/catalogue"
                className={`px-8 py-3 bg-[#18181B] text-white hover:bg-[#27272A] transition-all duration-1000 font-medium uppercase font-satoshi w-full sm:w-auto transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '1100ms' }}
              >
                SHOP NOW
              </Link>
              <Link
                to="/contact"
                className={`px-8 py-3 border border-[#18181B] text-[#18181B] hover:bg-gray-100 transition-all duration-1000 font-medium uppercase font-satoshi w-full sm:w-auto transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '1300ms' }}
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
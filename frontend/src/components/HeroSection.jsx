import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const sectionRef = useRef(null);
  
  // Desktop banner images array
  const desktopBanners = [
    '/hero_banner_2.png',
    '/hero_banner.png',
    '/hero_banner_3.png'
  ];

  // Mobile banner images array
  const mobileBanners = [
    '/1_banner.jpg',
    '/2_banner.jpg',
    '/3_banner.jpg'
  ];

  // Select appropriate banners based on screen size
  const banners = isMobile ? mobileBanners : desktopBanners;

  // Check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToProducts = (e) => {
    e.preventDefault();
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [banners.length]);
  
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

  if (isMobile) {
    // Mobile layout - content above, image below
    return (
      <div className="bg-gray-50" ref={sectionRef}>
        {/* Content Section */}
        <section className="px-6 py-12 bg-gray-50">
          <div className="max-w-md mx-auto">
            {/* Small line above heading */}
            <div 
              className={`w-16 h-1 bg-[#a98028] mb-6 transition-all duration-1000 transform ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
              style={{ transitionDelay: '200ms' }}
            ></div>
            
            {/* Heading */}
            <h1 className="text-3xl leading-tight font-bold text-[#18181B] mb-6 font-playfair">
              <span 
                className={`inline-block transition-all duration-1000 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                Art meets
              </span>
              <br />
              <span 
                className={`inline-block transition-all duration-1000 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                reflection
              </span>
            </h1>
            
            {/* Paragraph */}
            <p 
              className={`text-sm text-[#323030] mb-8 font-satoshi transition-all duration-1000 leading-relaxed ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '900ms' }}
            >
              Frames & Bows is a celebration of bespoke luxury, where each frame is a timeless masterpiece, handcrafted to perfection. Every design is uniquely tailored to your vision.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-8 py-3 bg-[#18181B] text-white hover:bg-[#27272A] transition-all duration-1000 font-medium uppercase font-satoshi text-sm transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '1100ms' }}
              >
                SHOP NOW
              </button>
              <a
                href="https://wa.me/919149490169?text=Hi%20Sharika%2C%20%0AI%E2%80%99d%20like%20to%20enquire%20about%20your%20products"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-3 border border-[#18181B] text-[#18181B] hover:bg-gray-100 transition-all duration-1000 font-medium uppercase font-satoshi text-sm transform flex items-center justify-center gap-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '1300ms' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                <span>CONTACT US</span>
              </a>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="relative h-80 overflow-hidden mx-6">
          {/* Background images with fade transition */}
          {banners.map((banner, index) => (
            <div 
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${banner})` }}
            ></div>
          ))}

          {/* Carousel dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-[#a98028] w-4' : 'bg-white'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Desktop layout - original design
  return (
    <div className="px-[20px] sm:px-0 md:px-0 lg:px-[100px] overflow-hidden" ref={sectionRef}>
      <section className="relative px-4 md:px-10 lg:px-20 py-12 md:py-16 lg:py-20">
        {/* Background images with fade transition */}
        {banners.map((banner, index) => (
          <div 
            key={index}
            className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${banner})` }}
          ></div>
        ))}
        
        {/* Content overlay with staggered animations */}
        <div className="container mx-auto relative z-10 flex flex-col justify-center h-full md:min-h-[550px]">
          <div className="max-w-lg">
            {/* Small pink line above heading - slides in from left */}
            <div 
              className={`w-16 h-1 bg-[#a98028] mb-6 transition-all duration-1000 transform ${
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
                Art meets
              </span>
              <span 
                className={`inline-block ml-2 transition-all duration-1000 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                reflection
              </span>
            </h1>
            
            {/* Paragraph fades in */}
            <p 
              className={`text-[16px] text-[#323030] sm:text-base md:text-lg lg:text-[18px] mb-8 sm:text-gray-700 font-satoshi transition-all duration-1000 max-w-[600px] leading-relaxed ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '900ms' }}
            >
              Frames & Bows is a celebration of bespoke luxury, where each frame is a timeless masterpiece, handcrafted to perfection. Every design is uniquely tailored to your vision. We believe that every corner of your home should exude artistry and refined craftsmanship. Each creation carries a story of inspiration, elegance, and the pursuit of beauty. Our frames are not just décor; they are heirlooms in the making.
            </p>
            
            {/* Buttons stagger in from bottom */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-8 py-3 bg-[#18181B] text-white hover:bg-[#27272A] transition-all duration-1000 font-medium uppercase font-satoshi w-full sm:w-auto transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '1100ms' }}
              >
                SHOP NOW
              </button>
              <a
                href="https://wa.me/919149490169?text=Hi%20Sharika%2C%20%0AI%E2%80%99d%20like%20to%20enquire%20about%20your%20products"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-3 border border-[#18181B] text-[#18181B] hover:bg-gray-100 transition-all duration-1000 font-medium uppercase font-satoshi w-full sm:w-auto transform flex items-center justify-center gap-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '1300ms' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Carousel dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-[#a98028] w-4' : 'bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
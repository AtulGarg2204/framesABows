import React, { useState, useEffect, useRef } from 'react';

const VideoFeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);
  
  // Actual product images
  const images = [
    '/images/carousel/oval-mirror.jpg',    // Oval mirror with ornate gold frame
    '/images/carousel/square-mirror.jpg',  // Square mirror with detailed gold frame
    '/images/carousel/full-mirror.jpg',    // Full-length gold frame mirror
    '/images/carousel/frames-collection.jpg' // Collection of ornate frames
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1
    });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-white px-[20px] sm:px-0 md:px-0 lg:px-[100px]" ref={sectionRef}>
      <div className="mx-auto max-w-[1200px]">
        {/* Section header with pink line below */}
        <div className="text-center mb-10">
          <h2 className={`text-[42px] font-playfair text-[#18181B] mb-3 transition-all duration-1000 leading-tight ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Reflections of<br />Timeless Craftsmanship
          </h2>
          <div className={`w-16 h-1 bg-pink-400 mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-4">
          {/* Carousel on the left */}
          <div className="flex justify-center w-full">
            <div className={`relative w-[85%] aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden shadow-xl transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}>
              {/* Carousel container */}
              <div className="relative w-full h-full">
                {/* Images with fade transition */}
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      currentSlide === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Frames & Bows Showcase ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                
                {/* Dots indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentSlide === index ? 'bg-pink-400 w-4' : 'bg-white'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Features grid on the right */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-20 bg-gray-50 p-12 rounded-lg w-full">
            {/* Feature 1 */}
            <div className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '200ms' }}>
              <div className="text-pink-400 mb-6">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-[38px] font-playfair text-[#18181B] mb-4 leading-[1.2]">Made by<br />artists</h3>
              <p className="text-[17px] text-[#323030] font-satoshi leading-relaxed max-w-[380px]">Each piece is handcrafted with artistry and tradition.</p>
            </div>

            {/* Feature 2 */}
            <div className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '400ms' }}>
              <div className="text-pink-400 mb-6">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-[38px] font-playfair text-[#18181B] mb-4 leading-[1.2]">Sustainable<br />Elegance</h3>
              <p className="text-[17px] text-[#323030] font-satoshi leading-relaxed max-w-[380px]">A timeless design for your home.</p>
            </div>

            {/* Feature 3 */}
            <div className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '600ms' }}>
              <div className="text-pink-400 mb-6">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <h3 className="text-[38px] font-playfair text-[#18181B] mb-4 leading-[1.2]">100%<br />Freshness</h3>
              <p className="text-[17px] text-[#323030] font-satoshi leading-relaxed max-w-[380px]">Our designs seamlessly integrate with any interior.</p>
            </div>

            {/* Feature 4 */}
            <div className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '800ms' }}>
              <div className="text-pink-400 mb-6">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                </svg>
              </div>
              <h3 className="text-[38px] font-playfair text-[#18181B] mb-4 leading-[1.2]">Locally<br />produced</h3>
              <p className="text-[17px] text-[#323030] font-satoshi leading-relaxed max-w-[380px]">Bespoke options to match your specific needs.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoFeaturesSection;
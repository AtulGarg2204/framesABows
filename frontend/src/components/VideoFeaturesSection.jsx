// import React, { useRef, useEffect, useState } from 'react';
// import { PlayCircle, Paintbrush, Leaf, Apple, Store } from 'lucide-react';

// const VideoFeaturesSection = () => {
//   const videoRef = useRef(null);
//   const sectionRef = useRef(null);
//   const lastScrollY = useRef(0);
//   const scrollTimer = useRef(null);
//   const [isScrolling, setIsScrolling] = useState(false);

//   // Helper function to check if element is in viewport
//   const isElementInViewport = (el) => {
//     if (!el) return false;
//     const rect = el.getBoundingClientRect();
//     return (
//       rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
//       rect.bottom >= 0
//     );
//   };

//   useEffect(() => {
//     const video = videoRef.current;
    
//     if (video) {
//       // Set up looping
//       video.loop = true;
      
//       // When metadata is loaded, start playing if visible
//       video.addEventListener('loadedmetadata', () => {
//         if (isElementInViewport(sectionRef.current)) {
//           video.play();
//         }
//       });
//     }
    
//     return () => {
//       if (video) {
//         video.removeEventListener('loadedmetadata', () => {});
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!videoRef.current || !sectionRef.current) return;
      
//       const video = videoRef.current;
//       const section = sectionRef.current;
//       const currentScrollY = window.scrollY;
      
//       // Get section position relative to viewport
//       const rect = section.getBoundingClientRect();
//       const windowHeight = window.innerHeight;
      
//       // Only control video if section is in viewport
//       if (rect.top < windowHeight && rect.bottom > 0) {
//         // Immediately pause video when scrolling begins
//         if (currentScrollY !== lastScrollY.current && !video.paused) {
//           video.pause();
//         }
        
//         // Calculate how far through the section we've scrolled (0 to 1)
//         const scrollProgress = 1 - (rect.bottom / (windowHeight + rect.height));
        
//         // Clamp the value between 0 and 1
//         const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
        
//         // Set video time based on scroll position
//         if (video.duration) {
//           video.currentTime = clampedProgress * video.duration;
//         }
        
//         // Detect scroll and set flag
//         if (currentScrollY !== lastScrollY.current) {
//           setIsScrolling(true);
          
//           // Clear previous timeout
//           if (scrollTimer.current) {
//             clearTimeout(scrollTimer.current);
//           }
          
//           // Set timeout to detect when scrolling stops
//           scrollTimer.current = setTimeout(() => {
//             setIsScrolling(false);
//             video.play();
//           }, 200); // Slightly longer timeout for smoother transition
//         }
//       }
      
//       // Update last scroll position
//       lastScrollY.current = currentScrollY;
//     };
    
//     window.addEventListener('scroll', handleScroll);
    
//     // Set up intersection observer to pause/play based on visibility
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         const video = videoRef.current;
//         if (!video) return;
        
//         if (entry.isIntersecting) {
//           if (!isScrolling) {
//             video.play();
//           }
//         } else {
//           video.pause();
//         }
//       });
//     }, { threshold: 0.1 });
    
//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }
    
//     // Initial calculation
//     handleScroll();
    
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       if (scrollTimer.current) {
//         clearTimeout(scrollTimer.current);
//       }
//       observer.disconnect();
//     };
//   }, [isScrolling]);

//   return (
//     <div ref={sectionRef} className="px-[200px] py-16">
//       <h2 className="text-center text-[52px] font-playfair mb-12">
//         Watch how we <span className="italic">create</span> our<br />
//         beautiful products
//       </h2>

//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Video Section */}
//         <div className="lg:w-1/2 relative rounded-lg overflow-hidden">
//           <video 
//             ref={videoRef}
//             src="/video.mp4" 
//             className="w-full h-full object-cover rounded-lg"
//             poster="/video-thumbnail.jpg"
//             preload="auto"
//             muted
//             playsInline
//           />
          
//           <div className="absolute bottom-4 right-4 bg-white bg-opacity-70 px-3 py-1 rounded-full text-sm">
//             {isScrolling ? "Controlling video..." : "Video playing"}
//           </div>
//         </div>

//         {/* Features Grid */}
//         <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Feature 1 */}
//           <div className="flex flex-col items-start">
//             <Paintbrush className="text-pink-300 size-8 mb-4" />
//             <h3 className="text-[28px] font-playfair text-[#18181B] mb-2">Made by artists</h3>
//             <p className="text-[16px] font-satoshi text-[#323030]">
//               Lorem ipsum dolor sit amet consectetur adipisci mendit non.
//             </p>
//           </div>

//           {/* Feature 2 */}
//           <div className="flex flex-col items-start">
//             <Leaf className="text-pink-300 size-8 mb-4" />
//             <h3 className="text-[28px] font-playfair text-[#18181B] mb-2">Sustainable</h3>
//             <p className="text-[16px] font-satoshi text-[#323030]">
//               Duis aute irure dolor in velit esse cillum dolore amus.
//             </p>
//           </div>

//           {/* Feature 3 */}
//           <div className="flex flex-col items-start">
//             <Apple className="text-pink-300 size-8 mb-4" />
//             <h3 className="text-[28px] font-playfair text-[#18181B] mb-2">100% Freshness</h3>
//             <p className="text-[16px] font-satoshi text-[#323030]">
//               Lorem ipsum dolor sit amet consectetur adipisci mendit non.
//             </p>
//           </div>

//           {/* Feature 4 */}
//           <div className="flex flex-col items-start">
//             <Store className="text-pink-300 size-8 mb-4" />
//             <h3 className="text-[28px] font-playfair text-[#18181B] mb-2">Locally produced</h3>
//             <p className="text-[16px] font-satoshi text-[#323030]">
//               Duis aute irure dolor in velit esse cillum dolore amus.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoFeaturesSection;
import React, { useState, useRef, useEffect } from 'react';
import { PlayCircle, Paintbrush, Leaf, Apple, Store } from 'lucide-react';

const VideoFeaturesSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  
  // Intersection Observer setup to detect when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.2 // Trigger when at least 20% of the element is visible
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

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      ref={sectionRef}
      className="px-4 sm:px-8 md:px-16 lg:px-[150px] py-16 lg:py-[8rem] overflow-hidden"
    >
      <div 
        className={`text-center mb-8 lg:mb-12 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
        style={{ transitionDelay: '0ms' }}
      >
        <h2 className="text-[32px] lg:text-[52px] font-playfair">
          Watch how we <span className="italic">create</span> our
        </h2>
        <h2 className="text-[32px] lg:text-[52px] font-playfair">
          beautiful products
        </h2>
        <div className="w-20 h-1 bg-pink-300 mx-auto mt-2"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-8">
        {/* Video Section - With animation */}
        <div 
          className={`w-full lg:w-1/2 flex justify-center transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div 
            className="relative rounded-lg overflow-hidden w-[350px] h-[350px] lg:w-[500px] lg:h-[500px]"
          >
            <video 
              ref={videoRef}
              src="/video.mp4" 
              className="w-full h-full object-cover rounded-lg"
              poster="/video-thumbnail.jpg"
              onClick={handleVideoClick}
            />
            
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-10"
                onClick={handleVideoClick}
              >
                <div className="bg-pink-300 rounded-full p-4 w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center">
                  <PlayCircle size={32} className="text-white" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Grid - With staggered animations */}
        <div className="w-full lg:w-1/2 lg:h-[500px] grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 mt-8 lg:mt-0">
          {/* Feature 1 */}
          <div 
            className={`flex flex-col items-start transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <Paintbrush className="text-pink-300 size-6 lg:size-7 mb-2" />
            <h3 className="text-[22px] lg:text-[24px] font-playfair text-[#18181B] mb-1">Made by artists</h3>
            <p className="text-[14px] lg:text-[15px] font-satoshi text-[#323030] line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisci mendit non.
            </p>
          </div>

          {/* Feature 2 */}
          <div 
            className={`flex flex-col items-start transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <Leaf className="text-pink-300 size-6 lg:size-7 mb-2" />
            <h3 className="text-[22px] lg:text-[24px] font-playfair text-[#18181B] mb-1">Sustainable</h3>
            <p className="text-[14px] lg:text-[15px] font-satoshi text-[#323030] line-clamp-3">
              Duis aute irure dolor in velit esse cillum dolore amus.
            </p>
          </div>

          {/* Feature 3 */}
          <div 
            className={`flex flex-col items-start transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <Apple className="text-pink-300 size-6 lg:size-7 mb-2" />
            <h3 className="text-[22px] lg:text-[24px] font-playfair text-[#18181B] mb-1">100% Freshness</h3>
            <p className="text-[14px] lg:text-[15px] font-satoshi text-[#323030] line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisci mendit non.
            </p>
          </div>

          {/* Feature 4 */}
          <div 
            className={`flex flex-col items-start transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            <Store className="text-pink-300 size-6 lg:size-7 mb-2" />
            <h3 className="text-[22px] lg:text-[24px] font-playfair text-[#18181B] mb-1">Locally produced</h3>
            <p className="text-[14px] lg:text-[15px] font-satoshi text-[#323030] line-clamp-3">
              Duis aute irure dolor in velit esse cillum dolore amus.
            </p>
          </div>
        </div>
      </div>
      
      {/* Shop Now Button - With animation */}
      <div 
        className={`flex justify-center mt-12 lg:mt-16 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
        style={{ transitionDelay: '1200ms' }}
      >
        <button className="bg-black text-white font-satoshi font-semibold py-3 px-8 hover:bg-gray-800 transition duration-300">
          SHOP NOW
        </button>
      </div>
    </div>
  );
};

export default VideoFeaturesSection;
import React, { useState, useEffect, useRef } from 'react';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Set up Intersection Observer to detect when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.15 // Trigger when 15% visible
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

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/instagram/feed`);
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch Instagram posts');
        }
        
        setPosts(result.data);
      } catch (err) {
        console.error('Error fetching Instagram posts:', err);
        setError('Failed to load Instagram posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  // Format Instagram caption for display (trim length, add ellipsis)
  const formatCaption = (caption, maxLength = 100) => {
    if (!caption) return '';
    return caption.length > maxLength 
      ? caption.substring(0, maxLength) + '...' 
      : caption;
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 my-16 bg-white overflow-hidden" 
      style={{ maxWidth: '1240px', marginLeft: 'auto', marginRight: 'auto' }}
    >
      <div className="px-4 md:px-10 lg:px-20">
        {/* Animated heading section */}
        <div className="text-center mb-12">
          <h2 
            className={`text-3xl font-bold mb-4 font-playfair transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Follow Us on Instagram
          </h2>
          <p 
            className={`text-gray-600 font-satoshi transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            @itz_atul_garg1
          </p>
          <p 
            className={`text-gray-600 mt-2 font-satoshi transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            Discover our latest designs and inspirations
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#18181B]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8 font-satoshi">{error}</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500 py-8 font-satoshi">No posts available</div>
        ) : (
          <>
            {/* Animated Instagram grid */}
            <div 
              className={`grid grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              {posts.map((post, index) => (
                <a 
                  key={post.id} 
                  href={post.permalink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`group block overflow-hidden relative transition-all duration-700 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${700 + (index * 100)}ms` }}
                >
                  <img 
                    src={post.imageUrl} 
                    alt={formatCaption(post.caption, 30)} 
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-white p-4">
                    <p className="text-sm mb-2 line-clamp-3 font-satoshi">{formatCaption(post.caption)}</p>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Animated button */}
            <div 
              className={`text-center mt-10 transition-all duration-1000 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${700 + (posts.length * 100) + 200}ms` }}
            >
              <a 
                href="https://www.instagram.com/itz_atul_garg1/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 border border-[#18181B] text-[#18181B] hover:bg-gray-100 transition-colors font-medium font-satoshi"
              >
                VIEW MORE ON INSTAGRAM
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default InstagramFeed;
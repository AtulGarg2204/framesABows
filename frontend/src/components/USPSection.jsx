import React from 'react';

const USPSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-[1200px] px-[20px] sm:px-0 md:px-0 lg:px-[100px]">
        <div className="grid grid-cols-2 gap-x-12 gap-y-12 bg-gray-50 p-12 rounded-lg">
          {/* Feature 1 */}
          <div>
            <div className="text-[#a98028] mb-4">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-[28px] font-playfair text-[#18181B] mb-2 leading-[1.2]">Made by<br />artists</h3>
            <p className="text-[14px] text-[#323030] font-satoshi leading-relaxed max-w-[250px]">Each piece is carved by<br />artisans, blending tradition<br />with artistry.</p>
          </div>

          {/* Feature 2 */}
          <div>
            <div className="text-[#a98028] mb-4">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-[28px] font-playfair text-[#18181B] mb-2 leading-[1.2]">Sustainable<br />Elegance</h3>
            <p className="text-[14px] text-[#323030] font-satoshi leading-relaxed max-w-[250px]">A timeless design for your home.</p>
          </div>

          {/* Feature 3 */}
          <div>
            <div className="text-[#a98028] mb-4">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <h3 className="text-[28px] font-playfair text-[#18181B] mb-2 leading-[1.2]">100%<br />Freshness</h3>
            <p className="text-[14px] text-[#323030] font-satoshi leading-relaxed max-w-[250px]">Our designs seamlessly<br />integrate with any interior.</p>
          </div>

          {/* Feature 4 */}
          <div>
            <div className="text-[#a98028] mb-4">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
              </svg>
            </div>
            <h3 className="text-[28px] font-playfair text-[#18181B] mb-2 leading-[1.2]">Locally<br />produced</h3>
            <p className="text-[14px] text-[#323030] font-satoshi leading-relaxed max-w-[250px]">Bespoke options to match<br />your specific needs.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default USPSection; 
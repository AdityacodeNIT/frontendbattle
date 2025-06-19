import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Showcase component: cycles through multiple case items with dynamic transitions
// Props:
// - items: array of objects { imageSrc, titleLines: string[], tags: string[], largeNumber: string, bgColor?: string, clipPath?: string, onReadMore, onViewAll }
// - autoRotate: boolean, whether to auto-cycle
// - rotateInterval: number in ms for auto-rotate interval

export default function Showcase({
  items = [{
  imageSrc: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
  titleLines: ['SWITCH', 'SOPRA STERIA KICK OFF', '2025'],
  tags: ['NORWAY', 'B2E EVENT'],
  largeNumber: '01',
  onReadMore: () => console.log('Read more case 1'),
  onViewAll: () => console.log('View all from case 1'),
},
{
 imageSrc: 's.jpg'
,
  titleLines: ['NEXT', 'ANOTHER CASE TITLE', '2024'],
  tags: ['INDIA', 'WEB EVENT'],
  largeNumber: '02',
  onReadMore: () => console.log('Read more case 2'),
  onViewAll: () => console.log('View all from case 2'),
}
],
  autoRotate = true,
  rotateInterval = 5000,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const count = items.length;
  const intervalRef = useRef(null);

  // Auto-rotate logic
  useEffect(() => {
    if (autoRotate && count > 1) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % count);
      }, rotateInterval);
      return () => clearInterval(intervalRef.current);
    }
    return () => {};
  }, [autoRotate, rotateInterval, count]);

  // Trigger fade on index change
  useEffect(() => {
    setFadeIn(false);
    const timeout = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  if (count === 0) {
    return null;
  }

  const {
    imageSrc,
    titleLines = [],
    tags = [],
    largeNumber = '',
    bgColor = '#E5004C', // default pink
    clipPath = 'polygon(0 25%, 60% 0%, 100% 0%, 100% 100%, 0% 100%)',

    onViewAll = () => {},
  } = items[currentIndex];

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + count) % count);
    if (autoRotate) clearInterval(intervalRef.current);
  };
  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % count);
    if (autoRotate) clearInterval(intervalRef.current);
  };

  return (
    <section className="relative w-full overflow-hidden bg-white" id='showcase'>
      {/* Diagonal background shape, dynamic color/clip-path */}
      <div
        className="absolute inset-0"
        style={{ background: bgColor, clipPath: clipPath }}
      />
      {/* Large background number */}
      <div className="absolute inset-0 flex items-center justify-end pr-8">
        <span className="text-white opacity-20 font-bold text-[8rem] sm:text-[10rem] leading-none select-none hidden sm:block">
          {largeNumber}
        </span>
      </div>
      {/* Content wrapper with fade transition */}
      <div className={`relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-stretch py-12 sm:py-16 px-4 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        {/* Left text/content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-left mb-2 lg:mb-0">
          <div className="text-white space-y-1 sm:space-y-2">
            {titleLines.map((line, idx) => (
              <h2
                key={idx}
                className="text-md  md:pt-2 sm:text-xl md:text-2xl lg:text-5xl font-bold leading-tight"
              >
                {line}
              </h2>
            ))}
          </div>
          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs sm:text-sm font-medium text-pink-600 bg-white bg-opacity-90 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
         
        </div>
        {/* Center image */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <img
              src={imageSrc}
              alt={titleLines.join(' ')}
              className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
      {/* Navigation Arrows */}
      {count > 1 && (
        <>  
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow focus:outline-none z-20"
          >
            <ChevronLeft className="w-5 h-5 text-pink-600" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow focus:outline-none z-20"
          >
            <ChevronRight className="w-5 h-5 text-pink-600" />
          </button>
        </>
      )}
      {/* View All Cases button at bottom center */}
      <div className="relative z-10 flex justify-center">
        <button
          onClick={onViewAll}
          className="mb-8 text-sm sm:text-base font-medium text-pink-600 bg-white bg-opacity-90 px-5 py-2 rounded-full hover:bg-opacity-100 transition"
        >
          View All Cases
        </button>
      </div>
    </section>
  );
}

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// ParallaxConnectionSection replicates the video section "Connection" and following content
// with parallax scrolling and overlay animations, following the frames:
// - Fullscreen (or full-width) background video/image layer moving slower on scroll
// - Overlay title: small label "Connection", main heading "Share quality time. And space." with fade-in
// - Below: two-column content: left heading "A more engaging way to get together.", right descriptive text and button "+ Learn more about connection"
// Use React + Tailwind + Framer Motion. Requires a video source or background image.

export default function ParallaxConnectionSection({
  videoSrc, // URL/path to background video
  posterImage, // fallback poster image if video not available
  onLearnMore = () => {},
}) {
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        // Calculate scroll offset relative to section top
        const rect = sectionRef.current.getBoundingClientRect();
        // offsetY positive when scrolling down
        setOffsetY(-rect.top);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax factors
  const bgFactor = 0.5; // background moves slower
  const overlayFactor = 0.3; // overlay text moves differently

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      {/* Background video or image layer */}
      {videoSrc ? (
        <video
          src={videoSrc}
          className="absolute top-0 left-1/2 w-auto min-w-full min-h-full max-w-none transform -translate-x-1/2 object-cover"
          style={{ transform: `translate(-50%, ${offsetY * bgFactor}px)` }}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : posterImage ? (
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${posterImage})`, transform: `translateY(${offsetY * bgFactor}px)` }}
        />
      ) : (
        <div className="absolute inset-0 bg-black" />
      )}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Overlay title content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ transform: `translateY(${offsetY * overlayFactor}px)` }}
        >
          <p className="text-sm uppercase text-white opacity-75 mb-2">Connection</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Share quality time.<br />And space.
          </h1>
        </motion.div>
      </div>

      {/* Below content: appear after scroll past half screen or pinned below */}
      <div className="relative z-10 mt-screenMin h-auto bg-white">
        {/* Use negative margin to overlap slightly */}
        <div className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left heading */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              A more engaging way to get together.
            </h2>
          </motion.div>

          {/* Right description and button */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="text-base sm:text-lg text-gray-700 mb-6">
              Apple Vision Pro makes it easy to collaborate and connect wherever you are. You can see FaceTime participants in life-size video tiles, or you can choose to use your spatial Persona and feel like you are sharing the same space with others. And use SharePlay to watch, listen, and play together with your favorite people.
            </p>
            <button
              onClick={onLearnMore}
              className="inline-flex items-center bg-orange-600 text-white px-5 py-3 rounded-full font-medium hover:bg-orange-700 transition"
            >
              <span className="mr-2">+</span> Learn more about connection
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

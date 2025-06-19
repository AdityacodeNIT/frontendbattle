import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';

// Simplified TestimonialSection with default dummy testimonials if none passed.
// Rotates through text-only testimonials with animated blob background.
// Requires Tailwind CSS and Framer Motion.

/*
  Add to global CSS (e.g., index.css) for blob animations:
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob { animation: blob 8s infinite; }
  .animation-delay-2000 { animation-delay: 2s; }
*/

export default function TestimonialS({ items = [], autoRotate = true, rotateInterval = 5000 }) {
  // Default dummy testimonials if none provided
  const defaultItems = [
    {
      quote: "This platform has transformed how I manage my business. The insights are invaluable and saved me countless hours.",
      author: 'Alex Johnson',
      role: 'Small Business Owner',
    },
    {
      quote: "I love the intuitive interface and responsive support. It feels like this tool was made just for me.",
      author: 'Priya Singh',
      role: 'Freelancer',
    },
    {
      quote: "Our sales increased by 30% after integrating these features. Highly recommend to any growing team.",
      author: 'Michael Lee',
      role: 'E-commerce Manager',
    },
  ];

  const testimonialItems = items && items.length > 0 ? items : defaultItems;
  const [current, setCurrent] = useState(0);
  const count = testimonialItems.length;

  useEffect(() => {
    if (autoRotate && count > 1) {
      const id = setInterval(() => setCurrent(prev => (prev + 1) % count), rotateInterval);
      return () => clearInterval(id);
    }
  }, [autoRotate, rotateInterval, count]);

  if (count === 0) return null;

  const { quote, author, role } = testimonialItems[current];

  return (
    <section className="relative w-full overflow-hidden text-white py-16">
      {/* Background animated blobs */}
      <div className="absolute inset-0 bg-gray-900">
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-purple-700 rounded-full opacity-50 blur-3xl animate-blob"></div>
        <div className="absolute top-[30%] right-[-15%] w-[120%] h-[120%] bg-indigo-700 rounded-full opacity-40 blur-2xl animate-blob animation-delay-2000"></div>
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <p className="text-sm uppercase tracking-wider mb-2 opacity-70">Customer Testimonials</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">What Our Users Say</h2>
        <div className="relative h-56">
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
            >
              <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-xl mx-auto">
                <div className="flex justify-center mb-4">
                  <User className="w-10 h-10 text-black opacity-80" />
                </div>
                <p className="text-sm sm:text-base italic mb-3 leading-relaxed text-black">
                  “{quote}”
                </p>
                <p className="font-semibold">{author}</p>
                {role && <p className="text-xs text-black opacity-75">{role}</p>}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {count > 1 && (
          <div className="mt-6 flex justify-center space-x-2">
            {testimonialItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full focus:outline-none transition-colors duration-300 ${
                  idx === current ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
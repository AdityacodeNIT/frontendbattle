import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';

export default function TestimonialS({ items = [], autoRotate = true, rotateInterval = 6000 }) {
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

  const testimonialItems = items.length > 0 ? items : defaultItems;
  const [current, setCurrent] = useState(0);
  const count = testimonialItems.length;

  useEffect(() => {
    if (autoRotate && count > 1) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % count);
      }, rotateInterval);
      return () => clearInterval(interval);
    }
  }, [autoRotate, rotateInterval, count]);

  const { quote, author, role } = testimonialItems[current];

  return (
    <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-gray-600 to-black text-white" id='testimonials'>
      {/* Blurred animated blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-96 h-96 bg-purple-500 opacity-30 rounded-full blur-3xl animate-blob left-[-20%] top-[-10%]"></div>
        <div className="absolute w-96 h-96 bg-pink-500 opacity-30 rounded-full blur-3xl animate-blob animation-delay-2000 right-[-20%] top-[30%]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="uppercase tracking-wide text-sm text-purple-400 mb-2">Testimonials</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-12">
          Hear From Our Users
        </h2>

        <div className="relative h-[280px] sm:h-[240px] md:h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6"
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl w-full max-w-xl mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <User className="w-10 h-10 text-white/80" />
                </div>
                <p className="text-lg sm:text-xl font-light italic leading-relaxed text-white">
                  “{quote}”
                </p>
                <div className="mt-4">
                  <p className="text-white font-semibold text-md">{author}</p>
                  {role && (
                    <p className="text-sm text-white/70 font-light">{role}</p>
                  )}
                </div>
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
                className={`w-3 h-3 rounded-full transition duration-300 ${
                  idx === current ? 'bg-white' : 'bg-white/40'
                }`}
              ></button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

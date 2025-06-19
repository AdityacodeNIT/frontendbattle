import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function Loader({ duration = 3000, onFinish = () => {} }) {
  const [percent, setPercent] = useState(0);
  const controls = useAnimation();
  const startTimeRef = useRef(null);

  useEffect(() => {
    const updatePercent = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      setPercent(Math.floor(progress * 100));
      if (progress < 1) {
        requestAnimationFrame(updatePercent);
      }
    };
    requestAnimationFrame(updatePercent);

    const halfDuration = duration / 2 / 1000;

    controls
      .start({
        width: '100%',
        rotate: 0,
        transition: { duration: halfDuration, ease: 'linear' },
      })
      .then(() =>
        controls.start({
          rotate: 90,
          transition: { duration: halfDuration, ease: 'linear' },
        })
      )
      .then(() => onFinish());
  }, [duration, controls, onFinish]);

  const pctText = `${percent.toString().padStart(3, '0')}%`;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative w-64 h-2 overflow-visible">
        <motion.div
          className="absolute left-0 top-0 h-2 bg-white"
          style={{ transformOrigin: 'left center' }} // key for rotation
          initial={{ width: 0, rotate: 0 }}
          animate={controls}
        />
      </div>
      <div className="absolute bottom-4 left-4 text-white font-mono text-sm">
        {pctText}
      </div>
    </div>
  );
}

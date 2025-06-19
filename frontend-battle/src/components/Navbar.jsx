import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <nav className="p-4 bg-white dark:bg-gray-900 flex justify-between items-center">
      <div className="text-xl font-bold dark:text-white">MyApp</div>
      <button
        onClick={() => setIsDark(prev => !prev)}
        className="p-2 rounded bg-gray-200 dark:bg-gray-700"
      >
        {isDark ? (
          <SunIcon className="w-5 h-5 text-yellow-300" />
        ) : (
          <MoonIcon className="w-5 h-5 text-gray-800" />
        )}
      </button>
    </nav>
  );
}

// src/components/Navbar.jsx
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Close mobile menu on navigation
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // Navbar links configuration
  const links = [
    { label: 'Home', href: '#hero' },
    { label: 'Features', href: '#features' },
    { label: 'Carbon', href: '#embodied' },
    { label: 'Stats', href: '#stats' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Technology', href: '#technology' },
    { label: 'Showcase', href: '#showcase' },
 
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-80 dark:bg-[#0b0e2c] dark:bg-opacity-80 backdrop-blur-sm px-6 py-3 flex items-center justify-between">
      {/* Logo / Brand */}
      <div className="text-xl font-bold text-gray-800 dark:text-white">
        MyApp
      </div>

      {/* Desktop links */}
      <ul className="hidden md:flex space-x-6 items-center">
        {links.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={handleLinkClick}
              className="text-gray-700 dark:text-gray-300 hover:text-neon-blue dark:hover:text-neon-blue transition"
            >
              {link.label}
            </a>
          </li>
        ))}
        {/* Dark mode toggle button */}
        <li>
          <button
            onClick={() => setIsDark(prev => !prev)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-800" />
            )}
          </button>
        </li>
      </ul>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Toggle menu"
        >
          {/* Simple hamburger / close icon using SVG */}
          {menuOpen ? (
            // Close icon (X)
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-[#0b0e2c] dark:bg-opacity-95 backdrop-blur-sm shadow-lg md:hidden">
          <ul className="flex flex-col space-y-2 py-4 px-6">
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block text-gray-800 dark:text-text-light hover:text-neon-blue dark:hover:text-neon-blue transition py-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => { setIsDark(prev => !prev); setMenuOpen(false); }}
                className="flex items-center p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition mt-2"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <SunIcon className="h-5 w-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-gray-800" />
                )}
                <span className="ml-2 text-gray-800 dark:text-text-light">
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

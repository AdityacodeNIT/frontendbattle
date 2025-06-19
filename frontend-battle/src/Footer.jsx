import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-50 via-white to-amber-50 text-gray-800 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + About */}
        <div>
          <h2 className="text-xl font-bold mb-3">Parivartan</h2>
          <p className="text-sm text-gray-600">
            Empowering businesses with seamless digital solutions.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-md font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            <li><a href="#home" className="hover:text-blue-600">Home</a></li>
            <li><a href="#about" className="hover:text-blue-600">About Us</a></li>
            <li><a href="#services" className="hover:text-blue-600">Services</a></li>
            <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-md font-semibold mb-2">Resources</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            <li><a href="#blog" className="hover:text-blue-600">Blog</a></li>
            <li><a href="#faq" className="hover:text-blue-600">FAQs</a></li>
            <li><a href="#privacy" className="hover:text-blue-600">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-blue-600">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-md font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook className="h-5 w-5 hover:text-blue-600" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram className="h-5 w-5 hover:text-pink-500" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="h-5 w-5 hover:text-sky-500" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="h-5 w-5 hover:text-blue-800" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-10 text-xs text-gray-500">
  All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

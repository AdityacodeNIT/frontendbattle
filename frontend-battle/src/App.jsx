import { useEffect,useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import Features from './components/Features.jsx';
import Testimonials from './components/Testimonials.jsx';

import Showcase from './components/Showcase.jsx';

import Footer from './Footer.jsx';
import Loader from './components/Loader.jsx';



export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>


    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Hero />
          <Stats />
          <Features />
           <Showcase />
          <Testimonials />
          <Footer/>
     
         
      
    
        </>
      )}
    </div>
     </div>
  );
}

import { useEffect,useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import Features from './components/Features.jsx';
import Testimonials from './components/Testimonials.jsx';
import ChartSection from './components/ChartSection.jsx';
import Showcase from './components/Showcase.jsx';
import Parallax from './components/Parallax.jsx';
import Footer from './components/Footer.jsx';
import Loader from './components/Loader.jsx';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>

   Hello
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Hero />
          <Stats />
          <Features />
          <Testimonials />
          <ChartSection />
          <Showcase />
          <Parallax />
          <Footer />
        </>
      )}
    </div>
     </div>
  );
}

// src/components/HeroSection.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

export default function HeroSection() {
  // State flags to retrigger each card's animation on click
  const [showIncome, setShowIncome] = useState(true);
  const [showExpenses, setShowExpenses] = useState(true);
  const [showCash, setShowCash] = useState(true);

  // Animation variants for fade-in + scale
  const cardVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  // Example chart data (you can replace with real data or props)
  // Bar Chart: Total Income over months
  const incomeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Total Income',
        data: [400, 450, 500, 550, 600, 650],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderRadius: 4,
      },
    ],
  };
  const incomeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Total Income',
        color: '#fff',
        font: { size: 14 },
      },
      tooltip: {
        callbacks: {
          label: ctx => `$${ctx.parsed.y}k`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#fff' },
        grid: { display: false },
      },
      y: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.2)' },
      },
    },
  };

  // Pie Chart: Expenses breakdown
  const expensesData = {
    labels: ['Insurance', 'Wages', 'Rent', 'Legal Expenses', 'Other'],
    datasets: [
      {
        data: [20, 30, 15, 10, 25], // percentages or values
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
        ],
      },
    ],
  };
  const expensesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#fff' },
      },
      title: {
        display: true,
        text: 'Expenses',
        color: '#fff',
        font: { size: 14 },
      },
      tooltip: {
        callbacks: {
          label: ctx => {
            const label = ctx.label || '';
            const val = ctx.parsed;
            return `${label}: $${val}k`;
          },
        },
      },
    },
  };

  // Cash Card: current vs prior (we'll just show text inside a small card)
  // We won't use Chart.js here, just a styled div
  // But for uniformity, we animate it similarly.
  const currentCash = 288721;
  const priorCash = 95319;
  const cashGrowth = ((currentCash - priorCash) / priorCash) * 100;

  return (
    <section
      id="hero"
      className="relative bg-gradient-to-b from-[#003366] to-[#001f3f] text-white min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-16 overflow-hidden"
    >
      {/* Top Ratings Bar */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-blue-200 mb-6 z-10 text-center">
        <span>⭐ 4.8 rating on <span className="text-white font-medium">Capterra</span></span>
        <span>⭐ 4.8 rating on <span className="text-white font-medium">G2</span></span>
        <span>⭐ 350+ reviews on <span className="text-white font-medium">Xero</span></span>
        <span>⭐ 550+ reviews on <span className="text-white font-medium">QuickBooks</span></span>
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center leading-tight z-10 max-w-4xl">
        Create reports, forecasts, <br className="hidden sm:block" /> dashboards & consolidations
      </h1>

      {/* Subheading */}
      <p className="mt-4 text-base sm:text-lg md:text-xl text-blue-100 z-10 text-center px-2">
        ✨ Now with <span className="text-white font-semibold">AI-insights</span>
      </p>

      {/* CTA Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4 z-10">
        <button className="bg-white text-[#003366] font-semibold px-6 py-3 rounded-md shadow hover:bg-blue-100 transition">
          Start 14-day free trial
        </button>
        <a href="#features" className="text-blue-200 hover:text-white underline text-sm text-center">
          👀 See what we do
        </a>
      </div>

      {/* Floating Chart Cards */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Total Income Bar Chart Card */}
        <AnimatePresence>
          {showIncome && (
            <motion.div
              key="incomeCard"
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.8 }}
              onClick={() => {
                // retrigger: unmount then remount
                setShowIncome(false);
                setTimeout(() => setShowIncome(true), 100);
              }}
              className="
                absolute bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg
                w-[60%] sm:w-64 md:w-72 lg:w-80
                top-[8%] sm:top-[6%] md:top-[8%]
                right-[5%] sm:right-[10%] md:right-[15%]
                p-4 cursor-pointer pointer-events-auto overflow-hidden
                text-white
              "
            >
              <div className="h-32 md:h-36">
                <Bar data={incomeData} options={incomeOptions} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expenses Pie Chart Card */}
        <AnimatePresence>
          {showExpenses && (
            <motion.div
              key="expensesCard"
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.8, delay: 0.3 }}
              onClick={() => {
                setShowExpenses(false);
                setTimeout(() => setShowExpenses(true), 100);
              }}
              className="
                absolute bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg
                w-[50%] sm:w-56 md:w-64 lg:w-72
                bottom-[14%] sm:bottom-[12%] md:bottom-[14%]
                left-[4%] sm:left-[10%] md:left-[15%]
                p-4 cursor-pointer pointer-events-auto overflow-hidden
                text-white
              "
            >
              <div className="h-32 md:h-36">
                <Pie data={expensesData} options={expensesOptions} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
  {showIncome && (
    <motion.div
      key="incomeCardWrapper"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-[8%] sm:top-[6%] md:top-[8%] right-[5%] sm:right-[10%] md:right-[15%] pointer-events-none"
    >
      <motion.div
        // existing fadeIn animation
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.8 }}
        onClick={() => {
          setShowIncome(false);
          setTimeout(() => setShowIncome(true), 100);
        }}
        className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg w-[60%] sm:w-64 md:w-72 lg:w-80 p-4 cursor-pointer pointer-events-auto overflow-hidden text-white"
      >
        <div className="h-32 md:h-36">
          <Bar data={incomeData} options={incomeOptions} />
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


        {/* Cash Info Card */}
        <AnimatePresence>
          {showCash && (
            <motion.div
              key="cashCard"
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.8, delay: 0.6 }}
              onClick={() => {
                setShowCash(false);
                setTimeout(() => setShowCash(true), 100);
              }}
              className="
                absolute bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg
                w-[50%] sm:w-48 md:w-56 lg:w-64
                bottom-[6%] sm:bottom-[4%] md:bottom-[6%]
                right-[4%] sm:right-[8%] md:right-[10%]
                p-4 cursor-pointer pointer-events-auto 
                text-white flex flex-col justify-between
              "
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm md:text-base font-medium">Cash</h3>
                  <span
                    className={`
                      text-sm font-semibold ${
                        cashGrowth >= 0 ? 'text-green-300' : 'text-red-300'
                      }
                    `}
                  >
                    {cashGrowth >= 0 ? '▲' : '▼'} {Math.abs(cashGrowth).toFixed(1)}%
                  </span>
                </div>
                <p className="mt-2 text-2xl md:text-3xl font-bold">
                  ${currentCash.toLocaleString()}
                </p>
              </div>
              <p className="mt-2 text-xs text-blue-200">
                prior: ${priorCash.toLocaleString()}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

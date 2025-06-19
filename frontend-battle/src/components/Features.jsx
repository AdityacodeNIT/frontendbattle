import React, { useState } from 'react';
import { CreditCard, Zap, Layers, Calendar } from 'lucide-react';

const tabs = [
  {
    key: 'billing',
    label: 'Billing',
    icon: <CreditCard className="w-5 h-5" />, 
    title: 'Real-Time Convergent Billing',
    description: 'Instantaneous, accurate billing across all services and payment methods.',
  },
  {
    key: 'charging',
    label: 'Charging',
    icon: <Zap className="w-5 h-5" />, 
    title: 'Online Charging System',
    description: 'AI-powered insights that predict customer needs and drive personalized experiences.',
  },
  {
    key: 'catalog',
    label: 'Catalog',
    icon: <Layers className="w-5 h-5" />, 
    title: 'Unified Service Catalog',
    description: 'Centralized catalog management for seamless product and service publication.',
  },
  {
    key: 'events',
    label: 'Events',
    icon: <Calendar className="w-5 h-5" />, 
    title: 'Event Management',
    description: 'Real-time event streaming and analytics for proactive operations.',
  },
];

// Each panel returns responsive layout with overflow handling and subtle transition
function BillingPanel() {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-inner flex flex-col transition-opacity duration-300">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <h4 className="text-lg font-semibold">Billing Summary</h4>
        <button className="mt-2 sm:mt-0 text-sm text-blue-600 hover:underline">View All</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-xl font-bold">₹1.2 Cr</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-sm text-gray-500">Active Plans</p>
          <p className="text-xl font-bold">324</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-sm text-gray-500">Pending Invoices</p>
          <p className="text-xl font-bold">56</p>
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-xl max-h-48 overflow-y-auto">
        <h5 className="font-medium mb-2">Recent Transactions</h5>
        <ul className="text-sm space-y-2">
          {Array.from({ length: 8 }).map((_, idx) => (
            <li key={idx} className="flex justify-between">
              <span>User #{1024 + idx}</span>
              <span>₹{1000 + idx * 50}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ChargingPanel() {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-inner flex flex-col transition-opacity duration-300">
      <h4 className="text-lg font-semibold mb-4">Charging Metrics</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-yellow-100 p-4 rounded-xl">
          <p className="text-sm text-gray-600">Total Sessions</p>
          <p className="text-xl font-bold">4,321</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl">
          <p className="text-sm text-gray-600">Peak Load</p>
          <p className="text-xl font-bold">870 kWh</p>
        </div>
      </div>
      <div className="bg-yellow-50 p-4 rounded-xl max-h-48 overflow-y-auto">
        <h5 className="font-medium mb-2">Session Types</h5>
        <ul className="text-sm space-y-2">
          <li className="flex justify-between"><span>Fast Charging</span><span>56%</span></li>
          <li className="flex justify-between"><span>Standard</span><span>30%</span></li>
          <li className="flex justify-between"><span>Slow</span><span>14%</span></li>
        </ul>
      </div>
    </div>
  );
}

function CatalogPanel() {
  const items = [
    { name: 'Mobile Plan', detail: 'Unlimited calls, 2GB/day' },
    { name: 'Broadband', detail: '200 Mbps, Unlimited data' },
    { name: 'Enterprise Cloud', detail: '99.99% SLA uptime' },
    { name: 'IoT Bundle', detail: 'Device + Platform package' },
    { name: 'VPN Service', detail: 'Secure corporate access' },
    { name: 'Streaming Package', detail: 'HD streaming 1TB/month' },
  ];
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-inner flex flex-col transition-opacity duration-300">
      <h4 className="text-lg font-semibold mb-4">Service Catalog</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-64">
        {items.map((item, idx) => (
          <div key={idx} className="bg-green-100 p-4 rounded-xl">
            <p className="text-sm font-medium text-gray-600">{item.name}</p>
            <p className="text-sm text-gray-800">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsPanel() {
  const events = [
    { type: 'Info', msg: 'User login detected', time: '10:24 AM' },
    { type: 'Alert', msg: 'Data threshold reached', time: '10:45 AM' },
    { type: 'Warning', msg: 'Backup failed', time: '11:00 AM' },
    { type: 'Info', msg: 'Configuration updated', time: '11:15 AM' },
    { type: 'Alert', msg: 'High memory usage', time: '11:40 AM' },
  ];
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-inner flex flex-col transition-opacity duration-300">
      <h4 className="text-lg font-semibold mb-4">System Events</h4>
      <div className="bg-cyan-50 p-4 rounded-xl space-y-3 max-h-48 overflow-y-auto">
        {events.map((e, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <span className="text-gray-600">[{e.type}] {e.msg}</span>
            <span className="text-gray-500">{e.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeatureTabsSection() {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const active = tabs.find((t) => t.key === activeTab);

  return (
    <section className="w-full bg-slate-400 py-12 sm:py-16 px-4" id='features'>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm uppercase text-gray-200 tracking-wider mb-2">Efficiency, Scalability, and Agility</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Unparalleled <span className="text-black">BSS/OSS Capabilities</span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          <div className="inline-flex space-x-2 bg-slate-300 rounded-lg p-1 mx-auto">
            {tabs.map((tab) => {
              const isActive = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none 
                    ${isActive ? 'bg-white shadow-lg' : 'bg-transparent text-gray-700 hover:bg-white/50'}
                  `}
                >
                  <span className={`${isActive ? 'text-black' : 'text-gray-600'}`}>{tab.icon}</span>
                  <span className={`${isActive ? 'font-semibold text-black' : 'font-medium'}`}>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="relative mt-6 bg-slate-200 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3">{active.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{active.description}</p>
            </div>
            <div className="w-full lg:w-1/2 p-4 sm:p-6 flex items-center justify-center bg-white">
              <div className="w-full max-w-md">
                {active.key === 'billing' && <BillingPanel />}
                {active.key === 'charging' && <ChargingPanel />}
                {active.key === 'catalog' && <CatalogPanel />}
                {active.key === 'events' && <EventsPanel />}
              </div>
            </div>
          </div>
          {/* Bottom Nav Overlay: adapt positioning on small screens */}
        
        </div>
      </div>
    </section>
  );
}

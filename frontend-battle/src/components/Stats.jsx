import React from 'react'

export default function Stats() {
  const stats = [
    { label: 'Developers', value: '1K+' },
    { label: 'Projects Submitted', value: '500+' },
    { label: 'Awards Given', value: '25' },
    { label: 'Community Votes', value: '10K+' },
  ];

  return (
    <section className="py-16 px-6 text-center bg-gray-100 dark:bg-gray-800">
      <h2 className="text-3xl font-bold mb-10">Event Stats</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-4xl font-bold">{stat.value}</p>
            <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


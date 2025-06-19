import React from 'react';
import { ArrowUp, ArrowDown, ArrowRight, Download } from 'lucide-react';

// StatsSection replicates the exact layout and text of the provided design.
// Uses React + Tailwind CSS. Values are hardcoded to match the design exactly.
// Props for customizing colors:
// - barColor: hex for the filled portion of bars
// - trackColor: hex for the bar track background
// - changeUpColor / changeDownColor: hex for change arrow and text

export default function StatsSection({
  barColor = '#8B5E5B', // match design's muted red/brown
  trackColor = '#E4E1DE', // light track color
  changeUpColor = '#A66C55',
  changeDownColor = '#A66C55',
}) {
  // Data for each metric column
  const columns = [
    {
      key: 'carbon',
      title: 'Managed portfolio carbon footprint',
      unit: 'tCO₂e',
      values: [
        { year: 2022, value: 45048 },
        { year: 2021, value: 14111 },
        { year: 2020, value: 32813 },
        { year: 2019, value: 38673 },
      ],
      change: { fromYear: 2019, percent: 16, increase: true },
      link: { text: 'See full breakdown of carbon footprint', type: 'arrow' },
      filename: 'carbon_footprint_breakdown.csv',
    },
    {
      key: 'intensity',
      title: 'Managed portfolio energy intensity',
      unit: 'kWh/m²',
      values: [
        { year: 2022, value: 123 },
        { year: 2021, value: 128 },
        { year: 2020, value: 135 },
        { year: 2019, value: 157 },
      ],
      change: { fromYear: 2019, percent: 22, increase: false },
      link: { text: 'Download the data', type: 'download' },
      filename: 'energy_intensity_data.csv',
    },
    {
      key: 'consumption',
      title: 'Managed portfolio energy consumption',
      unit: 'kWh',
      values: [
        { year: 2022, value: 47790662 },
        { year: 2021, value: 49324077 },
        { year: 2020, value: 48784205 },
        { year: 2019, value: 65198706 },
      ],
      change: { fromYear: 2019, percent: 27, increase: false },
      link: { text: 'Download the data', type: 'download' },
      filename: 'energy_consumption_data.csv',
    },
  ];

  // Function to generate CSV and trigger download
  const handleDownload = (col) => {
    const header = 'Year,Value';
    const rows = col.values.map((entry) => `${entry.year},${entry.value}`);
    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', col.filename || 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="w-full bg-[#F5F0EB] text-gray-800 py-12" id='stats'>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {columns.map((col) => {
            // Compute max value among this column's values to normalize bar widths
            const maxValue = Math.max(...col.values.map(v => v.value));
            return (
              <div key={col.key} className="flex-1">
                {/* Header: title and unit */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-4">
                  <h3 className="text-lg font-medium leading-tight">
                    {col.title}
                  </h3>
                  <span className="mt-1 sm:mt-0 text-base font-medium">
                    {col.unit}
                  </span>
                </div>
                {/* Main value: most recent (first in array) */}
                <div className="text-4xl font-semibold mb-1">
                  {col.values[0].value.toLocaleString()}
                </div>
                {/* Change from baseline */}
                <div className="flex items-center text-sm font-medium mb-4">
                  <span className="mr-2">from {col.change.fromYear}</span>
                  {col.change.increase ? (
                    <ArrowUp className="w-4 h-4" style={{ color: changeUpColor }} />
                  ) : (
                    <ArrowDown className="w-4 h-4" style={{ color: changeDownColor }} />
                  )}
                  <span className="ml-1" style={{ color: col.change.increase ? changeUpColor : changeDownColor }}>
                    {col.change.percent}%
                  </span>
                </div>
                {/* Bars for each year */}
                <div className="space-y-3">
                  {col.values.map((entry) => {
                    const widthPercent = (entry.value / maxValue) * 100;
                    return (
                      <div key={entry.year} className="flex items-center">
                        <span className="w-16 text-sm text-gray-700">{entry.year}</span>
                        <div className="flex-1 mx-2">
                          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: trackColor }}>
                            <div
                              className="h-2 rounded-full"
                              style={{ width: `${widthPercent}%`, backgroundColor: barColor }}
                            />
                          </div>
                        </div>
                        <span className="w-24 text-sm text-right text-gray-700">
                          {entry.value.toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/* Link at bottom */}
                <div className="mt-6">
                  <button
                    onClick={() => handleDownload(col)}
                    className="inline-flex items-center text-sm font-medium text-gray-800 hover:underline"
                  >
                    {col.link.text}
                    {col.link.type === 'arrow' ? (
                      <ArrowRight className="w-4 h-4 ml-2 text-gray-800" />
                    ) : (
                      <Download className="w-4 h-4 ml-2 text-gray-800" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
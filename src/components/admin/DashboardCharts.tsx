import React from 'react';
import { ChevronDown } from 'lucide-react';

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sales Overview Line Chart Area */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-subtle flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-brand-black">Sales Overview</h3>
            <p className="text-xs text-gray-400">Store revenue performance: Rs. 0</p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <span>Last 7 Days</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* SVG Chart Graphic - Flat 0 Baseline */}
        <div className="relative w-full h-56 pt-4 flex flex-col justify-center">
          <svg
            viewBox="0 0 700 200"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            <line x1="0" y1="40" x2="700" y2="40" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="90" x2="700" y2="90" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="140" x2="700" y2="140" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="190" x2="700" y2="190" stroke="#e5e7eb" strokeWidth="1.5" />

            {/* Flat Line at baseline 190 (0 sales) */}
            <polyline
              points="20,190 120,190 220,190 320,190 420,190 520,190 680,190"
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Dots on baseline */}
            {[
              { cx: 20, cy: 190 },
              { cx: 120, cy: 190 },
              { cx: 220, cy: 190 },
              { cx: 320, cy: 190 },
              { cx: 420, cy: 190 },
              { cx: 520, cy: 190 },
              { cx: 680, cy: 190 },
            ].map((pt, i) => (
              <circle
                key={i}
                cx={pt.cx}
                cy={pt.cy}
                r="3.5"
                fill="#ffffff"
                stroke="#9CA3AF"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>

        {/* Date labels */}
        <div className="flex justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-100">
          <span>Day 1</span>
          <span>Day 2</span>
          <span>Day 3</span>
          <span>Day 4</span>
          <span>Day 5</span>
          <span>Day 6</span>
          <span>Today</span>
        </div>
      </div>

      {/* Order Status Donut Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-subtle flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-brand-black">Order Status</h3>
            <p className="text-xs text-gray-400">Fulfillment distribution</p>
          </div>
          <span className="text-[11px] font-semibold text-brand-brown hover:underline cursor-pointer">
            View All →
          </span>
        </div>

        {/* Donut representation - Cleared to 0 */}
        <div className="relative flex items-center justify-center py-4">
          <div className="relative w-36 h-36 rounded-full border-[10px] border-gray-200 flex items-center justify-center shadow-inner">
            <div className="text-center">
              <span className="block text-3xl font-black text-brand-black">0</span>
              <span className="block text-[10px] text-gray-400 uppercase font-semibold">
                Total Orders
              </span>
            </div>
          </div>
        </div>

        {/* Legend - All 0 */}
        <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-gray-100 text-xs">
          <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg">
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Pending
            </span>
            <span className="font-bold text-gray-700">0</span>
          </div>
          <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg">
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Confirmed
            </span>
            <span className="font-bold text-gray-700">0</span>
          </div>
          <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg">
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              Out for Delivery
            </span>
            <span className="font-bold text-gray-700">0</span>
          </div>
          <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg">
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Delivered
            </span>
            <span className="font-bold text-gray-700">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

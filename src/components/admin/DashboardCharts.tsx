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
            <p className="text-xs text-gray-400">Store revenue performance</p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <span>Last 7 Days</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* SVG Chart Graphic */}
        <div className="relative w-full h-56 pt-4">
          <svg
            viewBox="0 0 700 200"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            <line x1="0" y1="40" x2="700" y2="40" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="90" x2="700" y2="90" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="140" x2="700" y2="140" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="190" x2="700" y2="190" stroke="#f3f4f6" strokeWidth="1" />

            {/* Area fill */}
            <polygon
              points="20,160 120,120 220,140 320,80 420,110 520,60 680,100 680,190 20,190"
              fill="url(#salesGradient)"
            />

            {/* Line */}
            <polyline
              points="20,160 120,120 220,140 320,80 420,110 520,60 680,100"
              fill="none"
              stroke="#10B981"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Dots */}
            {[
              { cx: 20, cy: 160 },
              { cx: 120, cy: 120 },
              { cx: 220, cy: 140 },
              { cx: 320, cy: 80 },
              { cx: 420, cy: 110 },
              { cx: 520, cy: 60 },
              { cx: 680, cy: 100 },
            ].map((pt, i) => (
              <circle
                key={i}
                cx={pt.cx}
                cy={pt.cy}
                r="4"
                fill="#ffffff"
                stroke="#10B981"
                strokeWidth="2.5"
              />
            ))}
          </svg>
        </div>

        {/* Date labels */}
        <div className="flex justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-100">
          <span>Aug 24</span>
          <span>Aug 25</span>
          <span>Aug 26</span>
          <span>Aug 27</span>
          <span>Aug 28</span>
          <span>Aug 29</span>
          <span>Aug 30</span>
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

        {/* Donut representation */}
        <div className="relative flex items-center justify-center py-4">
          <div className="relative w-36 h-36 rounded-full border-[10px] border-amber-400 flex items-center justify-center shadow-inner">
            <div className="text-center">
              <span className="block text-2xl font-black text-brand-black">142</span>
              <span className="block text-[10px] text-gray-400 uppercase font-semibold">
                Total Orders
              </span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-gray-100 text-xs">
          <div className="flex items-center justify-between p-1.5 bg-amber-50/50 rounded-lg">
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Pending
            </span>
            <span className="font-bold text-brand-black">32</span>
          </div>
          <div className="flex items-center justify-between p-1.5 bg-blue-50/50 rounded-lg">
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Processing
            </span>
            <span className="font-bold text-brand-black">48</span>
          </div>
          <div className="flex items-center justify-between p-1.5 bg-indigo-50/50 rounded-lg">
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Shipped
            </span>
            <span className="font-bold text-brand-black">36</span>
          </div>
          <div className="flex items-center justify-between p-1.5 bg-emerald-50/50 rounded-lg">
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Delivered
            </span>
            <span className="font-bold text-brand-black">24</span>
          </div>
        </div>
      </div>
    </div>
  );
}

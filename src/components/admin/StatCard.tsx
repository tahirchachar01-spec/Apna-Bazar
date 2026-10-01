import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  subtitle?: string;
  icon: React.ReactNode;
  iconBgColor?: string;
}

export function StatCard({
  title,
  value,
  trend,
  subtitle = 'vs last week',
  icon,
  iconBgColor = 'bg-emerald-50 text-emerald-600',
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-subtle flex flex-col justify-between hover:shadow-card transition-shadow">
      <div className="flex items-center justify-between">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm', iconBgColor)}>
          {icon}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
            <ArrowUpRight className="w-3 h-3" />
            <span>{trend}</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <span className="text-xs font-semibold text-gray-500 block">{title}</span>
        <h3 className="text-2xl font-bold text-brand-black mt-0.5 tracking-tight">{value}</h3>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 text-[11px] text-gray-400">
        <span>{subtitle}</span>
      </div>
    </div>
  );
}

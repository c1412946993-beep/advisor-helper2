import React from 'react';

interface ProgressProps {
  current: number;
  total: number;
  label?: string;
}

export const Progress: React.FC<ProgressProps> = ({ current, total, label }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-semibold text-navy-700">{label}</p>
          <p className="text-sm text-slate-600">{current} of {total}</p>
        </div>
      )}
      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-navy-700 h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};


import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, className = "" }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className={`w-full ${className}`}>
      <Progress value={percentage} className="h-3 bg-gray-200" />
      <div className="flex justify-between text-sm text-gray-600 mt-1">
        <span>{current}/{total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;

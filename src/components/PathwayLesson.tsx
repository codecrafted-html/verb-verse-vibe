
import React from 'react';
import { CheckCircle, Lock, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PathwayLessonProps {
  lessonNumber: number;
  isCompleted: boolean;
  isLocked: boolean;
  isCurrent: boolean;
  isSpecial?: boolean;
  position: 'left' | 'center' | 'right';
  onStart: () => void;
}

const PathwayLesson: React.FC<PathwayLessonProps> = ({
  lessonNumber,
  isCompleted,
  isLocked,
  isCurrent,
  isSpecial = false,
  position,
  onStart
}) => {
  const getPositionClass = () => {
    switch (position) {
      case 'left':
        return 'ml-8';
      case 'right':
        return 'mr-8';
      default:
        return 'mx-auto';
    }
  };

  const getLessonIcon = () => {
    if (isSpecial) {
      return <Crown className="w-8 h-8 text-green-500" />;
    }
    if (isCompleted) {
      return <CheckCircle className="w-8 h-8 text-white" />;
    }
    if (isLocked) {
      return <Lock className="w-6 h-6 text-gray-400" />;
    }
    return <span className="text-lg font-bold text-white">{lessonNumber}</span>;
  };

  const getButtonStyle = () => {
    if (isLocked) {
      return 'bg-gray-300 border-gray-400 cursor-not-allowed rounded-full';
    }
    if (isCompleted) {
      return 'bg-green-500 border-green-600 hover:bg-green-600 shadow-lg animate-pulse rounded-full';
    }
    if (isCurrent) {
      return 'bg-green-400 border-green-500 hover:bg-green-500 shadow-xl scale-110 animate-bounce rounded-full';
    }
    return 'bg-green-500 border-green-600 hover:bg-green-600 rounded-full';
  };

  return (
    <div className={`relative flex justify-center ${getPositionClass()}`}>
      {/* Connecting line to next lesson */}
      {!isSpecial && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-2 h-16 bg-gradient-to-b from-green-300 to-green-500 rounded-full" />
      )}
      
      <Button
        onClick={onStart}
        disabled={isLocked}
        className={`
          w-20 h-20 border-4 transition-all duration-300 transform hover:scale-105
          ${getButtonStyle()}
          ${isCurrent ? 'animate-pulse' : ''}
        `}
      >
        {getLessonIcon()}
      </Button>
      
      {/* Lesson number badge */}
      {!isSpecial && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl px-3 py-2 shadow-md border-2 border-green-200">
          <span className="text-sm font-semibold text-green-700">{lessonNumber}</span>
        </div>
      )}
    </div>
  );
};

export default PathwayLesson;

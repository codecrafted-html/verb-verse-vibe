
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Play, CheckCircle } from 'lucide-react';

interface LessonCardProps {
  lessonNumber: number;
  title: string;
  description: string;
  isLocked: boolean;
  isCompleted: boolean;
  onStart: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({
  lessonNumber,
  title,
  description,
  isLocked,
  isCompleted,
  onStart
}) => {
  return (
    <Card className={`w-full transition-all duration-200 ${
      isLocked 
        ? 'opacity-50 cursor-not-allowed' 
        : 'hover:shadow-lg cursor-pointer'
    } ${isCompleted ? 'border-green-500 bg-green-50' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              isCompleted 
                ? 'bg-green-500 text-white' 
                : isLocked 
                ? 'bg-gray-300 text-gray-500'
                : 'bg-blue-500 text-white'
            }`}>
              {isCompleted ? (
                <CheckCircle className="w-5 h-5" />
              ) : isLocked ? (
                <Lock className="w-5 h-5" />
              ) : (
                lessonNumber
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          </div>
          
          <Button
            onClick={onStart}
            disabled={isLocked}
            variant={isCompleted ? "outline" : "default"}
            className={isCompleted ? "border-green-500 text-green-600" : "bg-green-600 hover:bg-green-700"}
          >
            {isLocked ? (
              <Lock className="w-4 h-4" />
            ) : isCompleted ? (
              "Herhalen"
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" />
                Start
              </>
            )}
          </Button>
        </div>
        
        {!isLocked && (
          <div className="text-xs text-gray-500">
            {isCompleted ? "✓ Voltooid" : "Nog niet voltooid"}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LessonCard;

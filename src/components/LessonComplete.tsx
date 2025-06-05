
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Target, Flame } from 'lucide-react';

interface LessonCompleteProps {
  score: number;
  totalQuestions: number;
  xpEarned: number;
  onContinue: () => void;
  onRestart: () => void;
}

const LessonComplete: React.FC<LessonCompleteProps> = ({
  score,
  totalQuestions,
  xpEarned,
  onContinue,
  onRestart
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
        </div>
        <CardTitle className="text-2xl font-bold text-green-600">
          Les Voltooid!
        </CardTitle>
      </CardHeader>
      
      <CardContent className="text-center space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Target className="w-5 h-5 text-blue-500" />
            <span className="text-lg">
              Score: {score}/{totalQuestions} ({percentage}%)
            </span>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-lg">
              +{xpEarned} XP behaald!
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={onContinue}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Volgende Les
          </Button>
          <Button 
            onClick={onRestart}
            variant="outline"
            className="w-full"
          >
            Opnieuw Proberen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonComplete;

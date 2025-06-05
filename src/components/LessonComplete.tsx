
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Target, Flame, Star } from 'lucide-react';

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
  const isPerfect = percentage === 100;
  
  return (
    <Card className="w-full max-w-md mx-auto animate-scale-in shadow-2xl">
      <CardHeader className="text-center bg-gradient-to-b from-yellow-50 to-green-50">
        <div className="mx-auto mb-4 animate-bounce">
          {isPerfect ? (
            <div className="relative">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto" />
              <Star className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-spin" />
            </div>
          ) : (
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
          )}
        </div>
        <CardTitle className="text-2xl font-bold text-green-600 animate-fade-in">
          {isPerfect ? 'Perfect! 🎉' : 'Les Voltooid! 👏'}
        </CardTitle>
        {isPerfect && (
          <p className="text-sm text-green-600 font-medium animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Fantastisch werk!
          </p>
        )}
      </CardHeader>
      
      <CardContent className="text-center space-y-6 p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Target className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-semibold">
              {score}/{totalQuestions} ({percentage}%)
            </span>
          </div>
          
          <div className="flex items-center justify-center space-x-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Flame className="w-6 h-6 text-orange-500" />
            <span className="text-xl font-semibold text-orange-600">
              +{xpEarned} XP behaald!
            </span>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-2 mt-6">
            <div className="bg-yellow-100 rounded-lg p-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-lg font-bold text-yellow-600">{xpEarned}</div>
              <div className="text-xs text-yellow-700">TOTAL XP</div>
            </div>
            <div className="bg-blue-100 rounded-lg p-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-lg font-bold text-blue-600">6:55</div>
              <div className="text-xs text-blue-700">COMMITTED</div>
            </div>
            <div className="bg-green-100 rounded-lg p-3 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="text-lg font-bold text-green-600">{percentage}%</div>
              <div className="text-xs text-green-700">AMAZING</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 mt-8">
          <Button 
            onClick={onContinue}
            className="w-full bg-blue-500 hover:bg-blue-600 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            CONTINUE
          </Button>
          <Button 
            onClick={onRestart}
            variant="outline"
            className="w-full border-2 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Opnieuw Proberen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonComplete;

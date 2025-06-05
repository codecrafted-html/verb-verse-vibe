
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
    <Card className="w-full max-w-md mx-auto animate-scale-in shadow-2xl rounded-3xl border-3 border-green-300">
      <CardHeader className="text-center bg-gradient-to-b from-green-50 to-emerald-50 rounded-t-3xl">
        <div className="mx-auto mb-4 animate-bounce">
          {isPerfect ? (
            <div className="relative">
              <Trophy className="w-20 h-20 text-green-500 mx-auto" />
              <Star className="w-8 h-8 text-green-400 absolute -top-2 -right-2 animate-spin" />
            </div>
          ) : (
            <Trophy className="w-16 h-16 text-green-500 mx-auto" />
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
      
      <CardContent className="text-center space-y-6 p-8">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Target className="w-6 h-6 text-green-500" />
            <span className="text-xl font-semibold">
              {score}/{totalQuestions} ({percentage}%)
            </span>
          </div>
          
          <div className="flex items-center justify-center space-x-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Flame className="w-6 h-6 text-green-500" />
            <span className="text-xl font-semibold text-green-600">
              +{xpEarned} XP behaald!
            </span>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-green-100 rounded-2xl p-4 animate-fade-in border-2 border-green-300" style={{ animationDelay: '0.3s' }}>
              <div className="text-lg font-bold text-green-600">{xpEarned}</div>
              <div className="text-xs text-green-700">TOTAL XP</div>
            </div>
            <div className="bg-green-100 rounded-2xl p-4 animate-fade-in border-2 border-green-300" style={{ animationDelay: '0.4s' }}>
              <div className="text-lg font-bold text-green-600">6:55</div>
              <div className="text-xs text-green-700">COMMITTED</div>
            </div>
            <div className="bg-green-100 rounded-2xl p-4 animate-fade-in border-2 border-green-300" style={{ animationDelay: '0.5s' }}>
              <div className="text-lg font-bold text-green-600">{percentage}%</div>
              <div className="text-xs text-green-700">AMAZING</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 mt-8">
          <Button 
            onClick={onContinue}
            className="w-full bg-green-500 hover:bg-green-600 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105 rounded-2xl"
          >
            CONTINUE
          </Button>
          <Button 
            onClick={onRestart}
            variant="outline"
            className="w-full border-3 border-green-400 text-green-600 hover:bg-green-50 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105 rounded-2xl"
          >
            Opnieuw Proberen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonComplete;

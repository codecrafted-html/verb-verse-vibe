
import React from 'react';
import { Heart, Flame, Trophy, Infinity as InfinityIcon } from 'lucide-react';
import CheatCodeModal from './CheatCodeModal';

interface HeaderProps {
  hearts: number;
  streak: number;
  xp: number;
  hasInfiniteHearts?: boolean;
  completedLevels?: number;
  onCheatActivated: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  hearts, 
  streak, 
  xp, 
  hasInfiniteHearts = false, 
  completedLevels = 0,
  onCheatActivated 
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-green-200 px-4 py-3 sticky top-0 z-50 rounded-b-2xl">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-green-600 animate-pulse">IrregularVerbs</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 animate-fade-in bg-green-50 px-3 py-2 rounded-2xl border-2 border-green-200">
            <Flame className="w-5 h-5 text-green-500" />
            <span className="font-semibold text-green-600">{streak}</span>
          </div>
          
          <div className="flex items-center space-x-2 animate-fade-in bg-green-50 px-3 py-2 rounded-2xl border-2 border-green-200" style={{ animationDelay: '0.1s' }}>
            <Trophy className="w-5 h-5 text-green-500" />
            <span className="font-semibold text-green-600">{xp} XP</span>
          </div>

          {completedLevels > 0 && (
            <div className="flex items-center space-x-2 animate-fade-in bg-blue-50 px-3 py-2 rounded-2xl border-2 border-blue-200" style={{ animationDelay: '0.15s' }}>
              <span className="text-blue-600 font-bold">📚</span>
              <span className="font-semibold text-blue-600">{completedLevels}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2 animate-fade-in bg-green-50 px-3 py-2 rounded-2xl border-2 border-green-200" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center space-x-1">
              {hasInfiniteHearts ? (
                <div className="flex items-center space-x-1">
                  <InfinityIcon className="w-5 h-5 text-purple-500 animate-pulse" />
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </div>
              ) : (
                [...Array(5)].map((_, i) => (
                  <Heart 
                    key={i} 
                    className={`w-5 h-5 transition-all duration-300 ${
                      i < hearts ? 'text-red-500 fill-red-500 animate-pulse' : 'text-gray-300'
                    }`} 
                  />
                ))
              )}
            </div>
            <CheatCodeModal onCheatActivated={onCheatActivated} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

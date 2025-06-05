
import React from 'react';
import { Heart, Flame, Trophy } from 'lucide-react';

interface HeaderProps {
  hearts: number;
  streak: number;
  xp: number;
}

const Header: React.FC<HeaderProps> = ({ hearts, streak, xp }) => {
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
          
          <div className="flex items-center space-x-1 animate-fade-in bg-green-50 px-3 py-2 rounded-2xl border-2 border-green-200" style={{ animationDelay: '0.2s' }}>
            {[...Array(5)].map((_, i) => (
              <Heart 
                key={i} 
                className={`w-5 h-5 transition-all duration-300 ${
                  i < hearts ? 'text-red-500 fill-red-500 animate-pulse' : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

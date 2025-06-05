
import React from 'react';
import { Heart, Flame, Trophy } from 'lucide-react';

interface HeaderProps {
  hearts: number;
  streak: number;
  xp: number;
}

const Header: React.FC<HeaderProps> = ({ hearts, streak, xp }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-green-600">IrregularVerbs</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-orange-600">{streak}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold text-yellow-600">{xp} XP</span>
          </div>
          
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Heart 
                key={i} 
                className={`w-5 h-5 ${i < hearts ? 'text-red-500 fill-red-500' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import PathwayLesson from '../components/PathwayLesson';
import { useSupabaseGameState } from '../hooks/useSupabaseGameState';
import { verbs } from '../data/verbs';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { gameState, activateCheat } = useSupabaseGameState();

  const verbsPerLesson = 10;
  const totalLessons = Math.ceil(verbs.length / verbsPerLesson);
  const extraLessons = gameState.hasExtraLevels ? 20 : 0; // Add 20 extra levels when cheat is active

  const lessons = Array.from({ length: totalLessons + extraLessons }, (_, i) => {
    const lessonNumber = i + 1;
    return {
      number: lessonNumber,
      isLocked: lessonNumber > gameState.currentLesson + 1,
      isCompleted: lessonNumber < gameState.currentLesson,
      isCurrent: lessonNumber === gameState.currentLesson,
      isSpecial: lessonNumber % 5 === 0,
      position: (i % 3 === 0) ? 'center' : (i % 3 === 1) ? 'left' : 'right'
    };
  });

  const handleStartLesson = (lessonNumber: number) => {
    if (lessonNumber <= gameState.currentLesson + 1) {
      navigate(`/lesson/${lessonNumber}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-green-50 to-yellow-50">
      <Header 
        hearts={gameState.hearts} 
        streak={gameState.streak} 
        xp={gameState.xp}
        hasInfiniteHearts={gameState.hasInfiniteHearts}
        completedLevels={gameState.completedLevels}
        onCheatActivated={activateCheat}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Stats section */}
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="animate-fade-in">
                <div className="text-3xl font-bold text-green-600">{gameState.currentLesson}</div>
                <div className="text-sm text-gray-600">Huidige Les</div>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="text-3xl font-bold text-orange-600">{gameState.streak}</div>
                <div className="text-sm text-gray-600">Dag Streak</div>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl font-bold text-yellow-600">{gameState.xp}</div>
                <div className="text-sm text-gray-600">Totaal XP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pathway */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            {/* Background path */}
            <div className="absolute inset-0 flex flex-col items-center">
              <div className="w-1 h-full bg-gradient-to-b from-transparent via-green-200 to-green-300 rounded-full opacity-50" />
            </div>
            
            {/* Lessons */}
            <div className="relative space-y-16 py-8">
              {lessons.reverse().map((lesson, index) => (
                <div 
                  key={lesson.number} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PathwayLesson
                    lessonNumber={lesson.number}
                    isCompleted={lesson.isCompleted}
                    isLocked={lesson.isLocked}
                    isCurrent={lesson.isCurrent}
                    isSpecial={lesson.isSpecial}
                    position={lesson.position as 'left' | 'center' | 'right'}
                    onStart={() => handleStartLesson(lesson.number)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom encouragement */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm mx-auto">
            <div className="text-lg font-semibold text-gray-800 mb-2">
              Continue je streak! 🔥
            </div>
            <div className="text-gray-600">
              Oefen vandaag om je {gameState.streak} dagen streak te behouden
            </div>
            {gameState.hasExtraLevels && (
              <div className="mt-3 text-purple-600 font-semibold">
                ✨ Extra levels ontgrendeld!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

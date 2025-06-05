
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LessonCard from '../components/LessonCard';
import { useGameState } from '../hooks/useGameState';
import { verbs } from '../data/verbs';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { gameState } = useGameState();

  const verbsPerLesson = 10;
  const totalLessons = Math.ceil(verbs.length / verbsPerLesson);

  const lessons = Array.from({ length: totalLessons }, (_, i) => {
    const lessonNumber = i + 1;
    const startIndex = i * verbsPerLesson;
    const lessonVerbs = verbs.slice(startIndex, startIndex + verbsPerLesson);
    
    return {
      number: lessonNumber,
      title: `Les ${lessonNumber}`,
      description: `Leer ${lessonVerbs.length} onregelmatige werkwoorden`,
      isLocked: lessonNumber > gameState.currentLesson + 1,
      isCompleted: lessonNumber < gameState.currentLesson,
      verbsPreview: lessonVerbs.slice(0, 3).map(v => v.base).join(', ') + '...'
    };
  });

  const handleStartLesson = (lessonNumber: number) => {
    navigate(`/lesson/${lessonNumber}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header hearts={gameState.hearts} streak={gameState.streak} xp={gameState.xp} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Onregelmatige Werkwoorden
          </h1>
          <p className="text-gray-600 text-lg">
            Master alle {verbs.length} onregelmatige Engelse werkwoorden met interactieve oefeningen
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Jouw Voortgang</h2>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">{gameState.currentLesson}</div>
                  <div className="text-sm text-gray-600">Huidige Les</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{gameState.streak}</div>
                  <div className="text-sm text-gray-600">Dag Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{gameState.xp}</div>
                  <div className="text-sm text-gray-600">Totaal XP</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Lessen</h2>
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.number}
                lessonNumber={lesson.number}
                title={lesson.title}
                description={lesson.description}
                isLocked={lesson.isLocked}
                isCompleted={lesson.isCompleted}
                onStart={() => handleStartLesson(lesson.number)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ExerciseCard, { Exercise } from '../components/ExerciseCard';
import ProgressBar from '../components/ProgressBar';
import LessonComplete from '../components/LessonComplete';
import { useSupabaseGameState } from '../hooks/useSupabaseGameState';
import { generateLessonExercises } from '../utils/exerciseGenerator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Lesson: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { gameState, loseHeart, gainXP, incrementStreak, resetStreak, nextLesson, activateCheat } = useSupabaseGameState();
  
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isLessonComplete, setIsLessonComplete] = useState(false);

  const lessonNumber = parseInt(lessonId || '1');

  useEffect(() => {
    const newExercises = generateLessonExercises(lessonNumber, 10);
    setExercises(newExercises);
    setCurrentExerciseIndex(0);
    setScore(0);
    setIsLessonComplete(false);
    setShowResult(false);
  }, [lessonNumber]);

  const handleAnswer = (correct: boolean, answer: string) => {
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(prev => prev + 1);
      gainXP(10);
      incrementStreak();
    } else {
      loseHeart();
      resetStreak();
    }

    // Auto-advance after 2 seconds
    setTimeout(() => {
      if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
        setShowResult(false);
      } else {
        setIsLessonComplete(true);
      }
    }, 2000);
  };

  const handleContinue = () => {
    nextLesson();
    navigate(`/lesson/${lessonNumber + 1}`);
  };

  const handleRestart = () => {
    const newExercises = generateLessonExercises(lessonNumber, 10);
    setExercises(newExercises);
    setCurrentExerciseIndex(0);
    setScore(0);
    setIsLessonComplete(false);
    setShowResult(false);
  };

  if (gameState.hearts === 0 && !gameState.hasInfiniteHearts) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          hearts={gameState.hearts} 
          streak={gameState.streak} 
          xp={gameState.xp}
          hasInfiniteHearts={gameState.hasInfiniteHearts}
          completedLevels={gameState.completedLevels}
          onCheatActivated={activateCheat}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Geen levens meer!</h2>
            <p className="text-gray-600 mb-6">Je hebt al je levens opgebruikt. Wacht even of koop nieuwe levens.</p>
            <Button onClick={() => navigate('/')} className="bg-green-600 hover:bg-green-700">
              Terug naar Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isLessonComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          hearts={gameState.hearts} 
          streak={gameState.streak} 
          xp={gameState.xp}
          hasInfiniteHearts={gameState.hasInfiniteHearts}
          completedLevels={gameState.completedLevels}
          onCheatActivated={activateCheat}
        />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <LessonComplete
            score={score}
            totalQuestions={exercises.length}
            xpEarned={score * 10}
            onContinue={handleContinue}
            onRestart={handleRestart}
          />
        </div>
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          hearts={gameState.hearts} 
          streak={gameState.streak} 
          xp={gameState.xp}
          hasInfiniteHearts={gameState.hasInfiniteHearts}
          completedLevels={gameState.completedLevels}
          onCheatActivated={activateCheat}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Laden...</div>
        </div>
      </div>
    );
  }

  const currentExercise = exercises[currentExerciseIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        hearts={gameState.hearts} 
        streak={gameState.streak} 
        xp={gameState.xp}
        hasInfiniteHearts={gameState.hasInfiniteHearts}
        completedLevels={gameState.completedLevels}
        onCheatActivated={activateCheat}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Terug</span>
          </Button>
          
          <h2 className="text-xl font-semibold">Les {lessonNumber}</h2>
          
          <div className="w-20" /> {/* Spacer for centering */}
        </div>

        <ProgressBar
          current={currentExerciseIndex + 1}
          total={exercises.length}
          className="mb-8"
        />

        <div className="flex justify-center">
          <ExerciseCard
            exercise={currentExercise}
            onAnswer={handleAnswer}
            showResult={showResult}
            isCorrect={isCorrect}
          />
        </div>
      </div>
    </div>
  );
};

export default Lesson;

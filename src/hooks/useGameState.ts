
import { useState, useCallback } from 'react';

interface GameState {
  hearts: number;
  streak: number;
  xp: number;
  currentLesson: number;
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    hearts: 5,
    streak: 0,
    xp: 0,
    currentLesson: 1
  });

  const loseHeart = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1)
    }));
  }, []);

  const gainXP = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      xp: prev.xp + amount
    }));
  }, []);

  const incrementStreak = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      streak: prev.streak + 1
    }));
  }, []);

  const resetStreak = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      streak: 0
    }));
  }, []);

  const nextLesson = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentLesson: prev.currentLesson + 1
    }));
  }, []);

  const restoreHeart = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      hearts: Math.min(5, prev.hearts + 1)
    }));
  }, []);

  return {
    gameState,
    loseHeart,
    gainXP,
    incrementStreak,
    resetStreak,
    nextLesson,
    restoreHeart
  };
};

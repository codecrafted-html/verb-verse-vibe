
import { useState, useCallback } from 'react';

interface GameState {
  hearts: number;
  streak: number;
  xp: number;
  currentLesson: number;
  hasInfiniteHearts: boolean;
  completedLevels: number;
  hasExtraLevels: boolean;
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    hearts: 5,
    streak: 0,
    xp: 0,
    currentLesson: 1,
    hasInfiniteHearts: false,
    completedLevels: 0,
    hasExtraLevels: false
  });

  const loseHeart = useCallback(() => {
    if (!gameState.hasInfiniteHearts) {
      setGameState(prev => ({
        ...prev,
        hearts: Math.max(0, prev.hearts - 1)
      }));
    }
  }, [gameState.hasInfiniteHearts]);

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
      currentLesson: prev.currentLesson + 1,
      completedLevels: prev.completedLevels + 1
    }));
  }, []);

  const restoreHeart = useCallback(() => {
    if (!gameState.hasInfiniteHearts) {
      setGameState(prev => ({
        ...prev,
        hearts: Math.min(5, prev.hearts + 1)
      }));
    }
  }, [gameState.hasInfiniteHearts]);

  const activateCheat = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      hasInfiniteHearts: true,
      hasExtraLevels: true,
      hearts: 5
    }));
  }, []);

  return {
    gameState,
    loseHeart,
    gainXP,
    incrementStreak,
    resetStreak,
    nextLesson,
    restoreHeart,
    activateCheat
  };
};

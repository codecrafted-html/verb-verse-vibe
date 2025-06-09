
import { useState, useCallback, useEffect } from 'react';

interface GameState {
  hearts: number;
  streak: number;
  xp: number;
  currentLesson: number;
  hasInfiniteHearts: boolean;
  completedLevels: number;
  hasExtraLevels: boolean;
}

const STORAGE_KEY = 'irregular-verbs-game-state';

const getInitialGameState = (): GameState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.log('Failed to load saved game state:', error);
  }
  
  return {
    hearts: 5,
    streak: 0,
    xp: 0,
    currentLesson: 1,
    hasInfiniteHearts: false,
    completedLevels: 0,
    hasExtraLevels: false
  };
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(getInitialGameState);

  // Save to localStorage whenever gameState changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (error) {
      console.log('Failed to save game state:', error);
    }
  }, [gameState]);

  const loseHeart = useCallback(() => {
    setGameState(prev => {
      if (!prev.hasInfiniteHearts) {
        return {
          ...prev,
          hearts: Math.max(0, prev.hearts - 1)
        };
      }
      return prev;
    });
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
      currentLesson: prev.currentLesson + 1,
      completedLevels: prev.completedLevels + 1
    }));
  }, []);

  const restoreHeart = useCallback(() => {
    setGameState(prev => {
      if (!prev.hasInfiniteHearts) {
        return {
          ...prev,
          hearts: Math.min(5, prev.hearts + 1)
        };
      }
      return prev;
    });
  }, []);

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

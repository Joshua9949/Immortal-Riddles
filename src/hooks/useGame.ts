import { useState, useCallback } from 'react';
import { getActiveQuiz, generateNewQuiz } from '@/lib/genlayer';
import { supabase } from '@/integrations/supabase/client';

interface CurrentGod {
  name: string;
  pantheon: string;
  domain: string;
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

interface GameState {
  currentGod: CurrentGod | null;
  score: number;
  hintsRevealed: number;
  guessesRemaining: number;
  isCorrect: boolean | null;
  gameOver: boolean;
  round: number;
  isLoading: boolean;
}

const MAX_GUESSES = 3;
const MAX_ROUNDS = 5;

const checkGuess = (guess: string, answer: string): boolean =>
  guess.toLowerCase().trim() === answer.toLowerCase().trim();

const getScoreForDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): number => {
  switch (difficulty) {
    case 'easy': return 10;
    case 'medium': return 20;
    case 'hard': return 30;
    default: return 15;
  }
};

function mapEntryToCurrentGod(entry: any): CurrentGod {
  return {
    name: entry.answer,
    pantheon: entry.pantheon,
    domain: entry.known_for,
    hints: entry.hints,
    difficulty: 'medium', // adjust if you want dynamic difficulty
  };
}

export function useGame(playerAddress: string | null) {
  const [state, setState] = useState<GameState>({
    currentGod: null,
    score: 0,
    hintsRevealed: 0,
    guessesRemaining: MAX_GUESSES,
    isCorrect: null,
    gameOver: false,
    round: 0,
    isLoading: false,
  });

  const [quiz, setQuiz] = useState<any[]>([]); // full quiz array
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Start a new game → contract call
  const startGame = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    const newQuiz = await generateNewQuiz(); // one contract call
    if (newQuiz && newQuiz.quiz && newQuiz.quiz.length > 0) {
      setQuiz(newQuiz.quiz);
      setCurrentIndex(0);
      setState({
        currentGod: mapEntryToCurrentGod(newQuiz.quiz[0]),
        score: 0,
        hintsRevealed: 0,
        guessesRemaining: MAX_GUESSES,
        isCorrect: null,
        gameOver: false,
        round: 1,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Navigate to next question → no contract call
  const nextRound = useCallback(() => {
    if (currentIndex + 1 >= quiz.length || state.round >= MAX_ROUNDS) {
      setState(prev => ({ ...prev, gameOver: true }));
      return;
    }
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setState(prev => ({
      ...prev,
      currentGod: mapEntryToCurrentGod(quiz[nextIndex]),
      hintsRevealed: 0,
      guessesRemaining: MAX_GUESSES,
      isCorrect: null,
      round: prev.round + 1,
      isLoading: false,
    }));
  }, [currentIndex, quiz, state.round]);

  const revealHint = useCallback(() => {
    if (!state.currentGod) return;
    if (state.hintsRevealed >= state.currentGod.hints.length) return;
    setState(prev => ({ ...prev, hintsRevealed: prev.hintsRevealed + 1 }));
  }, [state.currentGod, state.hintsRevealed]);

  const makeGuess = useCallback((guess: string) => {
    if (!state.currentGod || state.guessesRemaining <= 0) return;

    const correct = checkGuess(guess, state.currentGod.name);

    if (correct) {
      const baseScore = getScoreForDifficulty(state.currentGod.difficulty);
      const hintPenalty = state.hintsRevealed * 5;
      const guessPenalty = (MAX_GUESSES - state.guessesRemaining) * 3;
      const earnedScore = Math.max(baseScore - hintPenalty - guessPenalty, 5);

      setState(prev => ({
        ...prev,
        isCorrect: true,
        score: prev.score + earnedScore,
      }));
    } else {
      const newGuessesRemaining = state.guessesRemaining - 1;
      if (newGuessesRemaining <= 0) {
        setState(prev => ({
          ...prev,
          isCorrect: false,
          guessesRemaining: 0,
        }));
      } else {
        setState(prev => ({
          ...prev,
          guessesRemaining: newGuessesRemaining,
        }));
      }
    }
  }, [state.currentGod, state.guessesRemaining, state.hintsRevealed]);

  const submitScore = useCallback(async (playerName?: string) => {
    if (!playerAddress || state.score === 0) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('scores').insert({
        player_address: playerAddress,
        player_name: playerName || null,
        score: state.score,
        category: 'Mythology',
      });
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error submitting score:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [playerAddress, state.score]);

  return {
    ...state,
    maxGuesses: MAX_GUESSES,
    maxRounds: MAX_ROUNDS,
    isSubmitting,
    startGame,
    nextRound,
    revealHint,
    makeGuess,
    submitScore,
  };
}
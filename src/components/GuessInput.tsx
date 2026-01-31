import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Lightbulb, ArrowRight, RotateCcw } from 'lucide-react';

interface GuessInputProps {
  onGuess: (guess: string) => void;
  onRevealHint: () => void;
  onNextRound: () => void;
  onRestart: () => void;
  guessesRemaining: number;
  hintsRemaining: number;
  isCorrect: boolean | null;
  gameOver: boolean;
  round: number;
  maxRounds: number;
}

export function GuessInput({
  onGuess,
  onRevealHint,
  onNextRound,
  onRestart,
  guessesRemaining,
  hintsRemaining,
  isCorrect,
  gameOver,
  round,
  maxRounds,
}: GuessInputProps) {
  const [guess, setGuess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.trim()) {
      onGuess(guess.trim());
      setGuess('');
    }
  };

  // Game over state
  if (gameOver) {
    return (
      <div className="game-card text-center py-8">
        <h3 className="font-display text-2xl text-foreground mb-4">
          Game Complete!
        </h3>
        <Button
          onClick={onRestart}
          className="gradient-gold text-primary-foreground font-display tracking-wide shadow-gold hover:opacity-90 transition-opacity"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Play Again
        </Button>
      </div>
    );
  }

  // Correct answer or out of guesses - show next button
  if (isCorrect !== null) {
    return (
      <div className="game-card text-center py-6">
        {isCorrect ? (
          <div className="mb-4">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="font-display text-xl text-emerald-400">
              Correct!
            </h3>
          </div>
        ) : (
          <div className="mb-4">
            <div className="text-4xl mb-2">😔</div>
            <h3 className="font-display text-xl text-destructive">
              Out of Guesses
            </h3>
          </div>
        )}

        {round < maxRounds ? (
          <Button
            onClick={onNextRound}
            className="gradient-gold text-primary-foreground font-display tracking-wide shadow-gold hover:opacity-90 transition-opacity"
          >
            Next God
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={onNextRound}
            className="gradient-gold text-primary-foreground font-display tracking-wide shadow-gold hover:opacity-90 transition-opacity"
          >
            See Final Score
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    );
  }

  // Active guessing state
  return (
    <div className="game-card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter the god's name..."
            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:ring-gold focus:border-gold"
          />
          <Button
            type="submit"
            disabled={!guess.trim()}
            className="gradient-gold text-primary-foreground shadow-gold hover:opacity-90 transition-opacity shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onRevealHint}
            disabled={hintsRemaining <= 0}
            className="border-gold/30 text-gold hover:bg-gold/10 hover:text-gold"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Reveal Hint ({hintsRemaining})
          </Button>

          <div className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">{guessesRemaining}</span>
            {' '}guesses remaining
          </div>
        </div>
      </form>
    </div>
  );
}

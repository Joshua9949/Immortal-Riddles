import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trophy, Upload, RotateCcw, Loader2, Check } from 'lucide-react';

interface GameOverProps {
  score: number;
  onSubmitScore: (name?: string) => Promise<boolean>;
  onRestart: () => void;
  isSubmitting: boolean;
  isConnected: boolean;
}

export function GameOver({ score, onSubmitScore, onRestart, isSubmitting, isConnected }: GameOverProps) {
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const success = await onSubmitScore(playerName || undefined);
    if (success) {
      setSubmitted(true);
    }
  };

  return (
    <div className="game-card text-center py-8">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-gold flex items-center justify-center shadow-gold animate-pulse-gold">
        <Trophy className="w-10 h-10 text-primary-foreground" />
      </div>

      <h2 className="font-display text-3xl mb-2">
        <span className="gold-shimmer">Game Complete!</span>
      </h2>

      <p className="text-muted-foreground mb-6">
        You finished with a score of
      </p>

      <p className="font-display text-6xl text-gold mb-8">{score}</p>

      {isConnected && !submitted && score > 0 && (
        <div className="space-y-4 mb-6">
          <Input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name (optional)"
            className="max-w-xs mx-auto bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="gradient-gold text-primary-foreground font-display tracking-wide shadow-gold hover:opacity-90 transition-opacity"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Submit Score
              </>
            )}
          </Button>
        </div>
      )}

      {submitted && (
        <div className="flex items-center justify-center gap-2 mb-6 text-emerald-400">
          <Check className="w-5 h-5" />
          <span>Score submitted to leaderboard!</span>
        </div>
      )}

      {!isConnected && score > 0 && (
        <p className="text-sm text-muted-foreground mb-6">
          Connect your wallet to submit your score to the leaderboard.
        </p>
      )}

      <Button
        onClick={onRestart}
        variant="outline"
        className="border-gold/30 text-gold hover:bg-gold/10 hover:text-gold"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Play Again
      </Button>
    </div>
  );
}

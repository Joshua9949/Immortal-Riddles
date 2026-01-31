import { Button } from '@/components/ui/button';
import { Play, Scroll, Sparkles } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
  isConnected: boolean;
}

export function StartScreen({ onStart, isConnected }: StartScreenProps) {
  return (
    <div className="game-card text-center py-12 px-8 animate-fade-in">
      {/* Animated icon */}
      <div className="relative w-24 h-24 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full gradient-gold opacity-20 animate-pulse-gold" />
        <div className="absolute inset-2 rounded-full bg-secondary flex items-center justify-center">
          <Scroll className="w-10 h-10 text-gold" />
        </div>
        <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-gold animate-float" />
      </div>

      <h2 className="font-display text-3xl mb-4">
        <span className="gold-shimmer">Test Your Divine Knowledge</span>
      </h2>

      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Journey through ancient pantheons and guess the names of legendary gods 
        from Greek, Norse, Egyptian, Hindu, Roman, and Japanese mythology.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-8 max-w-xs mx-auto text-left">
        <div className="p-3 rounded-lg bg-secondary/50">
          <p className="text-2xl mb-1">5</p>
          <p className="text-xs text-muted-foreground uppercase">Rounds</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/50">
          <p className="text-2xl mb-1">3</p>
          <p className="text-xs text-muted-foreground uppercase">Guesses Each</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/50">
          <p className="text-2xl mb-1">3</p>
          <p className="text-xs text-muted-foreground uppercase">Hints Available</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/50">
          <p className="text-2xl mb-1">6</p>
          <p className="text-xs text-muted-foreground uppercase">Pantheons</p>
        </div>
      </div>

      <Button
        onClick={onStart}
        size="lg"
        className="gradient-gold text-primary-foreground font-display tracking-wide text-lg px-8 shadow-gold hover:opacity-90 transition-opacity"
      >
        <Play className="w-5 h-5 mr-2" />
        Begin Your Quest
      </Button>

      {!isConnected && (
        <p className="text-xs text-muted-foreground mt-4">
          Connect your wallet to save your score to the leaderboard
        </p>
      )}
    </div>
  );
}

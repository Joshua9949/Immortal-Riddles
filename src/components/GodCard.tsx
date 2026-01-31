import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, HelpCircle } from 'lucide-react';
import { LightningSpinner } from './LightningSpinner';

interface CurrentGod {
  name: string;
  pantheon: string;
  domain: string;
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

interface GodCardProps {
  god: CurrentGod;
  hintsRevealed: number;
  showAnswer: boolean;
  isLoading?: boolean;
}

// Pantheon colors
const getPantheonColor = (pantheon: string): string => {
  const colors: Record<string, string> = {
    Greek: 'from-blue-500 to-cyan-400',
    Norse: 'from-slate-500 to-blue-400',
    Egyptian: 'from-amber-500 to-yellow-400',
    Hindu: 'from-orange-500 to-red-400',
    Roman: 'from-red-600 to-orange-400',
    Japanese: 'from-pink-500 to-rose-400',
    Celtic: 'from-emerald-500 to-green-400',
    Aztec: 'from-teal-500 to-cyan-400',
  };
  return colors[pantheon] || 'from-purple-500 to-pink-400';
};

// Pantheon icons
const getPantheonIcon = (pantheon: string): string => {
  const icons: Record<string, string> = {
    Greek: '⚡',
    Norse: '🪓',
    Egyptian: '☥',
    Hindu: '🕉️',
    Roman: '🦅',
    Japanese: '⛩️',
    Celtic: '☘️',
    Aztec: '🌞',
  };
  return icons[pantheon] || '✨';
};

export function GodCard({ god, hintsRevealed, showAnswer, isLoading }: GodCardProps) {
  const gradientClass = getPantheonColor(god.pantheon);
  const icon = getPantheonIcon(god.pantheon);

  if (isLoading) {
    return (
      <div className="game-card relative flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <LightningSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-muted-foreground animate-pulse">Consulting the Oracle...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="game-card relative animate-scale-in">
      {/* Pantheon badge */}
      <div className="absolute top-4 right-4">
        <Badge 
          variant="secondary" 
          className={`bg-gradient-to-r ${gradientClass} text-primary-foreground font-medium px-3 py-1`}
        >
          <span className="mr-1.5">{icon}</span>
          {god.pantheon}
        </Badge>
      </div>

      {/* Difficulty indicator */}
      <div className="absolute top-4 left-4">
        <Badge 
          variant="outline" 
          className={`
            border-gold/30 
            ${god.difficulty === 'easy' ? 'text-emerald-400' : ''}
            ${god.difficulty === 'medium' ? 'text-amber-400' : ''}
            ${god.difficulty === 'hard' ? 'text-red-400' : ''}
          `}
        >
          {god.difficulty.toUpperCase()}
        </Badge>
      </div>

      {/* Main content */}
      <div className="pt-12 pb-4 text-center">
        {/* Mystery icon */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center animate-float">
          <HelpCircle className="w-12 h-12 text-gold" />
        </div>

        {/* Domain clue */}
        <p className="text-muted-foreground text-sm mb-2 font-medium tracking-wide uppercase">
          Domain
        </p>
        <h2 className="font-display text-2xl text-foreground mb-6">
          {god.domain}
        </h2>

        {/* Hints section */}
        <div className="space-y-3 mt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            Hints Revealed
          </p>
          {god.hints.map((hint, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`
                p-3 rounded-lg border transition-all duration-300 animate-fade-in
                ${index < hintsRevealed 
                  ? 'border-gold/30 bg-gold/5 text-foreground' 
                  : 'border-border bg-muted/30 text-muted-foreground'
                }
              `}
            >
              <div className="flex items-center gap-2">
                {index < hintsRevealed ? (
                  <Eye className="w-4 h-4 text-gold shrink-0" />
                ) : (
                  <EyeOff className="w-4 h-4 shrink-0" />
                )}
                <span className="text-sm">
                  {index < hintsRevealed ? hint : '???'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Answer reveal */}
        {showAnswer && (
          <div className="mt-6 pt-6 border-t border-border animate-scale-in">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              The Answer Was
            </p>
            <h3 className="font-display text-3xl gold-shimmer">
              {god.name}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

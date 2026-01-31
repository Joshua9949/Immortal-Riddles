import { Trophy, Target, Zap } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  round: number;
  maxRounds: number;
}

export function ScoreBoard({ score, round, maxRounds }: ScoreBoardProps) {
  return (
    <div className="game-card">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <div className="w-10 h-10 mx-auto rounded-full bg-gold/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-gold" />
          </div>
          <p className="text-2xl font-display text-foreground">{score}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Score</p>
        </div>

        <div className="space-y-1">
          <div className="w-10 h-10 mx-auto rounded-full bg-gold/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-gold" />
          </div>
          <p className="text-2xl font-display text-foreground">{round}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Round</p>
        </div>

        <div className="space-y-1">
          <div className="w-10 h-10 mx-auto rounded-full bg-gold/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-gold" />
          </div>
          <p className="text-2xl font-display text-foreground">{maxRounds - round}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Left</p>
        </div>
      </div>
    </div>
  );
}

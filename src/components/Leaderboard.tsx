import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Score {
  id: string;
  player_address: string;
  player_name: string | null;
  score: number;
  created_at: string;
}

export function Leaderboard() {
  const { data: scores, isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scores')
        .select('*')
        .eq('category', 'Mythology')
        .order('score', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data as Score[];
    },
  });

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-5 h-5 text-amber-400" />;
      case 1:
        return <Medal className="w-5 h-5 text-slate-300" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 text-center text-muted-foreground">{index + 1}</span>;
    }
  };

  return (
    <div className="game-card animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-gold" />
        <h3 className="font-display text-lg text-foreground">Leaderboard</h3>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 bg-secondary" />
          ))}
        </div>
      ) : scores && scores.length > 0 ? (
        <div className="space-y-2">
          {scores.map((score, index) => (
            <div
              key={score.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`
                flex items-center justify-between p-3 rounded-lg animate-fade-in
                ${index === 0 ? 'bg-gold/10 border border-gold/20' : 'bg-secondary/50'}
              `}
            >
              <div className="flex items-center gap-3">
                {getRankIcon(index)}
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {score.player_name || shortenAddress(score.player_address)}
                  </p>
                  {score.player_name && (
                    <p className="text-xs text-muted-foreground">
                      {shortenAddress(score.player_address)}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="font-display text-lg text-gold">{score.score}</p>
                <p className="text-xs text-muted-foreground">pts</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No scores yet. Be the first!</p>
        </div>
      )}
    </div>
  );
}

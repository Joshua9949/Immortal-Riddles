import { WalletButton } from '@/components/WalletButton';
import { StartScreen } from '@/components/StartScreen';
import { GodCard } from '@/components/GodCard';
import { GuessInput } from '@/components/GuessInput';
import { ScoreBoard } from '@/components/ScoreBoard';
import { Leaderboard } from '@/components/Leaderboard';
import { GameOver } from '@/components/GameOver';
import { useWallet } from '@/hooks/useWallet';
import { useGame } from '@/hooks/useGame';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const wallet = useWallet();
  const game = useGame(wallet.address);

  const hasStarted = game.round > 0;
  const isGameOver = game.gameOver;

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center shadow-gold">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl tracking-wide">
              <span className="gold-shimmer">Divine Oracle</span>
            </h1>
            <p className="text-xs text-muted-foreground">Mythology Guessing Game</p>
          </div>
        </div>
        <WalletButton />
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Game Area - Left 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {!hasStarted && !isGameOver && (
              <StartScreen 
                onStart={game.startGame} 
                isConnected={wallet.isConnected} 
              />
            )}

            {hasStarted && !isGameOver && game.currentGod && (
              <>
                <ScoreBoard 
                  score={game.score}
                  round={game.round}
                  maxRounds={game.maxRounds}
                />
                <GodCard 
                  god={game.currentGod}
                  hintsRevealed={game.hintsRevealed}
                  showAnswer={game.isCorrect === false || game.guessesRemaining === 0}
                  isLoading={game.isLoading}
                />
                <GuessInput 
                  onGuess={game.makeGuess}
                  onRevealHint={game.revealHint}
                  onNextRound={game.nextRound}
                  onRestart={game.startGame}
                  guessesRemaining={game.guessesRemaining}
                  hintsRemaining={game.currentGod.hints.length - game.hintsRevealed}
                  isCorrect={game.isCorrect}
                  gameOver={game.gameOver}
                  round={game.round}
                  maxRounds={game.maxRounds}
                />
              </>
            )}

            {isGameOver && (
              <GameOver 
                score={game.score}
                onSubmitScore={game.submitScore}
                onRestart={game.startGame}
                isSubmitting={game.isSubmitting}
                isConnected={wallet.isConnected}
              />
            )}
          </div>

          {/* Sidebar - Leaderboard */}
          <div className="lg:col-span-1">
            <Leaderboard />
          </div>
        </div>
      </main>

      {/* Footer with contract info */}
      <footer className="max-w-6xl mx-auto mt-12 pt-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          Powered by{' '}
          <a 
            href="https://docs.genlayer.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            GenLayer
          </a>
          {' '}• Contract:{' '}
          <span className="font-mono text-foreground/60">
            {wallet.contractAddress.slice(0, 10)}...{wallet.contractAddress.slice(-8)}
          </span>
        </p>
      </footer>
    </div>
  );
};

export default Index;

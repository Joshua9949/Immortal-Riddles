import { Wallet, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/useWallet';

export function WalletButton() {
  const { address, isConnecting, isConnected, error, connect, disconnect, shortenAddress } = useWallet();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="game-card px-4 py-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-medium text-foreground">
            {shortenAddress(address)}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={disconnect}
          className="text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <Button
        onClick={connect}
        disabled={isConnecting}
        className="gradient-gold text-primary-foreground font-display tracking-wide shadow-gold hover:opacity-90 transition-opacity"
      >
        {isConnecting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </>
        )}
      </Button>
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}

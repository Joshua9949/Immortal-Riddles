import { cn } from '@/lib/utils';

interface LightningSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LightningSpinner({ size = 'md', className }: LightningSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full bg-gold/20 animate-ping" />
      
      {/* Lightning bolt container */}
      <div className="relative w-full h-full flex items-center justify-center animate-lightning-pulse">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-3/4 h-3/4 text-gold drop-shadow-[0_0_8px_hsl(var(--gold))]"
        >
          <path
            d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
            fill="currentColor"
            className="animate-lightning-flicker"
          />
        </svg>
      </div>
      
      {/* Spark particles */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 w-1 h-1 bg-gold-light rounded-full animate-spark-1" />
        <div className="absolute top-1/4 right-0 w-0.5 h-0.5 bg-gold rounded-full animate-spark-2" />
        <div className="absolute bottom-1/4 left-0 w-0.5 h-0.5 bg-gold rounded-full animate-spark-3" />
      </div>
    </div>
  );
}

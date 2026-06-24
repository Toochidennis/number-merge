import type { ReactNode } from 'react';

export function GameShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <main className={`game-shell ${className}`}>{children}</main>;
}

import * as React from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

interface RestartButtonProps {
  onRestart: () => void;
}

export function RestartButton({ onRestart }: RestartButtonProps) {
  return (
    <Button
      variant="default"
      size="icon"
      className="h-8 w-8"
      onClick={onRestart}
    >
      <RotateCcw className="h-4 w-4" />
      <span className="sr-only">Restart preview</span>
    </Button>
  );
}

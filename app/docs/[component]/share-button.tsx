'use client';

import { Share } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/delta/components/button';

interface ShareButtonProps {
  component: string;
}

export function ShareButton({ component }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${component} | Delta Components`,
          text: `Check out the ${component} component from Delta Components`,
          url: window.location.href,
        });
      } catch (error) {
        // Ignore AbortError as it's expected when user cancels the share dialog
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    }
  };

  return (
    <Button
      onClick={handleShare}
      title="Share"
      variant="primary"
      icon={<Share weight="bold" className="h-4 w-4" />}
    />
  );
}

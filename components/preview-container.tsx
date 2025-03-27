'use client';

import * as React from 'react';
import { OpenInV0Button } from './open-in-v0-button';
import { RestartButton } from './restart-button';

interface PreviewContainerProps {
  children: React.ReactNode;
  openInV0Url: string;
}

export function PreviewContainer({
  children,
  openInV0Url,
}: PreviewContainerProps) {
  const [key, setKey] = React.useState(0);

  const handleRestart = React.useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  return (
    <div className="preview-container h-full relative px-2 sm:px-10">
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <OpenInV0Button url={openInV0Url} />
        <RestartButton onRestart={handleRestart} />
      </div>

      <div className="h-full flex items-center justify-center py-8">
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center h-[320px]">
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          }
        >
          <div className="h-full w-full flex items-center justify-center py-8">
            <div
              key={key}
              className="flex items-center justify-center w-full h-full max-w-full overflow-auto"
            >
              {children}
            </div>
          </div>
        </React.Suspense>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  src: string;
  title?: string;
  className?: string;
  storageKey?: string;
  autoPlayOnReturn?: boolean;
  useDynamicPoster?: boolean;
}

export function VideoPlayer({
  src,
  title,
  className,
  storageKey = 'video-player-state',
  autoPlayOnReturn = true,
  useDynamicPoster = true,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [titleOpacity, setTitleOpacity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [posterImage, setPosterImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayTitle, setDisplayTitle] = useState<string | undefined>(title);

  // Extract filename from path if no title is provided
  useEffect(() => {
    if (!title && src) {
      // Extract the last part of the path (filename)
      const parts = src.split('/');
      const filename = parts[parts.length - 1];
      // Remove any query parameters if present
      const cleanFilename = filename.split('?')[0];
      setDisplayTitle(cleanFilename);
    } else {
      setDisplayTitle(title);
    }
  }, [title, src]);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle title opacity based on playback time
  useEffect(() => {
    if (currentTime > 3) {
      setTitleOpacity(0);
    } else {
      setTitleOpacity(1);
    }
  }, [currentTime]);

  // Load saved state on mount
  useEffect(() => {
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      try {
        const { time, volume, muted, paused, savedDuration } =
          JSON.parse(savedState);

        // If we have a saved duration, use it until the real one loads
        if (savedDuration && savedDuration > 0) {
          setDuration(savedDuration);
        }

        const loadVideo = () => {
          if (videoRef.current) {
            videoRef.current.currentTime = time || 0;
            videoRef.current.volume = volume || 1;
            videoRef.current.muted = muted || false;
            setCurrentTime(time || 0);
            setVolume(volume || 1);
            setIsMuted(muted || false);

            // If autoPlayOnReturn is true or it wasn't paused before, play it automatically
            if ((autoPlayOnReturn || !paused) && videoRef.current.paused) {
              videoRef.current.play().catch(() => {
                // Auto-play might be blocked by browser
                setIsPlaying(false);
              });
            }
          }
        };

        if (videoRef.current) {
          // If video is already loaded enough to seek
          if (videoRef.current.readyState >= 2) {
            loadVideo();
            setIsLoading(false);
          } else {
            // Wait for video to be loaded enough to seek
            const handleCanSeek = () => {
              loadVideo();
              setIsLoading(false);
              videoRef.current?.removeEventListener(
                'loadedmetadata',
                handleCanSeek,
              );
            };
            videoRef.current.addEventListener('loadedmetadata', handleCanSeek);
          }
        }
      } catch (error) {
        console.error('Error parsing saved video state:', error);
        localStorage.removeItem(storageKey);
      }
    }
  }, [storageKey, autoPlayOnReturn]);

  // Handle autoPlayOnReturn when page becomes visible
  useEffect(() => {
    // Handle visibility change (e.g. tab switching)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Update poster if needed
        const savedPoster = localStorage.getItem(`${storageKey}-poster`);
        if (savedPoster && !posterImage) {
          setPosterImage(savedPoster);
        }

        // Try to play when returning to the page if autoPlayOnReturn is true
        if (autoPlayOnReturn && videoRef.current) {
          videoRef.current.play().catch((error) => {
            console.error('Error auto-playing video on return:', error);
          });
        }
      } else if (document.visibilityState === 'hidden') {
        // Capture a frame when user leaves the page
        const frameSrc = captureVideoFrame();
        if (frameSrc) {
          setPosterImage(frameSrc);
          try {
            localStorage.setItem(`${storageKey}-poster`, frameSrc);
          } catch (e) {
            console.error('Failed to save poster on visibility change:', e);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [autoPlayOnReturn, storageKey, posterImage]);

  // Save state on changes with debounce for better performance
  useEffect(() => {
    let saveTimeout: NodeJS.Timeout | null = null;

    const saveState = () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }

      saveTimeout = setTimeout(() => {
        const state = {
          time: currentTime,
          volume,
          muted: isMuted,
          paused: !isPlaying,
          savedDuration: duration,
        };
        localStorage.setItem(storageKey, JSON.stringify(state));
      }, 500); // Debounce for 500ms
    };

    // Save state during playback with reduced frequency
    const interval = setInterval(() => {
      if (isPlaying) {
        saveState();

        // Also capture a frame periodically during playback
        // But less frequently than state saves to reduce performance impact
        if (currentTime % 15 < 5) {
          // Approximately every 15 seconds
          const frameSrc = captureVideoFrame();
          if (frameSrc) {
            setPosterImage(frameSrc);
            try {
              localStorage.setItem(`${storageKey}-poster`, frameSrc);
            } catch (e) {
              // Handle storage quota exceeded
              console.warn('Failed to save poster during playback:', e);
            }
          }
        }
      }
    }, 5000); // Save every 5 seconds during playback for better performance

    // Save state on pause/play/volume changes
    saveState();

    return () => {
      if (saveTimeout) clearTimeout(saveTimeout);
      clearInterval(interval);
    };
  }, [currentTime, volume, isMuted, isPlaying, duration, storageKey]);

  // Capture and save the current frame as poster image
  const captureVideoFrame = () => {
    if (!videoRef.current || !canvasRef.current || !useDynamicPoster)
      return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Only capture if video has actual frames available
    if (
      !context ||
      video.readyState < 2 ||
      !video.videoWidth ||
      !video.videoHeight
    )
      return null;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame to canvas
    try {
      // Fix for SecurityError by checking video source
      // This occurs when video is loaded from a different origin without CORS headers
      if (video.crossOrigin !== 'anonymous') {
        // Skip frame capture for cross-origin videos without proper CORS
        if (
          video.src.startsWith('http') &&
          !video.src.startsWith(window.location.origin)
        ) {
          return null;
        }
      }

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to data URL (with quality parameter for JPG)
      try {
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        return dataUrl;
      } catch (e) {
        // If we got a security error, it's likely due to CORS issues
        console.error('Failed to export canvas to data URL:', e);
        return null;
      }
    } catch (e) {
      console.error('Failed to capture video frame:', e);
      return null;
    }
  };

  // Save poster image periodically when playing
  useEffect(() => {
    if (!isPlaying) return;

    // Save frame every 10 seconds while playing
    const interval = setInterval(() => {
      const frameSrc = captureVideoFrame();
      if (frameSrc) {
        setPosterImage(frameSrc);
        try {
          localStorage.setItem(`${storageKey}-poster`, frameSrc);
        } catch (e) {
          // If localStorage quota is exceeded, remove the item and try again with a lower quality
          localStorage.removeItem(`${storageKey}-poster`);
          const canvas = canvasRef.current;
          if (canvas) {
            try {
              const lowQualityDataUrl = canvas.toDataURL('image/jpeg', 0.5);
              localStorage.setItem(`${storageKey}-poster`, lowQualityDataUrl);
            } catch (e) {
              console.error(
                'Failed to save poster even with lower quality:',
                e,
              );
            }
          }
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isPlaying, storageKey]);

  // Load poster image on mount
  useEffect(() => {
    const savedPoster = localStorage.getItem(`${storageKey}-poster`);
    if (savedPoster) {
      setPosterImage(savedPoster);
    }
  }, [storageKey]);

  // Save state before unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Capture current frame before unloading
      const frameSrc = captureVideoFrame();

      const state = {
        time: videoRef.current?.currentTime || 0,
        volume: videoRef.current?.volume || 1,
        muted: videoRef.current?.muted || false,
        paused: videoRef.current?.paused || true,
        savedDuration: videoRef.current?.duration || duration,
      };

      localStorage.setItem(storageKey, JSON.stringify(state));

      // Save the poster frame if available
      if (frameSrc) {
        try {
          localStorage.setItem(`${storageKey}-poster`, frameSrc);
        } catch (e) {
          console.error('Failed to save poster on unload:', e);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [storageKey, duration]);

  // Handle mobile view optimization
  useEffect(() => {
    const handleResize = () => {
      if (videoRef.current) {
        if (window.innerWidth < 768) {
          // Center the video for mobile view
          videoRef.current.style.objectPosition = 'center';
          videoRef.current.style.objectFit = 'cover';
        } else {
          // Reset for desktop
          videoRef.current.style.objectPosition = '';
          videoRef.current.style.objectFit = '';
        }
      }
    };

    handleResize(); // Call once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('volumechange', handleVolumeChange);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('volumechange', handleVolumeChange);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full overflow-hidden bg-black aspect-video dark:bg-black',
        className,
      )}
    >
      {displayTitle && (
        <div
          style={{
            opacity: titleOpacity,
            transition: 'opacity 1.5s ease-in-out',
          }}
          className={cn(
            'absolute z-10 p-4 text-lg text-white',
            isMobile ? 'left-8 top-0' : 'left-0 top-0', // Position more to the right on mobile
          )}
        >
          <div className="line-clamp-1">{displayTitle}</div>
        </div>
      )}

      {/* Hidden canvas for capturing frames */}
      <canvas ref={canvasRef} className="hidden" />

      <video
        ref={videoRef}
        className="w-full h-full"
        src={src}
        poster={posterImage || undefined}
        controls // Added native controls here
        playsInline
        preload="metadata"
        crossOrigin="anonymous" // Add crossOrigin to help with canvas security
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
          }
        }}
      />
    </div>
  );
}

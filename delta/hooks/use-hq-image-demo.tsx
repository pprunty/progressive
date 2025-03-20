'use client';

import { useHqImage } from '@/delta/hooks/use-hq-image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Grid, ImageIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function UseHQImageDemo() {
  // Single image state
  const { image, refreshImage, getRandomImages } = useHqImage();
  const [loading, setLoading] = useState(true);

  // Grid state
  const [gridSize, setGridSize] = useState(6);
  const [gridImages, setGridImages] = useState(getRandomImages(gridSize));
  const [gridLoading, setGridLoading] = useState<boolean[]>(
    Array(gridSize).fill(true),
  );

  // Refresh grid images
  const refreshGridImages = () => {
    setGridLoading(Array(gridSize).fill(true));
    setGridImages(getRandomImages(gridSize));
  };

  // Handle grid image load or error
  const handleGridImageLoad = (index: number) => {
    setGridLoading((prev) => {
      const newLoading = [...prev];
      newLoading[index] = false;
      return newLoading;
    });
  };

  // Add timeout to prevent infinite loading states
  useEffect(() => {
    // Set a timeout to clear any hanging loading states after 10 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
      setGridLoading((prev) => prev.map(() => false));
    }, 10000);

    return () => clearTimeout(timeout);
  }, [image, gridImages]);

  // Update grid images when grid size changes
  useEffect(() => {
    setGridLoading(Array(gridSize).fill(true));
    setGridImages(getRandomImages(gridSize));
  }, [gridSize, getRandomImages]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Random High-Quality Images
      </h1>
      <Tabs defaultValue="single" className="w-full">
        <div className="flex flex-col items-center space-y-2 mb-8">
          <TabsList>
            <TabsTrigger value="single" className="flex items-center gap-1">
              <ImageIcon className="h-4 w-4" />
              Single Image
            </TabsTrigger>
            <TabsTrigger value="grid" className="flex items-center gap-1">
              <Grid className="h-4 w-4" />
              Image Grid
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Single Image View */}
        <TabsContent value="single" className="w-full">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
              {loading && (
                <div className="absolute inset-0 animate-pulse bg-muted/80"></div>
              )}
              <img
                src={image.url || '/placeholder.svg'}
                alt={'Random HQ Photo'}
                className={`w-full h-full object-cover ${loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)} // Add error handling
              />
            </div>

            <Button
              onClick={() => {
                setLoading(true);
                refreshImage();
              }}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Image
            </Button>
          </div>
        </TabsContent>

        {/* Grid View */}
        <TabsContent value="grid" className="w-full">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {[2, 4, 6, 9].map((size) => (
                <Button
                  key={size}
                  variant={gridSize === size ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setGridSize(size)}
                >
                  {size} images
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {gridImages.map((img, index) => (
                <div
                  key={`${img.url}-${index}`}
                  className="relative aspect-video rounded-lg overflow-hidden border border-border"
                >
                  {gridLoading[index] && (
                    <div className="absolute inset-0 animate-pulse bg-muted/80"></div>
                  )}
                  <img
                    src={img.url || '/placeholder.svg'}
                    alt={`Random photo ${index + 1}`}
                    className={`w-full h-full object-cover ${gridLoading[index] ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
                    onLoad={() => handleGridImageLoad(index)}
                    onError={() => handleGridImageLoad(index)} // Add error handling
                  />
                </div>
              ))}
            </div>

            <Button
              onClick={refreshGridImages}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh All Images
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

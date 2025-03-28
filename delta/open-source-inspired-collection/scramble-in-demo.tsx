'use client';

import { useRef, useEffect } from 'react';
import ScrambleIn from './scramble-in'; // Update this path as needed

export default function ScrambleInDemo() {
  return (
    <div className="space-y-16 py-4 max-w-3xl mx-auto">
      <BasicScrambleDemo />
      <SpeedVariationsDemo />
      <CustomCharactersDemo />
      <RetriggerOnIntersectionDemo />
      <AlbumTracksIntersectionDemo />
      <AlbumTracksRetriggerDemo />
    </div>
  );
}

export function BasicScrambleDemo() {
  return (
    <section className="p-8 border border-border rounded-lg shadow-sm bg-background text-card-foreground">
      <h2 className="text-2xl font-bold mb-6">Basic ScrambleIn</h2>
      <div className="text-md">
        <ScrambleIn
          text="This text will scramble in when it comes into view!"
          autoStart={false}
          useIntersectionObserver={true}
          className="font-medium"
        />
      </div>
    </section>
  );
}

export function SpeedVariationsDemo() {
  return (
    <section className="p-8 border border-border rounded-lg shadow-sm bg-background text-card-foreground">
      <h2 className="text-2xl font-bold mb-6">Speed Variations</h2>
      <div className="space-y-6">
        <div className="text-md">
          <ScrambleIn
            text="Fast scramble effect (25ms)"
            scrambleSpeed={25}
            autoStart={false}
            useIntersectionObserver={true}
            className="font-medium"
            scrambledClassName="text-primary"
          />
        </div>
        <div className="text-md">
          <ScrambleIn
            text="Slow scramble effect (100ms)"
            scrambleSpeed={100}
            autoStart={false}
            useIntersectionObserver={true}
            className="font-medium"
            scrambledClassName="text-primary"
          />
        </div>
      </div>
    </section>
  );
}

export function CustomCharactersDemo() {
  return (
    <section className="p-8 border border-border rounded-lg shadow-sm bg-background text-card-foreground">
      <h2 className="text-2xl font-bold mb-6">Custom Characters</h2>
      <div className="space-y-6">
        <div className="text-md">
          <ScrambleIn
            text="Using numbers for scrambling"
            scrambleSpeed={50}
            characters="0123456789"
            autoStart={false}
            useIntersectionObserver={true}
            className="font-medium"
            scrambledClassName="text-primary font-mono"
          />
        </div>
        <div className="text-md">
          <ScrambleIn
            text="Using symbols for scrambling"
            scrambleSpeed={40}
            scrambledLetterCount={4}
            characters="!@#$%^&*()_+-=[]{}|;:,.<>/?"
            autoStart={false}
            useIntersectionObserver={true}
            className="font-medium"
            scrambledClassName="text-primary font-mono"
          />
        </div>
      </div>
    </section>
  );
}

export function RetriggerOnIntersectionDemo() {
  return (
    <section className="p-8 border border-border rounded-lg shadow-sm bg-background text-card-foreground">
      <h2 className="text-2xl font-bold mb-6">Retrigger on Intersection</h2>
      <p className="mb-4 text-muted-foreground">
        This text will re-scramble each time you scroll back to it.
      </p>
      <div className="space-y-6">
        <div className="text-md">
          <ScrambleIn
            text="I will scramble again each time you see me!"
            scrambleSpeed={30}
            autoStart={false}
            useIntersectionObserver={true}
            retriggerOnIntersection={true}
            className="font-medium"
            scrambledClassName="text-accent-foreground"
          />
        </div>
        <div className="text-md mt-8">
          <ScrambleIn
            text="Me too! Watch me scramble again when you come back."
            scrambleSpeed={40}
            scrambledLetterCount={4}
            autoStart={false}
            useIntersectionObserver={true}
            retriggerOnIntersection={true}
            className="font-medium"
            scrambledClassName="text-accent-foreground"
          />
        </div>
      </div>
    </section>
  );
}

export function AlbumTracksIntersectionDemo() {
  // Album tracks data
  const titles = [
    '1. One More Time (featuring Romanthony) - 5:20',
    '2. Aerodynamic - 3:27',
    '3. Digital Love - 4:58',
    '4. Harder, Better, Faster, Stronger - 3:45',
    '5. Crescendolls - 3:31',
    '6. Nightvision - 1:44',
    '7. Superheroes - 3:57',
    '8. High Life - 3:22',
    '9. Something About Us - 3:51',
    '10. Voyager - 3:47',
    '11. Veridis Quo - 5:44',
    '12. Short Circuit - 3:26',
    '13. Face to Face (featuring Todd Edwards) - 3:58',
    '14. Too Long (featuring Romanthony) - 10:00',
  ];

  // Initialize album tracks refs array
  const scrambleTracksRefs = useRef([]);

  // Initialize album tracks refs array
  useEffect(() => {
    scrambleTracksRefs.current = scrambleTracksRefs.current.slice(
      0,
      titles.length,
    );
  }, [titles.length]);

  return (
    <section className="p-8 border border-border rounded-lg shadow-sm bg-background text-card-foreground">
      <h2 className="text-2xl font-bold mb-6">
        Album Tracks with Intersection Observer
      </h2>
      <p className="mb-4 text-muted-foreground">
        Each track uses built-in intersection observer with cascading timing:
      </p>
      <div className="space-y-3 text-left">
        {titles.map((track, index) => (
          <div key={index}>
            <ScrambleIn
              text={track}
              scrambleSpeed={25 + index * 2}
              scrambledLetterCount={5}
              autoStart={false}
              useIntersectionObserver={true}
              intersectionThreshold={0.1}
              className="font-medium"
              scrambledClassName="text-chart-1"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export function AlbumTracksRetriggerDemo() {
  // Album tracks data
  const titles = [
    '1. One More Time (featuring Romanthony) - 5:20',
    '2. Aerodynamic - 3:27',
    '3. Digital Love - 4:58',
    '4. Harder, Better, Faster, Stronger - 3:45',
    '5. Crescendolls - 3:31',
  ];

  return (
    <section className="p-8 border border-border rounded-lg shadow-sm bg-background text-card-foreground">
      <h2 className="text-2xl font-bold mb-6">Album Tracks with Retrigger</h2>
      <p className="mb-4 text-muted-foreground">
        These tracks will re-animate each time you scroll to them:
      </p>
      <div className="space-y-3 text-left font-mono">
        {titles.map((track, index) => (
          <div key={index}>
            <ScrambleIn
              text={track}
              scrambleSpeed={25}
              scrambledLetterCount={5}
              autoStart={false}
              useIntersectionObserver={true}
              retriggerOnIntersection={true}
              className="font-medium"
              scrambledClassName="text-chart-2"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

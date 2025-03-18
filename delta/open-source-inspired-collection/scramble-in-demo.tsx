"use client";

import React, { useRef, useEffect } from 'react';
import ScrambleIn from './scramble-in'; // Update this path as needed

const ScrambleInDemo = () => {
  // Album tracks data
  const titles = [
    "1. One More Time (featuring Romanthony) - 5:20",
    "2. Aerodynamic - 3:27",
    "3. Digital Love - 4:58",
    "4. Harder, Better, Faster, Stronger - 3:45",
    "5. Crescendolls - 3:31",
    "6. Nightvision - 1:44",
    "7. Superheroes - 3:57",
    "8. High Life - 3:22",
    "9. Something About Us - 3:51",
    "10. Voyager - 3:47",
    "11. Veridis Quo - 5:44",
    "12. Short Circuit - 3:26",
    "13. Face to Face (featuring Todd Edwards) - 3:58",
    "14. Too Long (featuring Romanthony) - 10:00",
  ];

  // Initialize album tracks refs array
  const scrambleTracksRefs = useRef([]);

  // Initialize album tracks refs array
  useEffect(() => {
    scrambleTracksRefs.current = scrambleTracksRefs.current.slice(0, titles.length);
  }, [titles.length]);

  return (
    <div className="space-y-16 py-4 max-w-3xl mx-auto">
      {/* First Section - Basic Example */}
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

      {/* Second Section - Different Speeds */}
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

      {/* Third Section - Custom Characters */}
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

      {/* Fourth Section - Retrigger on Intersection */}
      <section className="p-8 border border-border rounded-lg shadow-sm bg-background text-card-foreground">
        <h2 className="text-2xl font-bold mb-6">Retrigger on Intersection</h2>
        <p className="mb-4 text-muted-foreground">This text will re-scramble each time you scroll back to it.</p>
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

      {/* Fifth Section - Album Tracks with Intersection Observer */}
      <section className="p-8 border border-border rounded-lg shadow-sm bg-background text-card-foreground">
        <h2 className="text-2xl font-bold mb-6">Album Tracks with Intersection Observer</h2>
        <p className="mb-4 text-muted-foreground">Each track uses built-in intersection observer with cascading timing:</p>
        <div className="space-y-3 text-left">
          {titles.map((track, index) => (
            <div key={index}>
              <ScrambleIn
                text={track}
                scrambleSpeed={25 + (index * 2)}
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

      {/* Sixth Section - Album Tracks with Retrigger */}
      <section className="p-8 border border-border rounded-lg shadow-sm bg-background text-card-foreground">
        <h2 className="text-2xl font-bold mb-6">Album Tracks with Retrigger</h2>
        <p className="mb-4 text-muted-foreground">These tracks will re-animate each time you scroll to them:</p>
        <div className="space-y-3 text-left font-mono">
          {titles.slice(0, 5).map((track, index) => (
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

      {/* Instructions for testing */}
      <section className="p-8 border border-border rounded-lg shadow-sm bg-background text-card-foreground">
        <h2 className="text-2xl font-bold mb-4">How to Test</h2>
        <p>Scroll up and down to see the different behaviors:</p>
        <ul className="text-left list-disc list-inside mt-4 text-muted-foreground">
          <li>Regular sections only animate once when they enter the viewport</li>
          <li>The "Retrigger on Intersection" section animates every time you scroll to it</li>
          <li>Try scrolling fast past sections then back to see the intersection behaviors</li>
        </ul>
      </section>
    </div>
  );
};

export default ScrambleInDemo;
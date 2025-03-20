'use client';

import FullBleedSection from './full-bleed-section';
import { Card } from '@/components/ui/card';

export default function FullBleedSectionDemo() {
  return (
    <div className="min-h-screen">
      {/* Main content container with constrained width */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mt-8 mb-4">
          <h2 className="text-xl font-bold mb-4">How It Works</h2>
          <p>
            The FullBleedSection component uses CSS techniques to allow content
            to break out of constrained containers set usually in the root
            layout.tsx. It sets width to 100vw and uses transform to center it,
            creating the full-bleed effect while maintaining content alignment
            with the rest of the page.
          </p>
        </div>
        {/* Example 1: Basic usage with primary color */}
        <FullBleedSection backgroundColor="bg-primary text-primary-foreground">
          <div className="max-w-2xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-4">
              Example 1: Primary Background
            </h2>
            <p>
              This section visually breaks out of the max-w-2xl container,
              extending to the full width of the viewport. However, the content
              itself remains aligned with the rest of the page content thanks to
              the inner max-w-2xl container.
            </p>
          </div>
        </FullBleedSection>

        <div className="my-8 border-l-4 border-muted-foreground pl-4 italic">
          <p>
            Notice how this text returns to the constrained width. The
            FullBleedSection above and below "escape" this container, creating
            visual interest while maintaining content alignment.
          </p>
        </div>

        {/* Example 2: With cards and secondary background */}
        <FullBleedSection
          backgroundColor="bg-secondary text-secondary-foreground"
          padding="p-8"
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Example 2: With Cards</h2>
            <p className="mb-6">
              This example shows how you can use the FullBleedSection with card
              components. The section extends full-width, but the content
              remains aligned with the page.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-medium mb-2">Feature One</h3>
                <p className="text-sm text-muted-foreground">
                  Cards are contained within the max-w-2xl container.
                </p>
              </Card>
              <Card className="p-4">
                <h3 className="font-medium mb-2">Feature Two</h3>
                <p className="text-sm text-muted-foreground">
                  The background extends full-width while content stays aligned.
                </p>
              </Card>
            </div>
          </div>
        </FullBleedSection>

        <p className="my-8">
          The text here is back to being constrained in the max-w-2xl container.
          This creates a rhythm between full-width sections and constrained
          content.
        </p>

        {/* Example 3: Full-width content that truly breaks out */}
        <FullBleedSection
          backgroundColor="bg-accent text-accent-foreground"
          padding="p-1"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Example 3: True Full-Width Content
          </h2>
          <p className="text-center mb-8 max-w-2xl mx-auto">
            Unlike the examples above, this content has no max-width container
            inside the FullBleedSection. The scrollable cards below demonstrate
            content that truly spans the entire viewport width.
          </p>
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4 min-w-max">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="w-64 h-40 flex-shrink-0 bg-card text-card-foreground rounded-lg flex items-center justify-center"
                >
                  <span className="text-2xl font-bold">Item {item}</span>
                </div>
              ))}
            </div>
          </div>
        </FullBleedSection>
      </div>
    </div>
  );
}

import { Tweet } from '@/delta/components/tweet';

export default function TweetDemo() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <SmallTweetDemo />
      <StandardTweetDemo />
      <MultipleTweetsDemo />
    </div>
  );
}

export function SmallTweetDemo() {
  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-center">
        <Tweet id="896523232098078720" small />
      </div>
      <p className="text-sm text-muted-foreground mt-2 text-center">
        Small tweets are more compact and work well on both mobile and desktop.
      </p>
    </div>
  );
}

export function StandardTweetDemo() {
  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-center">
        <Tweet id="1886192184808149383" />
      </div>
      <p className="text-sm text-muted-foreground mt-2 text-center">
        Standard tweets appear large on desktop screens.
      </p>
    </div>
  );
}

export function MultipleTweetsDemo() {
  return (
    <div className="w-full max-w-2xl">
      <div className="space-y-6 flex flex-col items-center">
        <Tweet id="1899637674241048800" />
        <Tweet id="1895566669281636846" small />
      </div>
      <p className="text-sm text-muted-foreground mt-2 text-center">
        Note: Standard-sized tweets use default, responsive size on desktop but
        may require horizontal scrolling on mobile devices, depending on parent
        container.
      </p>
    </div>
  );
}

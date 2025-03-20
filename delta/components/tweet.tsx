import { Suspense } from 'react';
import { type Tweet, getTweet } from 'react-tweet/api';
import {
  EmbeddedTweet,
  TweetNotFound,
  TweetSkeleton,
  type TweetProps,
} from 'react-tweet';
import '@/delta/components/tweet.css';

interface TweetArgs {
  id: string;
}

async function fetchTweetWithRetry(
  id: string,
  maxRetries = 3,
  currentAttempt = 1,
): Promise<Tweet | undefined> {
  try {
    const tweet = await getTweet(id);
    return tweet;
  } catch (error) {
    console.error(
      `Tweet fetch error (attempt ${currentAttempt}/${maxRetries}):`,
      error,
    );

    // If we've reached the maximum number of retries, return undefined
    if (currentAttempt >= maxRetries) {
      console.warn(`Failed to fetch tweet after ${maxRetries} attempts`);
      return undefined;
    }

    // Calculate delay with exponential backoff (300ms, 900ms, 2700ms, etc.)
    const delay = 300 * Math.pow(3, currentAttempt - 1);

    // Wait for the delay
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Retry the request
    return fetchTweetWithRetry(id, maxRetries, currentAttempt + 1);
  }
}

const TweetContent = async ({ id, components }: TweetProps) => {
  const tweet = id ? await fetchTweetWithRetry(id) : undefined;

  if (!tweet) {
    return <TweetNotFound />;
  }

  return <EmbeddedTweet tweet={tweet} components={components} />;
};

export const ReactTweet = (props: TweetProps) => (
  <Suspense fallback={<TweetSkeleton />}>
    <TweetContent {...props} />
  </Suspense>
);

export async function Tweet({ id }: TweetArgs) {
  return (
    <div className="tweet my-6">
      <div className={`flex justify-center`}>
        <ReactTweet id={id} />
      </div>
    </div>
  );
}

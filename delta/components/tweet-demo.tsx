import { Tweet } from "./tweet";

export function TweetDemo() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Demo: Tweet</h3>
      <div className="p-6 border rounded-lg bg-slate-50 dark:bg-slate-900">
        <Tweet />
      </div>
    </div>
  );
}

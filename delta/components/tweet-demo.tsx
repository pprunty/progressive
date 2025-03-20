import {Tweet} from "@/delta/components/tweet"

export default function TweetDemo() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Tweet Component Demo</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Basic Tweet</h2>
          <Tweet id="896523232098078720" />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Another Tweet Example</h2>
          <Tweet id="1886192184808149383" />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Multiple Tweets</h2>
          <div className="space-y-6">
            <Tweet id="1899637674241048800" />
            <Tweet id="1895566669281636846" />
          </div>
        </div>
      </div>
    </div>
  )
}


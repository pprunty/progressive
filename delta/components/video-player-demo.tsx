import { VideoPlayer } from "./video-player"

export default function VideoPlayerDemo() {
  return (
    <VideoPlayer
      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      title="Big Buck Bunny - Sample Video"
      storageKey="demo-video-player-state"
    />
  )
}


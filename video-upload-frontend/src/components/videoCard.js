import { useRef } from "react";

const VideoCard = ({ video, index, handlePlay }) => {
  const videoRef = useRef(null);

  const onPlayHandler = () => {
    handlePlay(index);
    videoRef.current.muted = false;
    videoRef.current.play();
  };

  return (
    <div className="flex flex-col items-center border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-2 text-start w-full truncate">
        {video.title}
      </h3>
      <div className="w-full">
        <video
          id={`video-${index}`}
          ref={videoRef}
          src={video?.videoUrl}
          className="w-full h-auto mb-2"
          controls
          onPlay={onPlayHandler}
          muted={false}
        />
      </div>
    </div>
  );
};

export default VideoCard;

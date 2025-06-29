import React, { useEffect, useRef } from "react";
import welcomeVideo from "../assets/preview.mp4";

function WelcomePreview({ onEnd }) {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    video.play();
    video.onended = onEnd;
    video.controls = false;
  }, [onEnd]);

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <video ref={videoRef} className="rounded-xl w-full max-w-md" muted playsInline>
        <source src={welcomeVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default WelcomePreview;

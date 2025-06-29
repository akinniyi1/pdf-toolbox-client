import React, { useEffect, useRef } from "react";

function WelcomePreview({ onEnd }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play();
    }
  }, []);

  return (
    <div className="text-center">
      <video
        ref={videoRef}
        src="/welcome.mp4"
        onEnded={onEnd}
        className="w-full rounded-xl shadow-lg"
        playsInline
        autoPlay
        muted
      />
    </div>
  );
}

export default WelcomePreview;

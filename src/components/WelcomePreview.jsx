import React, { useEffect, useRef } from "react";

const WelcomePreview = ({ onEnd }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <video
        ref={videoRef}
        src="/preview.mp4"
        className="w-full h-auto"
        autoPlay
        muted
        playsInline
        onEnded={onEnd}
        controls={false} // 🔒 disables play/pause/download
      />
    </div>
  );
};

export default WelcomePreview;

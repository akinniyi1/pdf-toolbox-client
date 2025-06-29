import React from "react";

function WelcomePreview({ onEnd }) {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <video
        src="/preview.mp4"
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        onEnded={onEnd}
      />
    </div>
  );
}

export default WelcomePreview;

// components/WelcomePreview.jsx
import React from "react";
import videoFile from "../assets/preview.mp4";

function WelcomePreview({ onEnd }) {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <video
        className="w-full h-full object-cover"
        src={videoFile}
        autoPlay
        onEnded={onEnd}
        controls={false}
        playsInline
        muted
      />
    </div>
  );
}

export default WelcomePreview;

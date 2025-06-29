import React, { useEffect, useRef, useState } from "react";
import LoginRegister from "./LoginRegister";

function WelcomePreview({ onFinish }) {
  const videoRef = useRef(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const handleEnded = () => setShowLogin(true);

    const video = videoRef.current;
    if (video) {
      video.addEventListener("ended", handleEnded);
    }

    return () => {
      if (video) {
        video.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  if (showLogin) {
    return <LoginRegister onLoginComplete={onFinish} />;
  }

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src="/preview.mp4"
        autoPlay
        muted
        className="w-full h-full object-cover"
        playsInline
      />
    </div>
  );
}

export default WelcomePreview;

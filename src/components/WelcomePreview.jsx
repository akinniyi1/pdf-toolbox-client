import React, { useEffect, useRef, useState } from "react";
import LoginRegister from "./LoginRegister";

export default function WelcomePreview({ onLogin }) {
  const videoRef = useRef();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const handleEnd = () => setShowLogin(true);

    if (video) {
      video.addEventListener("ended", handleEnd);
      video.play().catch(() => setShowLogin(true)); // fallback if autoplay fails
    }

    return () => {
      if (video) video.removeEventListener("ended", handleEnd);
    };
  }, []);

  return (
    <div className="text-center">
      {!showLogin ? (
        <video
          ref={videoRef}
          src="/preview.mp4"
          className="w-full rounded-xl shadow"
          autoPlay
          muted
          playsInline
        />
      ) : (
        <LoginRegister onLogin={onLogin} />
      )}
    </div>
  );
}

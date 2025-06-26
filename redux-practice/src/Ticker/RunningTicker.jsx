import React, { useRef, useState, useEffect } from "react";
import "./RunningTicker.css"; 

const RunningTicker = ({ message, speed = 100 }) => {
  const containerRef = useRef(null);
  const messageRef = useRef(null);
  const [repeatCount, setRepeatCount] = useState(1);

  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth;
    const messageWidth = messageRef.current.offsetWidth;
    const minRepeats = Math.ceil(containerWidth / messageWidth) + 1;
    setRepeatCount(minRepeats);
  }, [message]);

  return (
    <div className="ticker-container" ref={containerRef}>
      <div
        className="ticker-track"
        style={{ animationDuration: `${speed}s` }}
      >
        {Array.from({ length: repeatCount }).map((_, index) => (
          <span key={index} ref={index === 0 ? messageRef : null} className="ticker-message">
            {message}
          </span>
        ))}
        
      </div>
    </div>
  );
};

export default RunningTicker;

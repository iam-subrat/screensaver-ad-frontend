import React from 'react';
import './TVFrame.css';

const TVFrame = ({ children, title = "Output Preview" }) => {
  return (
    <div className="tv-frame">
      <div className="tv-screen">
        <div className="tv-content">
          {children}
        </div>
        <div className="tv-reflection"></div>
      </div>
      <div className="tv-stand">
        <div className="tv-stand-neck"></div>
        <div className="tv-stand-base"></div>
      </div>
      <div className="tv-label">{title}</div>
    </div>
  );
};

export default TVFrame;
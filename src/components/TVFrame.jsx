import React from "react";
import "./TVFrame.css";

const TVFrame = ({
    children,
    title = "Output Preview",
    videoUrl,
    controls = false,
    loop = true,
    muted = true,
}) => {
    return (
        <div className="tv-frame">
            <div className="tv-screen">
                <div className="tv-content">
                    {videoUrl ? (
                        <video
                            src={videoUrl}
                            autoPlay
                            controls={controls}
                            muted={muted}
                            loop={loop}
                            playsInline
                            width="100%"
                            style={{ borderRadius: 8 }}
                        />
                    ) : (
                        children
                    )}
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

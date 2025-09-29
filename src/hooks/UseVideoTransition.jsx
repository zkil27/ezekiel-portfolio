import { useState, useEffect } from "react";

export function useVideoTransition(initialVideo = "/videos/clutch.mp4") {
    const [currentVideo, setCurrentVideo] = useState(initialVideo);
    const [isTransitioning, setIsTransitioning] = useState(false); // Start as false for no initial transition

    const handleVideoChange = (newVideoSrc) => {
        if (newVideoSrc !== currentVideo) {
            setIsTransitioning(true);

            // Fade to blue first (200ms)
            setTimeout(() => {
                setCurrentVideo(newVideoSrc);
                // Then fade out from blue (200ms)
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 200);
            }, 200);
        }
    };

    return {
        currentVideo,
        isTransitioning,
        handleVideoChange,
    };
}

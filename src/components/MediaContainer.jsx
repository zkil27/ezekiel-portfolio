import { useState, useRef, useEffect } from "react";

export function MediaContainer({ src, isTransitioning, isFirst = false }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(isFirst); 
    const mediaRef = useRef(null);


    const isImage = /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(src || "");

 
    useEffect(() => {
        if (!mediaRef.current || isFirst) return; 

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "500px",
            }
        );

        observer.observe(mediaRef.current);
        return () => observer.disconnect();
    }, [isFirst]);

    const handleLoad = () => setIsLoaded(true);

    // Don't render media until it's about to be in view
    const shouldRenderMedia = isInView;

    return (
        <div className="media-container" ref={mediaRef}>
            {shouldRenderMedia && (
                <>
                    {isImage ? (
                        <img
                            key={src}
                            src={src}
                            alt="Project showcase"
                            className={`media ${isLoaded ? "loaded" : ""}`}
                            onLoad={handleLoad}
                            loading={isFirst ? "eager" : "lazy"} // Eager loading for first image
                            decoding="async"
                        />
                    ) : (
                        <video
                            key={src}
                            src={src}
                            autoPlay={isInView}
                            muted
                            loop
                            playsInline
                            preload={isFirst ? "auto" : "metadata"} // Full preload for first video
                            className={`media ${isLoaded ? "loaded" : ""}`}
                            onLoadedData={handleLoad}
                            controls={false}
                            disablePictureInPicture
                        />
                    )}
                </>
            )}

            {!isLoaded && shouldRenderMedia && (
                <div className="media-placeholder">
                    <div className="loading-spinner" />
                </div>
            )}

            <div className={`blue-overlay ${isTransitioning ? "active" : ""}`} />
        </div>
    );
}

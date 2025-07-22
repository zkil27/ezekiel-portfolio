import { useState, useRef, useEffect } from 'react';

export function MediaContainer({ src, isTransitioning }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const mediaRef = useRef(null);
    
    // More robust image detection
    const isImage = /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(src || '');
    
    // Intersection Observer for lazy loading
    useEffect(() => {
        if (!mediaRef.current) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { 
                threshold: 0.1,
                rootMargin: '50px' // Start loading 50px before it's visible
            }
        );
        
        observer.observe(mediaRef.current);
        return () => observer.disconnect();
    }, []);

    const handleLoad = () => setIsLoaded(true);
    
    // Don't render media until it's about to be in view
    const shouldRenderMedia = isInView;

    return (
        <div className="video-container" ref={mediaRef}>
            {shouldRenderMedia && (
                <>
                    {isImage ? (
                        <img 
                            key={src}
                            src={src}
                            alt="Project showcase"
                            className={`project-video ${isLoaded ? 'loaded' : ''}`}
                            onLoad={handleLoad}
                            loading="lazy"
                            decoding="async"
                        />
                    ) : (
                        <video 
                            key={src}
                            src={src}
                            autoPlay={isInView} // Only autoplay when in view
                            muted 
                            loop 
                            playsInline
                            preload="none" // Don't preload until needed
                            className={`project-video ${isLoaded ? 'loaded' : ''}`}
                            onLoadedData={handleLoad}
                            controls={false}
                            disablePictureInPicture
                        />
                    )}
                </>
            )}
            
            {/* Show loading placeholder until media loads */}
            {!isLoaded && shouldRenderMedia && (
                <div className="media-placeholder">
                    <div className="loading-spinner" />
                </div>
            )}
            
            <div className={`blue-overlay ${isTransitioning ? 'active' : ''}`} />
        </div>
    );
}
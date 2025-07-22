import './VideoPlayer.css';

export function VideoPlayer({ 
    currentVideo, 
    isTransitioning, 
    className = "",
    overlayColor = "#2941B5" 
}) {
    return (
        <div className={`video-container ${className}`}>
            <video 
                key={currentVideo}
                src={currentVideo}
                autoPlay 
                muted 
                loop 
                className="project-video"
            />
            <div 
                className={`transition-overlay ${isTransitioning ? 'active' : ''}`}
                style={{ backgroundColor: overlayColor }}
            />
        </div>
    );
}

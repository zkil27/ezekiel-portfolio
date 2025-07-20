export function MediaContainer({ src, isTransitioning }) {
    const isImage = src?.endsWith('.jpg') || src?.endsWith('.png') || src?.endsWith('.jpeg') || src?.endsWith('.gif') || src?.endsWith('.webp');

    return (
        <div className="video-container">
            {isImage ? (
                <img 
                    key={src}
                    src={src}
                    alt="Project showcase"
                    className="project-video"
                />
            ) : (
                <video 
                    key={src}
                    src={src}
                    autoPlay 
                    muted 
                    loop 
                    className="project-video"
                ></video>
            )}
            <div className={`blue-overlay ${isTransitioning ? 'active' : ''}`}></div>
        </div>
    );
}

import { Tag } from './Tag';
import { Button } from './Button';
import AnimatedContent from './AnimatedContent';
import { useEffect, useRef } from 'react';

export function ProjectCard({ 
    title, 
    tags = [], 
    descriptions = [],
    buttonText = "VIEW PROJECT",
    buttonLink = "#",
    threshold = 0.5,
    className = "",
    videoSrc,
    onVideoChange
}) {
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && videoSrc && onVideoChange) {
                    onVideoChange(videoSrc);
                }
            },
            { threshold: 0.5 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, [videoSrc, onVideoChange]);

    return (
        <div ref={cardRef}>
            <AnimatedContent threshold={threshold}>
                <div className={`project-card ${className}`}>
                    <h2>{title}</h2>
                    
                    {tags.map((tag, index) => (
                        <Tag 
                            key={index}
                            size={tag.size || 'small'}
                            variant={tag.variant || 'default'}
                        >
                            {tag.text}
                        </Tag>
                    ))}

                    {descriptions.map((description, index) => (
                        <div key={index}>
                            <hr />
                            <p>{description}</p>
                        </div>
                    ))}
                
                    <a href={buttonLink}>
                        <Button>{buttonText}</Button>
                    </a>
                </div>
            </AnimatedContent>
        </div>
    );
}

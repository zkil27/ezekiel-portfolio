import { Tag } from './Tag';
import { Button } from './Button';
import AnimatedContent from './AnimatedContent';

export function ProjectCard({ 
    title, 
    tags = [], 
    descriptions = [],
    buttonText = "VIEW PROJECT",
    buttonLink = "#",
    threshold = 0.5,
    className = ""
}) {
    return (
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
    );
}

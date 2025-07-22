import './Tag.css';

export function Tag({ 
    children, 
    variant = "default", 
    size = "medium",
    onClick,
    className = ""
}) {
    return (
        <span 
            className={`tag tag--${variant} tag--${size} ${className}`}
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {children}
        </span>
    );
}

import { useState, useEffect, useRef } from 'react';
import './CustomCursor.css';

export function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const cursorRef = useRef(null);

    useEffect(() => {
        let animationFrame;
        const cursor = cursorRef.current;
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;

        const updatePosition = (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
        };

        const animateCursor = () => {
            const ease = 0.7; 
            
            currentX += (targetX - currentX) * ease;
            currentY += (targetY - currentY) * ease;
            
            if (cursor) {
                cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
            }
            
            animationFrame = requestAnimationFrame(animateCursor);
        };

        const handleMouseOver = (e) => {
            const isClickable = e.target.closest('button, a, [role="button"], input[type="button"], input[type="submit"]');
            setIsHovering(!!isClickable);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        document.addEventListener('mousemove', updatePosition);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        
        animateCursor();

        return () => {
            document.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className={`custom-cursor ${isClicking ? 'clicking' : isHovering ? 'hovering' : ''}`}
        />
    );
}

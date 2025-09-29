import { useEffect, useRef, useCallback } from 'react';
import './CustomCursor.css';

export function CustomCursor() {
    const cursorRef = useRef(null);
    const isHovering = useRef(false);
    const isClicking = useRef(false);
    const animationFrame = useRef();
    const current = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });

    // Only update className when needed
    const updateCursorClass = useCallback(() => {
        if (!cursorRef.current) return;
        let className = 'custom-cursor';
        if (isClicking.current) className += ' clicking';
        else if (isHovering.current) className += ' hovering';
        cursorRef.current.className = className;
    }, []);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const updatePosition = (e) => {
            target.current.x = e.clientX;
            target.current.y = e.clientY;
        };

        const animateCursor = () => {
            const ease = 0.7;
            current.current.x += (target.current.x - current.current.x) * ease;
            current.current.y += (target.current.y - current.current.y) * ease;
            cursor.style.transform = `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%)`;
            animationFrame.current = requestAnimationFrame(animateCursor);
        };

        const handleMouseOver = (e) => {
            const isClickable = e.target.closest('button, a, [role="button"], input[type="button"], input[type="submit"]');
            const hovering = !!isClickable;
            if (hovering !== isHovering.current) {
                isHovering.current = hovering;
                updateCursorClass();
            }
        };

        const handleMouseDown = () => {
            if (!isClicking.current) {
                isClicking.current = true;
                updateCursorClass();
            }
        };
        const handleMouseUp = () => {
            if (isClicking.current) {
                isClicking.current = false;
                updateCursorClass();
            }
        };

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
            cancelAnimationFrame(animationFrame.current);
        };
    }, [updateCursorClass]);

    return <div ref={cursorRef} className="custom-cursor" />;
}

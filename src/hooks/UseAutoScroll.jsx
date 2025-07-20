import { useState, useEffect, useRef, useCallback } from 'react';

export function useAutoScroll() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const projectRefs = useRef([]);
    const isAutoScrolling = useRef(false);
    const scrollTimeout = useRef(null);
    const hasUserScrolled = useRef(false);
    const initialLoad = useRef(true);

    // Smoother easing function
    const easeInOutQuart = (t) => {
        return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    };

    const smoothScrollTo = useCallback((element, duration = 1200) => {
        if (!element) return;
        
        // Get the element's position relative to the document
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate target position to center the element
        const targetPosition = elementTop - (windowHeight / 2) + (elementHeight / 2);
        const startPosition = scrollTop;
        const distance = targetPosition - startPosition;
        let startTime = null;

        // Don't scroll if we're already close to the target
        if (Math.abs(distance) < 30) {
            isAutoScrolling.current = false;
            return;
        }

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easedProgress = easeInOutQuart(progress);
            
            window.scrollTo(0, startPosition + distance * easedProgress);
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            } else {
                isAutoScrolling.current = false;
            }
        };

        requestAnimationFrame(animation);
    }, []);

    const findClosestProject = useCallback(() => {
        const windowHeight = window.innerHeight;
        let closestIndex = 0;
        let closestDistance = Infinity;
        
        projectRefs.current.forEach((ref, index) => {
            if (ref) {
                const rect = ref.getBoundingClientRect();
                const elementCenter = rect.top + rect.height / 2;
                const viewportCenter = windowHeight / 2;
                const distance = Math.abs(elementCenter - viewportCenter);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            }
        });
        
        return { index: closestIndex, distance: closestDistance };
    }, []);

    const alignToClosestProject = useCallback(() => {
        if (isAutoScrolling.current || !hasUserScrolled.current) return;
        
        const { index, distance } = findClosestProject();
        
        // Only auto-align if we're not already centered
        if (distance > 30) {
            setCurrentIndex(index);
            isAutoScrolling.current = true;
            smoothScrollTo(projectRefs.current[index], 1200);
        }
    }, [findClosestProject, smoothScrollTo]);

    useEffect(() => {
        // Prevent auto-scroll on initial load
        const timer = setTimeout(() => {
            initialLoad.current = false;
        }, 1000);

        const handleScroll = () => {
            // Mark that user has scrolled
            if (!initialLoad.current) {
                hasUserScrolled.current = true;
            }

            if (isAutoScrolling.current || !hasUserScrolled.current) return;

            // Clear existing timeout
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }

            // Longer timeout for smoother experience
            scrollTimeout.current = setTimeout(() => {
                alignToClosestProject();
            }, 300);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, [alignToClosestProject]);

    const setProjectRef = useCallback((index) => (ref) => {
        projectRefs.current[index] = ref;
    }, []);

    return {
        currentIndex,
        setProjectRef
    };
}
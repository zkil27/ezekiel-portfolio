import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedContent = ({
    children,
    distance = 100,
    direction = "vertical",
    reverse = false,
    duration = 1,
    ease = "power3.out",
    initialOpacity = 0,
    animateOpacity = true,
    scale = 1,
    threshold = 0.1,
    delay = 0,
    onComplete,
}) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Wait for DOM to be fully loaded
        const initAnimation = () => {
            if (!el || !document.body.contains(el)) {
                return;
            }

            const axis = direction === "horizontal" ? "x" : "y";
            const offset = reverse ? -distance : distance;
            const startPct = (1 - threshold) * 100;

            let tween;
            let scrollTriggerInstance;

            try {
                // Set initial state with error handling
                gsap.set(el, {
                    [axis]: offset,
                    scale,
                    opacity: animateOpacity ? initialOpacity : 1,
                    force3D: true
                });

                // Create animation
                tween = gsap.to(el, {
                    [axis]: 0,
                    scale: 1,
                    opacity: 1,
                    duration,
                    ease,
                    delay,
                    force3D: true,
                    onComplete: () => {
                        if (onComplete && typeof onComplete === 'function') {
                            onComplete();
                        }
                    }
                });

                // Create ScrollTrigger with better error handling
                scrollTriggerInstance = ScrollTrigger.create({
                    trigger: el,
                    start: `top ${startPct}%`,
                    end: "bottom top",
                    toggleActions: "play none none none",
                    once: true,
                    animation: tween,
                    invalidateOnRefresh: true,
                    onRefresh: () => {
                        // Check if element still exists and is in DOM
                        if (!el || !document.body.contains(el)) {
                            if (scrollTriggerInstance) {
                                scrollTriggerInstance.kill();
                            }
                        }
                    },
                    onToggle: (self) => {
                        // Additional safety check
                        if (!el || !document.body.contains(el)) {
                            self.kill();
                        }
                    }
                });

                // Refresh ScrollTrigger after a short delay to ensure proper initialization
                const refreshTimeout = setTimeout(() => {
                    if (scrollTriggerInstance && scrollTriggerInstance.isActive !== false) {
                        try {
                            ScrollTrigger.refresh();
                        } catch (refreshError) {
                            console.warn("ScrollTrigger refresh warning:", refreshError);
                        }
                    }
                }, 150);

                return () => {
                    clearTimeout(refreshTimeout);
                    if (scrollTriggerInstance) {
                        try {
                            scrollTriggerInstance.kill();
                        } catch (error) {
                            console.warn("ScrollTrigger cleanup warning:", error);
                        }
                    }
                    if (tween) {
                        try {
                            tween.kill();
                        } catch (error) {
                            console.warn("GSAP tween cleanup warning:", error);
                        }
                    }
                };

            } catch (error) {
                console.error("GSAP/ScrollTrigger initialization error:", error);
                // Fallback: show element without animation
                if (el) {
                    gsap.set(el, {
                        [axis]: 0,
                        scale: 1,
                        opacity: 1,
                        clearProps: "transform"
                    });
                }
                return () => {
                    if (scrollTriggerInstance) scrollTriggerInstance.kill();
                    if (tween) tween.kill();
                };
            }
        };

        // Use multiple methods to ensure proper timing
        let cleanup;
        
        if (document.readyState === 'loading') {
            const handleDOMContentLoaded = () => {
                cleanup = initAnimation();
                document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
            };
            document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
            
            return () => {
                document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
                if (cleanup) cleanup();
            };
        } else {
            // DOM is already loaded, use requestAnimationFrame for next paint
            const rafId = requestAnimationFrame(() => {
                cleanup = initAnimation();
            });
            
            return () => {
                cancelAnimationFrame(rafId);
                if (cleanup) cleanup();
            };
        }
    }, [
        distance,
        direction,
        reverse,
        duration,
        ease,
        initialOpacity,
        animateOpacity,
        scale,
        threshold,
        delay,
        onComplete,
    ]);

    return <div ref={ref}>{children}</div>;
};

export default AnimatedContent;
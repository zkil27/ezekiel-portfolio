import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

const SplitText = ({
    text,
    className = "",
    delay = 70,
    duration = 0.6,
    ease = "power3.out",
    splitType = "words",
    from = { opacity: 0, y: 20 },
    to = { opacity: 1, y: 0 },
    threshold = 1,
    rootMargin = "0px",
    textAlign = "left",
    onLetterAnimationComplete,
}) => {
    const ref = useRef(null);
    const animationCompletedRef = useRef(false);
    const scrollTriggerRef = useRef(null);
    const splitterRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        if (typeof window === "undefined" || !ref.current || !text) return;

        const el = ref.current;
        animationCompletedRef.current = false;

        const initAnimation = () => {
            if (!el || !document.body.contains(el)) {
                return;
            }

            // Make the element invisible initially
            el.style.opacity = "0";
            el.style.visibility = "hidden";

            const absoluteLines = splitType === "lines";
            if (absoluteLines) el.style.position = "relative";

            let splitter;
            try {
                // Check if SplitText is available
                if (typeof GSAPSplitText === 'undefined') {
                    console.warn("SplitText plugin not loaded, falling back to regular animation");
                    // Fallback without SplitText
                    el.style.opacity = "1";
                    el.style.visibility = "visible";
                    return;
                }

                splitter = new GSAPSplitText(el, {
                    type: splitType,
                    absolute: absoluteLines,
                    linesClass: "split-line",
                });
                splitterRef.current = splitter;

            } catch (error) {
                console.error("Failed to create SplitText:", error);
                // Fallback: show element without animation
                el.style.opacity = "1";
                el.style.visibility = "visible";
                return;
            }

            let targets;
            switch (splitType) {
                case "lines":
                    targets = splitter.lines;
                    break;
                case "words":
                    targets = splitter.words;
                    break;
                case "chars":
                    targets = splitter.chars;
                    break;
                default:
                    targets = splitter.chars;
            }

            if (!targets || targets.length === 0) {
                console.warn("No targets found for SplitText animation");
                if (splitter) splitter.revert();
                el.style.opacity = "1";
                el.style.visibility = "visible";
                return;
            }

            // Optimize performance
            targets.forEach((t) => {
                if (t && t.style) {
                    t.style.willChange = "transform, opacity";
                }
            });

            const startPct = Math.max(0, Math.min(100, (1 - threshold) * 100));
            const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
            const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
            const marginUnit = marginMatch ? (marginMatch[2] || "px") : "px";
            const sign = marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
            const start = `top ${startPct}%${sign}`;

            try {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none none",
                        once: true,
                        invalidateOnRefresh: true,
                        onToggle: (self) => {
                            scrollTriggerRef.current = self;
                            // Safety check
                            if (!el || !document.body.contains(el)) {
                                self.kill();
                            }
                        },
                        onRefresh: () => {
                            if (!el || !document.body.contains(el)) {
                                if (scrollTriggerRef.current) {
                                    scrollTriggerRef.current.kill();
                                }
                            }
                        }
                    },
                    smoothChildTiming: true,
                    onStart: () => {
                        // Make container visible when animation starts
                        if (el) {
                            el.style.opacity = "1";
                            el.style.visibility = "visible";
                        }
                    },
                    onComplete: () => {
                        animationCompletedRef.current = true;
                        if (targets && targets.length > 0) {
                            gsap.set(targets, {
                                ...to,
                                clearProps: "willChange",
                                immediateRender: true,
                            });
                        }
                        if (onLetterAnimationComplete && typeof onLetterAnimationComplete === 'function') {
                            onLetterAnimationComplete();
                        }
                    },
                });

                timelineRef.current = tl;

                // Set initial state
                tl.set(targets, { 
                    ...from, 
                    immediateRender: false, 
                    force3D: true 
                });
                
                // Animate to final state
                tl.to(targets, {
                    ...to,
                    duration: Math.max(0.1, duration),
                    ease,
                    stagger: Math.max(0.01, delay / 1000),
                    force3D: true,
                });

                return () => {
                    // Cleanup function
                    if (timelineRef.current) {
                        timelineRef.current.kill();
                        timelineRef.current = null;
                    }
                    if (scrollTriggerRef.current) {
                        scrollTriggerRef.current.kill();
                        scrollTriggerRef.current = null;
                    }
                    if (targets && targets.length > 0) {
                        gsap.killTweensOf(targets);
                    }
                    if (splitterRef.current) {
                        splitterRef.current.revert();
                        splitterRef.current = null;
                    }
                };

            } catch (error) {
                console.error("Timeline creation error:", error);
                // Fallback
                if (el) {
                    el.style.opacity = "1";
                    el.style.visibility = "visible";
                }
                if (splitter) splitter.revert();
            }
        };

        // Initialize with proper timing
        let cleanup;
        
        if (document.readyState === 'loading') {
            const handleLoad = () => {
                setTimeout(() => {
                    cleanup = initAnimation();
                }, 100);
                document.removeEventListener('DOMContentLoaded', handleLoad);
            };
            document.addEventListener('DOMContentLoaded', handleLoad);
            
            return () => {
                document.removeEventListener('DOMContentLoaded', handleLoad);
                if (cleanup) cleanup();
            };
        } else {
            const rafId = requestAnimationFrame(() => {
                setTimeout(() => {
                    cleanup = initAnimation();
                }, 50);
            });
            
            return () => {
                cancelAnimationFrame(rafId);
                if (cleanup) cleanup();
            };
        }
    }, [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        onLetterAnimationComplete,
    ]);

    return (
        <p
            ref={ref}
            className={`split-parent ${className}`}
            style={{
                textAlign,
                overflow: "hidden",
                display: "inline-block",
                whiteSpace: "normal",
                wordWrap: "break-word",
                margin: 0,
                opacity: 0,
                visibility: "hidden"
            }}
        >
            {text}
        </p>
    );
};

export default SplitText;
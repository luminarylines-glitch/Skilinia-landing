import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

/**
 * KeyframeSection - A section wrapper that animates like a keyframe appearing on a timeline
 * Elements scale, fade, and optionally type-in as they enter the viewport
 * 
 * Mobile: Simplified animations for better performance
 * Desktop: Full keyframe-style animations
 */
function KeyframeSection({
    children,
    className = '',
    variant = 'scale', // 'scale' | 'slide' | 'reveal' | 'fade'
    stagger = true,
    delay = 0,
    mobileSimplified = true // Use simpler animations on mobile
}) {
    const ref = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile on mount
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Lighter spring for mobile (less computation)
    const springConfig = isMobile
        ? { stiffness: 200, damping: 50 }
        : { stiffness: 100, damping: 30 };

    const smoothProgress = useSpring(scrollYProgress, springConfig);

    // Use simplified fade animation on mobile for performance
    const shouldSimplify = (isMobile && mobileSimplified) || prefersReducedMotion;

    // Different animation variants
    const animations = {
        scale: {
            scale: useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.95]),
            opacity: useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]),
            y: useTransform(smoothProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -30])
        },
        slide: {
            x: useTransform(smoothProgress, [0, 0.3, 0.7, 1], [-100, 0, 0, 50]),
            opacity: useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3])
        },
        reveal: {
            clipPath: useTransform(
                smoothProgress,
                [0, 0.4],
                ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']
            ),
            opacity: useTransform(smoothProgress, [0, 0.2], [0.5, 1])
        },
        // Simple fade - best for mobile
        fade: {
            opacity: useTransform(smoothProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.5]),
            y: useTransform(smoothProgress, [0, 0.25], [30, 0])
        }
    };

    // On mobile, use simpler fade animation
    const selectedVariant = shouldSimplify ? 'fade' : variant;
    const currentAnimation = animations[selectedVariant] || animations.fade;

    return (
        <motion.div
            ref={ref}
            style={currentAnimation}
            className={`will-change-transform ${className}`}
        >
            {/* Disable stagger on mobile for performance */}
            {stagger && !shouldSimplify ? (
                <StaggerChildren progress={smoothProgress} delay={delay}>
                    {children}
                </StaggerChildren>
            ) : (
                children
            )}
        </motion.div>
    );
}

// Stagger children animations for keyframe effect (Desktop only)
function StaggerChildren({ children, progress, delay }) {
    const childArray = React.Children.toArray(children);

    return (
        <>
            {childArray.map((child, index) => {
                const staggerDelay = index * 0.1 + delay;

                return (
                    <motion.div
                        key={index}
                        style={{
                            opacity: useTransform(
                                progress,
                                [0.1 + staggerDelay, 0.3 + staggerDelay],
                                [0, 1]
                            ),
                            y: useTransform(
                                progress,
                                [0.1 + staggerDelay, 0.3 + staggerDelay],
                                [20, 0]
                            )
                        }}
                    >
                        {child}
                    </motion.div>
                );
            })}
        </>
    );
}

/**
 * TypewriterText - Text that types in character by character on scroll
 * Only works on desktop for performance
 */
function TypewriterText({ text, className = '', progress }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 640);
    }, []);

    // On mobile, just show the text without animation
    if (isMobile) {
        return <span className={className}>{text}</span>;
    }

    const characters = text.split('');

    return (
        <span className={className}>
            {characters.map((char, index) => {
                const charProgress = index / characters.length;

                return (
                    <motion.span
                        key={index}
                        style={{
                            opacity: useTransform(
                                progress,
                                [charProgress * 0.5, charProgress * 0.5 + 0.02],
                                [0, 1]
                            )
                        }}
                    >
                        {char}
                    </motion.span>
                );
            })}
        </span>
    );
}

export { KeyframeSection, TypewriterText };
export default KeyframeSection;

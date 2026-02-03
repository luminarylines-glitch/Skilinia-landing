import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export default function PriceAnchorAnimation({
    originalPrice = "REGULAR",
    discountedPrice = "OFFER",
    discount = "LIMITED",
    children
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const controls = useAnimation();
    const [showDiscount, setShowDiscount] = useState(false);

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
            // Delay showing discount badge for dramatic effect
            setTimeout(() => setShowDiscount(true), 600);
        }
    }, [isInView, controls]);

    return (
        <div ref={ref} className="relative">
            {children ? (
                children
            ) : (
                <div className="flex items-baseline gap-3">
                    {/* Discounted price - pops in */}
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, type: "spring", damping: 15 }}
                        className="text-3xl sm:text-4xl font-bold text-white"
                    >
                        {discountedPrice}
                    </motion.span>

                    {/* Original price with animated strikethrough */}
                    <motion.span
                        className="relative text-lg text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.3, duration: 0.3 }}
                    >
                        {originalPrice}
                        {/* Animated strikethrough line */}
                        <motion.span
                            className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-500"
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ delay: 0.5, duration: 0.4 }}
                            style={{ transformOrigin: 'left' }}
                        />
                    </motion.span>

                    {/* Discount badge - pops in last */}
                    <motion.span
                        initial={{ opacity: 0, scale: 0, rotate: -10 }}
                        animate={showDiscount ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                        transition={{ type: "spring", damping: 10, stiffness: 200 }}
                        className="text-xs font-bold text-emerald-400 bg-emerald-400/20 px-2 py-1 rounded-full"
                    >
                        {discount}
                    </motion.span>
                </div>
            )}
        </div>
    );
}

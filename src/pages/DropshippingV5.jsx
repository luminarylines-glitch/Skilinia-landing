import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, X, Globe, CreditCard, Package, TrendingUp, ShoppingCart, Zap, PlayCircle, BookOpen, Users, Shield, Building2, Truck, BarChart3 } from 'lucide-react';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

// Headlines to cycle through
const HEADLINES = [
    { line1: "STILL WATCHING", line2: "FAKE GURU", line3: "TUTORIALS?", accent: 1, image: "/guru_flex_money.png" },
    { line1: "TIRED OF", line2: "₹500 PROFIT", line3: "MARGINS?", accent: 2 },
    { line1: "STOP COPYING", line2: "INDIAN", line3: "TUTORIALS.", accent: 1 },
    { line1: "INTERNATIONAL", line2: "DROPSHIPPING", line3: "DONE RIGHT.", accent: 2 },
];

const DISPLAY_DURATION = 3500;

// Premium "OLED" Blur Transition Component
function BlurReveal({ text, isVisible, delay = 0, className, style, overflow = true }) {
    return (
        <div className={overflow ? "overflow-hidden" : ""}>
            <AnimatePresence mode="wait">
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, filter: "blur(10px)", y: 20, scale: 1.05 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
                        exit={{ opacity: 0, filter: "blur(10px)", y: -20, scale: 0.95 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1], // Apple-style ease-out
                            delay: delay
                        }}
                        className={className}
                        style={style}
                    >
                        {text}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Headline Component using Blur Reveal
function BlurHeadline({ headline, isVisible }) {
    const { line1, line2, line3, accent } = headline;

    const getColor = (lineNum) => {
        if (lineNum === accent) return '#d4ff00';
        if (lineNum === 3 && accent === 2) return '#4b5563';
        return '#ffffff';
    };

    return (
        <div className="w-full flex flex-col items-start justify-center relative z-20 mix-blend-difference">
            <div className="flex flex-col items-start justify-center text-left space-y-[-0.05em]">
                <BlurReveal
                    text={line1}
                    isVisible={isVisible}
                    delay={0}
                    style={{ color: getColor(1) }}
                    className="origin-left"
                />
                <BlurReveal
                    text={line2}
                    isVisible={isVisible}
                    delay={0.1}
                    style={{ color: getColor(2) }}
                    className="origin-left"
                />
                <BlurReveal
                    text={line3}
                    isVisible={isVisible}
                    delay={0.2}
                    style={{ color: getColor(3) }}
                    className="origin-left"
                />
            </div>
        </div>
    );
}

// ============================================
// DESIGN 5: BOLD CONTRAST
// Pure black, neon yellow, dramatic typography, impactful blocks
// ============================================

function DropshippingV5() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            // Trigger exit animation
            setIsVisible(false);

            // Wait for exit to finish, then swap index and start entry
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % HEADLINES.length);
                setIsVisible(true);
            }, 800); // Matches exit duration

        }, DISPLAY_DURATION);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white font-sans antialiased">

            {/* ==================== HERO SECTION ==================== */}
            <section className="relative min-h-screen flex flex-col justify-center px-6 py-24 bg-black overflow-hidden perspective-[2000px]">

                {/* Background Grid - Keeping subtle */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

                {/* Main Content Container - Massive Left Align */}
                <div className="max-w-[1400px] mx-auto w-full relative z-10 grid lg:grid-cols-12 gap-8 items-center h-full">

                    {/* LEFT: MASSIVE TYPOGRAPHY */}
                    <div className="lg:col-span-8 flex flex-col items-start justify-center h-full relative z-30">
                        {/* Mini Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 mb-8"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4ff00] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#d4ff00]"></span>
                            </span>
                            <span className="text-[#d4ff00] font-mono text-sm tracking-[0.2em] font-bold uppercase">India → Global v2.0</span>
                        </motion.div>

                        {/* HEADLINE BLOCK */}
                        <div className="w-full relative min-h-[16vw] lg:min-h-[14vw] mb-8">
                            <h1 className="text-[11vw] lg:text-[7.5vw] font-black leading-[0.9] tracking-tighter drop-shadow-2xl text-white">
                                <BlurHeadline
                                    headline={HEADLINES[currentIndex]}
                                    isVisible={isVisible}
                                />
                            </h1>
                        </div>

                        {/* Mobile Image (Interleaved) */}
                        <div className="lg:hidden w-full flex justify-start mb-8 relative z-10 pl-2">
                            <AnimatePresence mode="wait">
                                {HEADLINES[currentIndex].image && isVisible && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 3 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="relative w-48 sm:w-64 rotate-3 origin-left"
                                    >
                                        <div className="p-1.5 bg-black/40 backdrop-blur-md border border-[#d4ff00]/40 rounded-[1.5rem] shadow-2xl skew-y-3">
                                            <img
                                                src={HEADLINES[currentIndex].image}
                                                alt="Fake Guru"
                                                className="relative w-full rounded-[1.2rem] shadow-lg object-cover aspect-[4/5]"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Subheadline & CTA - Mobile Option B: Hide when Image is present */}
                        <div className={`max-w-2xl space-y-10 transition-all duration-500 ease-in-out ${HEADLINES[currentIndex].image ? 'opacity-0 max-h-0 overflow-hidden lg:opacity-100 lg:max-h-[600px] lg:overflow-visible' : 'opacity-100 max-h-[600px]'}`}>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed"
                            >
                                The complete system to build a <span className="text-white font-bold decoration-[#d4ff00] underline decoration-4 underline-offset-4">real international brand</span> from India.
                                <br />
                                <span className="text-gray-500 text-lg mt-2 block">No inventory. No low-margin domestic wars. pure profit.</span>
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col sm:flex-row gap-6 items-start"
                            >
                                <button className="group relative px-10 py-5 bg-[#d4ff00] text-black font-black text-xl hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(212,255,0,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] rounded-none skew-x-[-10deg] hover:skew-x-0">
                                    <span className="relative z-10 flex items-center gap-3 skew-x-[10deg] group-hover:skew-x-0 transition-transform">
                                        JOIN THE 1%
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                    </span>
                                </button>

                                <div className="flex flex-col gap-2 pt-2">
                                    <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                                        <X className="w-4 h-4 text-red-500" />
                                        <span>NO AMAZON INDIA</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                                        <X className="w-4 h-4 text-red-500" />
                                        <span>NO FAKE SCREENSHOTS</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* RIGHT: FLOATING IMAGE (High Z-Index, Overlapping) */}
                    <div className="lg:col-span-4 h-full hidden lg:flex items-center justify-center relative z-20 pointer-events-none">
                        <AnimatePresence mode="wait">
                            {HEADLINES[currentIndex].image && isVisible && (
                                <motion.div
                                    key="guru-card"
                                    initial={{ opacity: 0, x: 100, rotate: 12, scale: 0.8 }}
                                    animate={{ opacity: 1, x: -40, rotate: 6, scale: 1 }} // Overlap left by -40px
                                    exit={{ opacity: 0, x: 100, rotate: 12, scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                    className="absolute right-0 top-[35%] -translate-y-1/2 pointer-events-auto"
                                >
                                    {/* Card Container - Tilted, Glassy */}
                                    <div className="relative p-4 bg-black/40 backdrop-blur-xl border border-[#d4ff00]/40 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] transform transition-transform hover:scale-105 hover:rotate-0 duration-500 group">
                                        <img
                                            src={HEADLINES[currentIndex].image}
                                            alt="Fake Guru"
                                            className="relative w-[420px] rounded-[2.5rem] shadow-2xl object-cover aspect-[4/5] opacity-90 group-hover:opacity-100 transition-opacity"
                                        />

                                        {/* Mock 'Live' Badge */}
                                        <div className="absolute top-8 right-8 bg-[#FF2C2C] text-white text-[14px] font-black px-4 py-1.5 rounded-full animate-pulse flex items-center gap-2 shadow-xl z-30 border border-white/20 tracking-widest">
                                            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                                            LIVE
                                        </div>

                                        {/* Mock 'Rich Life' Tag */}
                                        <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-md text-[#d4ff00] text-sm font-bold px-4 py-2 rounded-2xl border border-[#d4ff00]/30 shadow-xl z-30 flex items-center gap-2">
                                            <span>@guru_lifestyle</span>
                                            <span className="text-xl">💸</span>
                                        </div>

                                        {/* Massive Glow Behind */}
                                        <div className="absolute inset-0 bg-[#d4ff00] rounded-[3rem] blur-[80px] opacity-10 group-hover:opacity-30 transition duration-500 -z-10" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>


            </section>


            {/* ==================== THE PROBLEM SECTION ==================== */}
            < section className="py-24 px-6 border-t border-gray-900" >
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-1 bg-[#FF2C2C]" />
                            <span className="text-[#FF2C2C] font-bold tracking-wider uppercase text-sm">The Problem</span>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black tracking-tight mb-16">
                            WHY MOST FAIL.
                        </motion.h2>

                        <div className="grid md:grid-cols-2 gap-1">
                            {[
                                {
                                    num: "01",
                                    title: "TUTORIAL OVERLOAD",
                                    desc: "YouTube is filled with outdated, generic advice. Zero India-specific guidance on GST, payments, or entity setup."
                                },
                                {
                                    num: "02",
                                    title: "DOMESTIC TRAP",
                                    desc: "Amazon India, Flipkart, Meesho = 2-5% margins. No real business. Just a race to the bottom."
                                },
                                {
                                    num: "03",
                                    title: "PAYMENT BLOCK",
                                    desc: "Stripe doesn't work in India. PayPal has limits. 90% give up here without launching."
                                },
                                {
                                    num: "04",
                                    title: "AD BURNOUT",
                                    desc: "Without testing frameworks, most waste ₹50k-1L on Facebook ads learning the wrong lessons."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-8 bg-gray-950 border border-gray-900 hover:border-[#FF2C2C]/50 transition-colors"
                                >
                                    <span className="text-5xl font-black text-[#FF2C2C] mb-4 block">{item.num}</span>
                                    <h3 className="text-xl font-black mb-3 text-[#FF2C2C]">{item.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section >

            {/* ==================== THE SOLUTION SECTION ==================== */}
            < section className="py-24 px-6 bg-[#d4ff00] text-black" >
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-1 bg-black" />
                            <span className="font-bold tracking-wider uppercase text-sm">The Solution</span>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                            A COMPLETE SYSTEM.
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-xl text-black/70 max-w-xl mb-16">
                            Not motivation. Not vague advice. A practical framework built specifically for
                            Indians selling to international customers.
                        </motion.p>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1">
                            {[
                                { icon: Building2, title: "US LLC SETUP", desc: "Wyoming formation for legal ops" },
                                { icon: CreditCard, title: "STRIPE ACCESS", desc: "Accept global payments" },
                                { icon: ShoppingCart, title: "STORE BUILD", desc: "High-converting Shopify" },
                                { icon: BarChart3, title: "PRODUCT RESEARCH", desc: "Data-driven selection" },
                                { icon: Zap, title: "AD STRATEGY", desc: "Structured testing" },
                                { icon: Truck, title: "FULFILLMENT", desc: "Reliable global shipping" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-6 bg-black text-white hover:bg-gray-900 transition-colors"
                                >
                                    <item.icon className="w-8 h-8 text-[#d4ff00] mb-4" />
                                    <h3 className="font-black mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-400">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section >

            {/* ==================== MODULE BREAKDOWN ==================== */}
            < section className="py-24 px-6 border-t border-gray-900" >
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-1 bg-[#d4ff00]" />
                            <span className="text-[#d4ff00] font-bold tracking-wider uppercase text-sm">Curriculum</span>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black tracking-tight mb-16">
                            WHAT YOU'LL DO.
                        </motion.h2>

                        <div className="space-y-0">
                            {[
                                "Form a US LLC from India without lawyers or travel",
                                "Open Stripe and accept payments from 135+ countries",
                                "Find products with proven demand using data",
                                "Build a Shopify store that actually converts",
                                "Run structured ad tests without burning money",
                                "Handle fulfillment without constant problems",
                                "Scale from first sale to consistent revenue"
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="flex items-center gap-6 p-6 border-b border-gray-900 hover:bg-gray-950 transition-colors"
                                >
                                    <span className="text-4xl font-black text-[#d4ff00]">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <p className="text-lg text-gray-300">{item}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section >

            {/* ==================== WHO THIS IS FOR / NOT FOR ==================== */}
            < section className="py-24 px-6 bg-gray-950" >
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black tracking-tight text-center mb-16">
                            IS THIS YOU?
                        </motion.h2>

                        <div className="grid md:grid-cols-2 gap-1">
                            {/* This IS For */}
                            <motion.div variants={fadeInUp} className="p-10 bg-black border-l-4 border-[#d4ff00]">
                                <h3 className="text-2xl font-black text-[#d4ff00] mb-8">YES →</h3>
                                <ul className="space-y-5">
                                    {[
                                        "Ready to invest time learning",
                                        "Can commit 3-6 months",
                                        "Have ₹50k-1L starting capital",
                                        "Understand testing is required",
                                        "Want to build real business"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-gray-300">
                                            <Check className="w-6 h-6 text-[#d4ff00]" />
                                            <span className="font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* This is NOT For */}
                            <motion.div variants={fadeInUp} className="p-10 bg-black border-l-4 border-gray-800">
                                <h3 className="text-2xl font-black text-gray-600 mb-8">NO →</h3>
                                <ul className="space-y-5">
                                    {[
                                        "Want passive income now",
                                        "Expect quick guaranteed returns",
                                        "Won't run paid ads",
                                        "Quit after first failure",
                                        "Need constant hand-holding"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-gray-600">
                                            <X className="w-6 h-6 text-gray-700" />
                                            <span className="font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section >


            {/* ==================== WHY TRUST THIS COURSE ==================== */}
            < section className="relative py-24 px-6 border-t border-gray-900 overflow-hidden" >
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                        {/* Text Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerContainer}
                            className="flex-1"
                        >
                            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-1 bg-[#d4ff00]" />
                                <span className="text-[#d4ff00] font-bold tracking-wider uppercase text-sm">Trust</span>
                            </motion.div>
                            <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[0.9]">
                                NO LAMBOS.
                                <br />
                                <span className="text-gray-800">NO BULLSHIT.</span>
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-md">
                                We don't sell dreams. We teach you how to build a real, scalable business heavily focused on fundamentals.
                            </motion.p>
                        </motion.div>

                        {/* Guru Selfie Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, rotate: 6 }}
                            whileInView={{ opacity: 1, x: 0, rotate: 3 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative"
                        >
                            {/* Floating Animation Wrapper */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative z-10"
                            >
                                <div className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] shadow-2xl skew-y-0">
                                    <img
                                        src="/guru_selfie.png"
                                        alt="Guru Selfie"
                                        className="w-64 md:w-80 rounded-[1.5rem] shadow-inner grayscale-[30%] contrast-125 hover:grayscale-0 transition-all duration-500"
                                    />

                                    {/* Mock 'Live' Badge */}
                                    <div className="absolute top-6 right-6 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                        LIVE
                                    </div>

                                    {/* Mock 'Rich Life' Tag */}
                                    <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md text-white/90 text-xs font-medium px-3 py-1.5 rounded-lg border border-white/10">
                                        @guru_lifestyle 💸
                                    </div>
                                </div>
                            </motion.div>

                            {/* Decorative Elements around image */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#d4ff00]/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                        </motion.div>

                    </div>

                    <motion.div
                        className="grid sm:grid-cols-2 gap-1 mt-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        {[
                            {
                                icon: Shield,
                                title: "REAL EXPERIENCE",
                                desc: "Built from running actual stores. Wins and failures both documented."
                            },
                            {
                                icon: BookOpen,
                                title: "FULL TRANSPARENCY",
                                desc: "Real margins (15-30%). Real timelines (3-6 months). No hidden upsells."
                            },
                            {
                                icon: Globe,
                                title: "INDIA-SPECIFIC",
                                desc: "Every module addresses your unique challenges: LLC, payments, timezones."
                            },
                            {
                                icon: TrendingUp,
                                title: "REALISTIC ONLY",
                                desc: "No overnight riches. Just a valuable, practical skill you can build on."
                            }
                        ].map((item, i) => (
                            <motion.div key={i} variants={fadeInUp} className="p-8 bg-gray-950 border border-gray-900">
                                <item.icon className="w-8 h-8 text-[#d4ff00] mb-4" />
                                <h3 className="font-black mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section >

            {/* ==================== COURSE FORMAT ==================== */}
            < section className="py-24 px-6 bg-gray-950" >
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="text-center"
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black tracking-tight mb-16">
                            WHAT'S INCLUDED.
                        </motion.h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-1">
                            {[
                                { icon: PlayCircle, title: "20+ HOURS", desc: "Video lessons" },
                                { icon: BookOpen, title: "STEP-BY-STEP", desc: "Clear process" },
                                { icon: Globe, title: "INDIA FOCUS", desc: "Local solutions" },
                                { icon: Zap, title: "BUILD ALONG", desc: "Practical work" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-8 bg-black border border-gray-900 text-center"
                                >
                                    <item.icon className="w-12 h-12 text-[#d4ff00] mx-auto mb-4" />
                                    <h3 className="font-black mb-1">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section >

            {/* ==================== PRICE & CTA ==================== */}
            < section className="py-24 px-6 bg-[#d4ff00] text-black" >
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                            START NOW.
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-black/60 mb-10">
                            One-time payment. Lifetime access. All updates.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="mb-10">
                            <span className="text-7xl md:text-8xl font-black">₹5,900</span>
                            <span className="text-3xl text-black/40 ml-2 line-through">₹9,999</span>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <button className="group inline-flex items-center gap-4 px-12 py-6 bg-black text-white font-black text-xl hover:bg-gray-900 transition-colors">
                                ENROLL NOW
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </button>
                            <p className="text-sm text-black/50 mt-6">7-day money-back guarantee</p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-black/20">
                            {[
                                { value: "6+", label: "MODULES" },
                                { value: "20+", label: "HOURS" },
                                { value: "∞", label: "ACCESS" }
                            ].map((item, i) => (
                                <div key={i} className="text-center">
                                    <p className="text-4xl font-black">{item.value}</p>
                                    <p className="text-sm text-black/50 font-bold tracking-wider">{item.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section >

            {/* Footer */}
            < footer className="py-12 px-6 bg-black border-t border-gray-900" >
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-sm text-gray-700 font-bold tracking-wider">
                        © 2026 SKILINIA — BUILT FOR SERIOUS LEARNERS IN INDIA
                    </p>
                </div>
            </footer >
        </div >
    );
}

export default DropshippingV5;

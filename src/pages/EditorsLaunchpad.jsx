import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import VideoMediaCard from '../components/ui/VideoMediaCard';
import Badge from '../components/ui/Badge';
import PreQualificationQuiz from '../components/PreQualificationQuiz';
import CountdownBanner from '../components/ui/CountdownBanner';
import VisualSeatGrid from '../components/ui/VisualSeatGrid';
import ValueGrid from '../components/ui/ValueGrid';
import StyleShowcase from '../components/ui/StyleShowcase';
import PricingComparisonCard from '../components/ui/PricingComparisonCard';
import ScrollPlayhead from '../components/ui/ScrollPlayhead';
import KeyframeSection from '../components/ui/KeyframeSection';
import ExitIntentPopup from '../components/ui/ExitIntentPopup';
import FormAbandonPopup from '../components/ui/FormAbandonPopup';
import PostFormPopup from '../components/ui/PostFormPopup';
import SeatSecuredAnimation from '../components/ui/SeatSecuredAnimation';
import FloatingReservationTimer from '../components/ui/FloatingReservationTimer';
import LiveActivityNotifications from '../components/ui/LiveActivityNotifications';
import ScrollProgressBar from '../components/ui/ScrollProgressBar';


// PLACEHOLDERS - USER SHOULD REPLACE THESE
const WISTIA_VIDEO_ID = "fdjsk7omlt"; // User provided ID

// Safe Storage Helper
const safeStorage = {
    getItem: (key) => {
        if (typeof window === 'undefined') return null;
        try {
            return sessionStorage.getItem(key);
        } catch (e) {
            console.warn('SessionStorage access blocked:', e);
            return null;
        }
    },
    setItem: (key, value) => {
        if (typeof window === 'undefined') return;
        try {
            sessionStorage.setItem(key, value);
        } catch (e) {
            console.warn('SessionStorage write blocked:', e);
        }
    }
};

// Constants
const UNLOCK_THRESHOLD = 0.30; // Reduced from 50% to 30% for lead gen optimization

// Cohort Configuration (Dynamic based on current date)
const getCohortInfo = () => {
    const now = new Date();
    // Next cohort starts on the 15th of next month (or current month if before 15th)
    let cohortDate = new Date(now.getFullYear(), now.getMonth(), 15);
    if (now.getDate() >= 10) {
        cohortDate = new Date(now.getFullYear(), now.getMonth() + 1, 15);
    }

    const daysUntil = Math.ceil((cohortDate - now) / (1000 * 60 * 60 * 24));
    const cohortNumber = Math.floor((now.getFullYear() - 2025) * 12 + now.getMonth()) + 1;

    // Simulate spots (in real app, fetch from backend)
    const totalSpots = 20;
    const spotsTaken = Math.min(Math.floor(12 + (Math.random() * 4)), totalSpots - 3);
    const spotsLeft = totalSpots - spotsTaken;

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${monthNames[cohortDate.getMonth()]} ${cohortDate.getDate()}, ${cohortDate.getFullYear()}`;

    return {
        cohortNumber,
        daysUntil,
        spotsLeft,
        totalSpots,
        formattedDate,
        percentFilled: (spotsTaken / totalSpots) * 100
    };
};

// Analytics Event Tracking Helper
const trackEvent = (eventName, properties = {}) => {
    console.log(`[Analytics] ${eventName}`, properties);
    if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', eventName, properties);
    }
};

// FAQ Data
const FAQ_DATA = [
    {
        id: 'cost',
        question: "How much does the program cost?",
        answer: "We offer a flexible pricing structure designed to make it accessible for serious learners. Click 'Secure Your Spot' to see the current cohort offer and bonuses."
    },
    {
        id: 'beginner',
        question: "I'm a complete beginner. Is this for me?",
        answer: "Yes, if you've edited at least a few videos (even just for fun). We start from fundamentals, but you need to know the basics of your editing software. If you've never opened Premiere or DaVinci, start there first."
    },
    {
        id: 'guarantee',
        question: "What's your refund policy?",
        answer: "We offer a 7-day full refund guarantee. Complete Module 1, and if you're not satisfied, get 100% of your money back—no questions asked. We're that confident in our curriculum."
    },
    {
        id: 'time',
        question: "How much time do I need per week?",
        answer: "Plan for 8-12 hours weekly: 2-3 hours of lessons, 5-8 hours for projects and client outreach. The more time you invest, the faster you'll see results."
    },
    {
        id: 'refund',
        question: "Is there a refund policy?",
        answer: "Yes. Full refund within 7 days if you complete week 1 modules and decide it's not for you. No questions asked."
    },
    {
        id: 'software',
        question: "What software do I need?",
        answer: "Any NLE works: Premiere Pro, DaVinci Resolve (free version is fine), Final Cut Pro, or even CapCut. We teach principles and client acquisition, not which buttons to click."
    }
];

// Testimonials with more detail
const TESTIMONIALS = [
    {
        text: "Landed my first ₹15,000 client in 3 weeks. The outreach templates alone were worth the investment.",
        name: "Arjun B",
        city: "Kochi",
        before: "Complete beginner",
        avatar: "A",
        image: "/images/testimonials/new/test_1.jpg",
        result: "₹15K first client",
        timeframe: "3 weeks"
    },
    {
        text: "Clear projects, real workflows, no fluff. This is what YouTube tutorials can't teach you.",
        name: "Akash M V",
        city: "Calicut",
        before: "YouTube tutorial watcher",
        avatar: "A",
        image: "/images/testimonials/new/test_2.jpg",
        result: "3 retainer clients",
        timeframe: "6 weeks"
    },
    {
        text: "Went from zero experience to ₹40K/month in 8 weeks. Best decision I made this year.",
        name: "Sivajith",
        city: "Trivandrum",
        before: "College student",
        avatar: "S",
        image: "/images/testimonials/new/test_3.jpg",
        result: "₹40K/month",
        timeframe: "8 weeks"
    },
    {
        text: "Finally understood how to price and sell my work. Stopped undercharging overnight.",
        name: "Priya K",
        city: "Bangalore",
        before: "Hobbyist editor",
        avatar: "P",
        image: "/images/testimonials/new/test_4.jpg",
        result: "3x pricing increase",
        timeframe: "Week 2"
    },
    {
        text: "The client acquisition module changed everything. Now I have more leads than I can handle.",
        name: "Rahul M",
        city: "Mumbai",
        before: "Freelancer stuck at ₹5K/project",
        avatar: "R",
        image: "/images/testimonials/new/test_5.png",
        result: "₹25K/project avg",
        timeframe: "5 weeks"
    }
];

// FAQ Accordion Item Component
function FAQItem({ item, isOpen, onClick }) {
    return (
        <div className="border-b border-white/5 last:border-0">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <span className={`font-medium transition-colors ${isOpen ? 'text-emerald-400' : 'text-gray-300 group-hover:text-white'}`}>
                    {item.question}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-500 ml-4 flex-shrink-0"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-gray-400 text-sm leading-relaxed max-w-2xl">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function EditorsLaunchpad() {
    // States
    const [quizCompleted, setQuizCompleted] = useState(true);
    const [isQualified, setIsQualified] = useState(null);
    const [qualificationTier, setQualificationTier] = useState(null);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [videoProgress, setVideoProgress] = useState(0);
    const [showStickyCTA, setShowStickyCTA] = useState(false);
    const [stickyDismissed, setStickyDismissed] = useState(false);
    const [openFAQ, setOpenFAQ] = useState(null);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [cohortInfo, setCohortInfo] = useState(getCohortInfo());
    const [liveViewers, setLiveViewers] = useState(23);
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [showPostFormPopup, setShowPostFormPopup] = useState(false);
    const [showAbandonPopup, setShowAbandonPopup] = useState(false);
    const [showSeatAnimation, setShowSeatAnimation] = useState(false);
    const [tallyFormOpened, setTallyFormOpened] = useState(false);
    const [tallyFormSubmitted, setTallyFormSubmitted] = useState(false);
    const [userSeatSecured, setUserSeatSecured] = useState(false); // Track if user secured their spot

    // Computed spotsLeft that accounts for user's secured spot
    const effectiveSpotsLeft = userSeatSecured ? Math.max(cohortInfo.spotsLeft - 1, 1) : cohortInfo.spotsLeft;
    const effectiveTakenSpots = userSeatSecured ? (cohortInfo.totalSpots - cohortInfo.spotsLeft + 1) : (cohortInfo.totalSpots - cohortInfo.spotsLeft);


    const videoSectionRef = useRef(null);

    // Skip quiz for returning users
    useEffect(() => {
        const quizDone = safeStorage.getItem('skilinia_quiz_completed');
        if (quizDone === 'true') {
            setQuizCompleted(true);
            setIsQualified(true);
        }
    }, []);

    // Testimonial carousel - 7 seconds for better readability
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    // Countdown Timer until cohort starts
    useEffect(() => {
        const calculateTimeLeft = () => {
            const cohortDate = new Date(cohortInfo.formattedDate);
            const now = new Date();
            const difference = cohortDate - now;

            if (difference > 0) {
                return {
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }
            return { hours: 0, minutes: 0, seconds: 0 };
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [cohortInfo.formattedDate]);

    // Live viewers simulation for FOMO
    useEffect(() => {
        const interval = setInterval(() => {
            // Fluctuate between 18-32 viewers
            setLiveViewers(prev => {
                const change = Math.random() > 0.5 ? 1 : -1;
                const newCount = prev + change;
                return Math.max(18, Math.min(32, newCount));
            });
        }, 4000 + Math.random() * 3000); // Random interval 4-7 seconds

        return () => clearInterval(interval);
    }, []);

    // Sticky CTA visibility
    useEffect(() => {
        if (!quizCompleted) return;

        const handleScroll = () => {
            if (stickyDismissed) return;
            const videoSection = videoSectionRef.current;
            if (!videoSection) return;

            const rect = videoSection.getBoundingClientRect();
            const scrolledPastVideo = rect.bottom < window.innerHeight * 0.3;
            setShowStickyCTA(scrolledPastVideo);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [quizCompleted, stickyDismissed]);

    // Initialize Wistia
    useEffect(() => {
        if (!quizCompleted) return;

        window._wq = window._wq || [];

        // Tally Submission Tracking
        const handleTallySubmit = (e) => {
            const isTallySubmit =
                (typeof e.data === 'string' && e.data.includes('Tally.FormSubmitted')) ||
                (typeof e.data === 'object' && e.data?.event === 'Tally.FormSubmitted');

            if (isTallySubmit) {
                console.log("✅ Tally Form Submitted! Tracking 'Lead' event.");
                // Mark as submitted IMMEDIATELY to prevent abandon popup
                setTallyFormSubmitted(true);
                sessionStorage.setItem('tally_submitted', 'true');

                if (typeof window.fbq === 'function') {
                    window.fbq('track', 'Lead');
                }
                // Show post-form popup after small delay
                setTimeout(() => {
                    setShowPostFormPopup(true);
                }, 500);
            }
        };
        window.addEventListener('message', handleTallySubmit);

        const onWistiaReady = (video) => {
            video.bind("end", () => {
                setVideoProgress(1);
                setIsUnlocked(true);
            });

            video.bind("play", () => {
                trackEvent('video_play_start', { qualified_tier: qualificationTier });
            });

            let trackedMilestones = { 25: false, 50: false, 75: false, 100: false };

            video.bind("secondchange", (s) => {
                const duration = video.duration();
                if (!duration) return;

                const progress = s / duration;
                setVideoProgress(progress);

                const percent = Math.round(progress * 100);
                if (percent >= 25 && !trackedMilestones[25]) {
                    trackEvent('video_progress', { percent: 25 });
                    trackedMilestones[25] = true;
                }
                if (percent >= 50 && !trackedMilestones[50]) {
                    trackEvent('video_progress', { percent: 50 });
                    trackedMilestones[50] = true;
                }
                if (percent >= 75 && !trackedMilestones[75]) {
                    trackEvent('video_progress', { percent: 75 });
                    trackedMilestones[75] = true;
                }

                // Unlock at threshold
                if (progress >= UNLOCK_THRESHOLD && !isUnlocked) {
                    setIsUnlocked(true);
                    trackEvent('cta_unlocked', { percent: Math.round(progress * 100) });
                }
            });
        };

        window._wq.push({ id: WISTIA_VIDEO_ID, onReady: onWistiaReady });

        return () => {
            window.removeEventListener('message', handleTallySubmit);
        };
    }, [quizCompleted, isUnlocked, qualificationTier]);

    // Handlers
    const handleQuizComplete = (qualified, tier, answers) => {
        setIsQualified(qualified);
        setQualificationTier(tier);
        setQuizCompleted(true);
        safeStorage.setItem('skilinia_quiz_completed', 'true');
        safeStorage.setItem('skilinia_qualification_tier', tier);

        trackEvent('quiz_completed', { qualified, tier });

        // If qualified, also immediately unlock CTA for high-tier users
        if (tier === 'high') {
            setIsUnlocked(true);
        }
    };

    const scrollToVideo = () => {
        videoSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const handleApply = () => {
        trackEvent('cta_click', {
            video_percent_watched: Math.round(videoProgress * 100),
            qualification_tier: qualificationTier,
            source: 'main_cta'
        });

        if (typeof window.fbq === 'function') {
            window.fbq('track', 'InitiateCheckout');
        }

        // Show seat secured animation first!
        setShowSeatAnimation(true);
    };

    // Opens Tally form after animation completes
    const openTallyForm = () => {
        setShowSeatAnimation(false);
        setUserSeatSecured(true); // Mark user's spot as secured - updates all indicators

        if (typeof window.Tally !== 'undefined') {
            setTallyFormOpened(true);
            setTallyFormSubmitted(false);

            window.Tally.openPopup('1A4Z8p', {
                layout: 'modal',
                align: 'center',
                width: 700,
                hideTitle: true,
                overlay: true,
                autoClose: 0,
                onClose: () => {
                    // Only show abandon popup if form wasn't submitted
                    if (!tallyFormSubmitted && !sessionStorage.getItem('tally_submitted')) {
                        // Small delay to ensure submit event processed first
                        setTimeout(() => {
                            if (!sessionStorage.getItem('tally_submitted')) {
                                setShowAbandonPopup(true);
                                trackEvent('form_abandoned');
                            }
                        }, 300);
                    }
                    setTallyFormOpened(false);
                }
            });
        } else {
            window.location.href = "https://tally.so/r/1A4Z8p";
        }
    };

    const dismissStickyCTA = () => {
        setStickyDismissed(true);
        setShowStickyCTA(false);
    };

    // Pre-Qualification Screen
    if (!quizCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0a0a0a] to-black relative flex flex-col items-center justify-center py-12 px-4 font-sans selection:bg-[#d4ff00]/30 selection:text-black overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4ff00]/5 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Logo */}
                <div className="relative z-10 mb-8">
                    <img src="/logo.png" alt="Skilinia Logo" className="h-12 w-auto object-contain drop-shadow-lg" />
                </div>

                {/* Intro Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 relative z-10"
                >
                    <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">
                        Before we begin...
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
                        Answer 5 quick questions so we can personalize your experience
                    </p>
                </motion.div>

                {/* Quiz */}
                <PreQualificationQuiz onComplete={handleQuizComplete} />
            </div >
        );
    }

    // Main Landing Page (After Quiz)
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0a0a0a] to-black relative flex flex-col items-center pt-8 pb-32 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#d4ff00]/30 selection:text-black overflow-hidden">

            {/* COUNTDOWN BANNER - PINK GRADIENT */}
            <CountdownBanner
                targetDate={cohortInfo.formattedDate}
                spotsLeft={effectiveSpotsLeft}
            />

            {/* Cinematic Noise Overlay */}
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>

            {/* Timeline Scrubbing Playhead */}
            <ScrollPlayhead />

            {/* 0. Logo */}
            <div className="relative z-10 mb-4">
                <img src="/logo.png" alt="Skilinia Logo" className="h-14 w-auto object-contain drop-shadow-lg" />
            </div>

            {/* Qualification Badge */}
            {qualificationTier && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 mb-8"
                >
                    <Badge variant={qualificationTier === 'high' ? 'emerald' : qualificationTier === 'medium' ? 'warning' : 'neutral'}>
                        <span className="mr-2">
                            {qualificationTier === 'high' ? '⭐' : qualificationTier === 'medium' ? '👍' : '📚'}
                        </span>
                        {qualificationTier === 'high'
                            ? "You're an excellent fit"
                            : qualificationTier === 'medium'
                                ? "You could be a good fit"
                                : "Consider building basics first"}
                    </Badge>
                </motion.div>
            )}

            {/* 1. Hero Section */}
            <div className="relative z-10 text-center w-full max-w-4xl mx-auto mb-16 space-y-10">
                {/* Main Headline - HIGH CONVERSION STYLE */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] uppercase"
                >
                    MASTER THE{' '}
                    <br />
                    <span className="font-serif-display italic text-white normal-case text-5xl sm:text-7xl md:text-8xl font-light">
                        Viral Editing Styles
                    </span>
                    <br />
                    {/* BACKUP: Realistic Marker Circle Implementation
                    <span className="relative inline-block px-4 py-1.5 mt-2 transform -rotate-2">
                        <svg className="absolute inset-0 w-full h-full text-[#d4ff00] z-0 pointer-events-none" viewBox="0 0 380 90" preserveAspectRatio="none">
                            <defs>
                                <filter id="marker-roughness">
                                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
                                </filter>
                            </defs>

                            <path
                                d="M20,35 Q180,5 360,25 C390,35 385,55 350,75 C290,100 90,95 30,75 C5,60 5,35 40,25 C140,10 300,15 340,35"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                filter="url(#marker-roughness)"
                                className="opacity-90"
                            />
                        </svg>

                        <span className="relative z-10 font-marker text-2xl md:text-3xl normal-case font-bold text-white drop-shadow-md">
                            brands and creators pay lakhs for
                        </span>
                    </span>
                    */}
                    <span className="text-xl md:text-2xl text-[#d4ff00] normal-case font-medium">
                        brands and creators pay lakhs for
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-gray-400 text-lg sm:text-xl max-w-xl mx-auto font-light leading-relaxed"
                >
                    The editing skills that get you hired—and paid premium rates.
                </motion.p>


            </div>

            {/* 2. Media Card (Video) - Immediately After Hero */}
            <motion.div
                ref={videoSectionRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full max-w-5xl relative z-10 mt-8 px-2 sm:px-0"
            >
                <VideoMediaCard videoId={WISTIA_VIDEO_ID} className="shadow-2xl shadow-emerald-900/10" />

                {/* Single CTA below video */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-6 text-center"
                >
                    <Button
                        onClick={handleApply}
                        variant="premium"
                        className="text-sm sm:text-lg font-extrabold px-6 sm:px-10 py-3 uppercase tracking-wide"
                        showViewers={true}
                        viewerCount={cohortInfo.viewerCount || 23}
                    >
                        <span className="hidden sm:inline">🔒 Secure Your Spot ({effectiveSpotsLeft} Left)</span>
                        <span className="sm:hidden">🔒 Secure Spot →</span>
                    </Button>
                    <p className="text-gray-500 text-xs mt-3">{effectiveSpotsLeft} spots left • Cohort starts {cohortInfo.formattedDate}</p>
                </motion.div>

                {/* Status Hub - Moved Below CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="w-full max-w-sm mx-auto mt-8 bg-white/[0.03] border border-white/10 rounded-2xl p-4 backdrop-blur-md shadow-2xl space-y-4"
                >
                    {/* Top Row: Live Context */}
                    <div className="flex items-center justify-between text-xs font-medium text-gray-400 px-1">
                        <div className="flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span>{liveViewers} people viewing</span>
                        </div>
                        <span className="text-red-400 animate-pulse font-semibold">{effectiveSpotsLeft} spots left</span>
                    </div>

                    {/* Middle: Visual Scarcity (The Dots) */}
                    <div className="py-1">
                        <VisualSeatGrid
                            totalSeats={cohortInfo.totalSpots}
                            takenSeats={effectiveTakenSpots}
                            className="mx-auto"
                        />
                    </div>

                    {/* Bottom: Pricing Only (Timer moved to top banner) */}
                    <div className="border-t border-white/5 pt-3 flex flex-col items-center gap-2 px-1">
                        <div className="flex items-baseline gap-3">
                            <span className="text-xl font-bold text-white tracking-wide">LIMITED COHORT OFFER</span>
                        </div>
                        {/* Bonus Value Badge */}
                        <div className="flex items-center gap-1.5 text-xs">
                            <span className="text-[#d4ff00]">🎁</span>
                            <span className="text-gray-400">+ Bonus Pack worth</span>
                            <span className="text-[#d4ff00] font-bold">₹18,000+</span>
                            <span className="text-gray-500">FREE</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* 4. Proof Strip - Simplified & Vertical on Mobile */}
            <KeyframeSection variant="scale" className="relative z-10 w-full max-w-4xl mb-24 sm:mb-32">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 border-y border-white/5 py-10 divide-y sm:divide-y-0 sm:divide-x divide-white/5 bg-white/[0.02]">
                    <div className="text-center py-2">
                        <p className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight">127+</p>
                        <p className="text-sm text-gray-500 font-medium mt-1">Editors Placed</p>
                    </div>
                    <div className="text-center py-2">
                        <p className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight">₹15L+</p>
                        <p className="text-sm text-gray-500 font-medium mt-1">Student Earnings</p>
                    </div>
                    <div className="text-center py-2">
                        <p className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight">6 wks</p>
                        <p className="text-sm text-gray-500 font-medium mt-1">Avg. Time to Client</p>
                    </div>
                </div>
            </KeyframeSection>

            {/* NEW: Style Showcase Section - Visual Previews */}
            <KeyframeSection variant="slide" className="relative z-10 w-full max-w-6xl mx-auto mb-24 sm:mb-32 px-4">
                <StyleShowcase />
            </KeyframeSection>

            {/* NEW: "What Do You Get" Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-5xl mx-auto mb-24 sm:mb-32 px-4"
            >
                <div className="text-center mb-12">
                    <Badge variant="discount" className="mb-4 text-sm">MAXIMUM VALUE</Badge>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight uppercase mb-4">
                        TRENDING STYLES{' '}
                        <span className="bg-gradient-to-r from-[#d4ff00] to-[#c3ff00] text-transparent bg-clip-text">YOU'LL MASTER</span>
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Master the editing techniques brands and creators pay lakhs for
                    </p>
                </div>

                <ValueGrid />
            </motion.div>

            {/* NEW: Comparison Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-4xl mx-auto mb-24 sm:mb-32 px-4"
            >
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight uppercase mb-4">
                        SELF-TAUGHT VS{' '}
                        <span className="bg-gradient-to-r from-[#d4ff00] to-[#c3ff00] text-transparent bg-clip-text">LAUNCHPAD</span>
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Why structured training beats YouTube tutorials
                    </p>
                </div>

                <PricingComparisonCard />

                {/* CTA After Comparison */}
                <div className="text-center mt-12">
                    <Button
                        onClick={handleApply}
                        variant="primary"
                        className="text-lg font-extrabold px-12 py-5 uppercase"
                    >
                        🔒 SECURE MY SPOT
                    </Button>
                    <p className="text-gray-500 text-xs mt-3">{effectiveSpotsLeft}/{cohortInfo.totalSpots} spots left • Cohort starts {cohortInfo.formattedDate}</p>
                </div>
            </motion.div>

            {/* 5. Main CTA Section */}
            <div className="relative z-10 mt-10 text-center">
                {isUnlocked || qualificationTier === 'high' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <p className="text-emerald-400 text-sm font-medium">✓ You're ready to apply</p>
                        <Button
                            onClick={handleApply}
                            variant="primary"
                            className="px-12 py-5 text-lg font-bold shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transform hover:-translate-y-1"
                        >
                            Apply for Your Spot →
                        </Button>
                        <p className="text-gray-500 text-xs">Takes 2 minutes • {effectiveSpotsLeft} spots left</p>
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        <Button
                            disabled
                            variant="secondary"
                            className="px-12 py-5 text-gray-400 cursor-not-allowed border-dashed"
                        >
                            <span className="opacity-60 mr-2">○</span> Watch 2 more minutes to apply...
                        </Button>
                        <p className="text-gray-600 text-xs">Application unlocks at 30% ({Math.round(videoProgress * 100)}% watched)</p>
                    </div>
                )}
            </div>

            {/* 5.5 Who This Is For Section - Premium Redesign */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative z-10 mt-16 w-full max-w-4xl mx-auto px-4"
            >
                <h2 className="text-center text-2xl md:text-3xl font-display font-bold text-white mb-8 tracking-tight">
                    Is This Right For You?
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* This Is For You - Yellow Accent */}
                    <Card className="p-8 bg-[#0f0f0f] border-[#d4ff00]/20 hover:border-[#d4ff00]/40 transition-all group">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-[#d4ff00]/10 border border-[#d4ff00]/30 flex items-center justify-center group-hover:bg-[#d4ff00]/20 transition-all">
                                <svg className="w-5 h-5 text-[#d4ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-white font-bold text-lg">
                                This is for you if:
                            </p>
                        </div>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3 group/item">
                                <span className="text-[#d4ff00] mt-0.5 font-bold">→</span>
                                <span className="group-hover/item:text-gray-300 transition-colors">You want to learn VIRAL editing techniques (not just basics)</span>
                            </li>
                            <li className="flex items-start gap-3 group/item">
                                <span className="text-[#d4ff00] mt-0.5 font-bold">→</span>
                                <span className="group-hover/item:text-gray-300 transition-colors">You want to master trending styles brands pay lakhs for</span>
                            </li>
                            <li className="flex items-start gap-3 group/item">
                                <span className="text-[#d4ff00] mt-0.5 font-bold">→</span>
                                <span className="group-hover/item:text-gray-300 transition-colors">You can commit 10 hrs/week to learn premium techniques</span>
                            </li>
                        </ul>
                    </Card>

                    {/* This Is NOT For You - Minimal Dark */}
                    <Card className="p-8 bg-[#0a0a0a] border-white/5 hover:border-white/10 transition-all group">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <p className="text-gray-400 font-bold text-lg">
                                This is NOT for you if:
                            </p>
                        </div>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="flex items-start gap-3 group/item">
                                <span className="text-gray-600 mt-0.5 font-bold">×</span>
                                <span className="group-hover/item:text-gray-400 transition-colors">You just want basic cut tutorials</span>
                            </li>
                            <li className="flex items-start gap-3 group/item">
                                <span className="text-gray-600 mt-0.5 font-bold">×</span>
                                <span className="group-hover/item:text-gray-400 transition-colors">You're not interested in trending techniques</span>
                            </li>
                            <li className="flex items-start gap-3 group/item">
                                <span className="text-gray-600 mt-0.5 font-bold">×</span>
                                <span className="group-hover/item:text-gray-400 transition-colors">You want to stick to 2015 editing styles</span>
                            </li>
                        </ul>
                    </Card>
                </div>
            </motion.div>

            {/* INSTRUCTOR SECTION REMOVED */}

            {/* 6.5 CURRICULUM PREVIEW - Bento Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative z-10 mt-32 w-full max-w-5xl mx-auto px-4"
            >
                <div className="text-center mb-12">
                    <Badge variant="neutral" className="mb-4">The Process</Badge>
                    <h2 className="text-3xl md:text-4xl font-display font-semibold text-white tracking-tight mb-4">
                        The 6-Week System
                    </h2>
                    <p className="text-center text-gray-400 max-w-xl mx-auto font-light">
                        From editing skills to paying clients — here's the roadmap
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Week 1-2 */}
                    <Card className="p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start hover:bg-white/[0.02] transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center text-white font-mono text-sm group-hover:bg-[#d4ff00]/10 group-hover:text-[#d4ff00] transition-colors">01</div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-1 tracking-tight">Foundations & Portfolio</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">Build a client-ready portfolio with real projects. Master the editing workflows pros actually use.</p>
                        </div>
                    </Card>

                    {/* Week 3-4 */}
                    <Card className="p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start hover:bg-white/[0.02] transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center text-white font-mono text-sm group-hover:bg-[#d4ff00]/10 group-hover:text-[#d4ff00] transition-colors">02</div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-1 tracking-tight">Client Acquisition</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">Learn outreach that works. Get templates, scripts, and strategies to land your first paying client.</p>
                        </div>
                    </Card>

                    {/* Week 5-6 */}
                    <Card className="p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start hover:bg-white/[0.02] transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center text-white font-mono text-sm group-hover:bg-[#d4ff00]/10 group-hover:text-[#d4ff00] transition-colors">03</div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-1 tracking-tight">Pricing & Scaling</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">Price confidently, negotiate well, and build retainer relationships for predictable income.</p>
                        </div>
                    </Card>
                </div>

                {/* What's Included */}
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400 font-medium">
                    <span className="flex items-center gap-2"><span className="text-[#d4ff00]">✓</span> Lifetime access</span>
                    <span className="flex items-center gap-2"><span className="text-[#d4ff00]">✓</span> Portfolio reviews</span>
                    <span className="flex items-center gap-2"><span className="text-[#d4ff00]">✓</span> Community support</span>
                    <span className="flex items-center gap-2"><span className="text-[#d4ff00]">✓</span> Outreach templates</span>
                </div>
            </motion.div>

            {/* 7. Testimonials - Horizontal Scroll */}
            <div className="relative z-10 mt-32 w-full max-w-7xl mx-auto px-4 overflow-hidden">
                <div className="text-center mb-12">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">
                        Student Results
                    </p>
                    <h2 className="text-3xl font-display font-semibold text-white tracking-tight">
                        {TESTIMONIALS.length} Success Stories
                    </h2>
                </div>

                <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar px-4">
                    {TESTIMONIALS.map((testimonial, i) => (
                        <Card key={i} className="min-w-[300px] md:min-w-[350px] p-6 snap-center bg-[#111] border-white/5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden">
                                    {testimonial.image ? (
                                        <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white bg-emerald-900">{testimonial.avatar}</div>
                                    )}
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">{testimonial.name}</p>
                                    <p className="text-xs text-gray-500">{testimonial.city}</p>
                                </div>
                            </div>

                            {testimonial.result && (
                                <div className="mb-3">
                                    <Badge variant="emerald">{testimonial.result}</Badge>
                                </div>
                            )}

                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                "{testimonial.text}"
                            </p>

                            <p className="text-xs text-gray-600 mt-auto">
                                Was: {testimonial.before} • {testimonial.timeframe}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* CTA After Testimonials */}
            <div className="relative z-10 mt-12 text-center">
                <Button
                    onClick={handleApply}
                    variant="primary"
                    className="px-12 py-5 text-lg font-bold"
                >
                    Apply for Your Spot →
                </Button>
                <p className="text-gray-500 text-xs mt-3">{effectiveSpotsLeft} spots left • Closing {cohortInfo.formattedDate}</p>
            </div>

            {/* What Happens Next Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 mt-24 w-full max-w-3xl mx-auto px-4"
            >
                <div className="text-center mb-10">
                    <Badge variant="neutral" className="mb-4">Enrollment Process</Badge>
                    <h2 className="text-2xl md:text-3xl font-display font-semibold text-white tracking-tight">
                        What Happens After You Apply?
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="p-6 text-center bg-[#111] border-white/5">
                        <div className="w-12 h-12 rounded-full bg-[#d4ff00]/10 border border-[#d4ff00]/30 flex items-center justify-center text-[#d4ff00] font-bold text-xl mx-auto mb-4">
                            1
                        </div>
                        <h3 className="text-white font-semibold mb-2">Fill Application</h3>
                        <p className="text-gray-400 text-sm">Quick 2-minute form with your details and goals</p>
                    </Card>

                    <Card className="p-6 text-center bg-[#111] border-white/5">
                        <div className="w-12 h-12 rounded-full bg-[#d4ff00]/10 border border-[#d4ff00]/30 flex items-center justify-center text-[#d4ff00] font-bold text-xl mx-auto mb-4">
                            2
                        </div>
                        <h3 className="text-white font-semibold mb-2">Get a Call</h3>
                        <p className="text-gray-400 text-sm">Our team calls you within 24 hours to discuss fit</p>
                    </Card>

                    <Card className="p-6 text-center bg-[#111] border-white/5">
                        <div className="w-12 h-12 rounded-full bg-[#d4ff00]/10 border border-[#d4ff00]/30 flex items-center justify-center text-[#d4ff00] font-bold text-xl mx-auto mb-4">
                            3
                        </div>
                        <h3 className="text-white font-semibold mb-2">Secure Your Spot</h3>
                        <p className="text-gray-400 text-sm">Secure your spot and join {cohortInfo.formattedDate} cohort</p>
                    </Card>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                        <span className="text-[#d4ff00]">✓</span> 7-Day Money-Back Guarantee
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="text-[#d4ff00]">✓</span> Lifetime Access
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="text-[#d4ff00]">✓</span> Payment Plans Available
                    </span>
                </div>
            </motion.div>

            {/* 8. FAQ Section */}
            <div className="relative z-10 mt-20 w-full max-w-2xl mx-auto px-4">
                <h2 className="text-center text-2xl font-display font-bold text-white mb-2">
                    Questions? We've got answers.
                </h2>
                <p className="text-center text-gray-400 text-sm mb-10 font-light">
                    Everything you need to know before applying
                </p>

                <Card className="px-2 md:px-6">
                    {FAQ_DATA.map((item) => (
                        <FAQItem
                            key={item.id}
                            item={item}
                            isOpen={openFAQ === item.id}
                            onClick={() => setOpenFAQ(openFAQ === item.id ? null : item.id)}
                        />
                    ))}
                </Card>

                {/* CTA After FAQ */}
                <div className="mt-12 text-center">
                    <Button
                        onClick={handleApply}
                        variant="primary"
                        className="px-12 py-5 text-lg font-bold"
                    >
                        Apply for Your Spot →
                    </Button>
                    <p className="text-gray-400 text-xs mt-3">All your questions answered? Let's get started.</p>
                </div>
            </div>

            {/* 9. Final CTA */}
            <div className="relative z-10 mt-32 text-center pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="space-y-2">
                        <p className="text-[#d4ff00] text-sm font-medium uppercase tracking-wider">Last Chance</p>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                            Ready to Land Your First Client?
                        </h2>
                        <p className="text-gray-400 max-w-lg mx-auto">
                            Join 127+ students who turned their editing skills into a career
                        </p>
                    </div>

                    <Button
                        onClick={handleApply}
                        variant="premium"
                        className="px-8 sm:px-12 py-3 text-sm sm:text-lg font-extrabold uppercase"
                    >
                        🔒 SECURE YOUR SPOT — {effectiveSpotsLeft} LEFT
                    </Button>

                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                        <span>⏰ Cohort starts {cohortInfo.formattedDate}</span>
                        <span>•</span>
                        <span>💰 7-Day Money-Back Guarantee</span>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 mt-16 text-center text-gray-600 text-[10px] uppercase tracking-[0.2em] pb-10">
                <p>© {new Date().getFullYear()} Skilinia. Elite Video Editing.</p>
            </footer>

            {/* Sticky Mobile CTA */}
            <AnimatePresence>
                {showStickyCTA && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-0 left-0 right-0 z-50 bg-[#050505]/95 backdrop-blur-xl border-t border-[#d4ff00]/30 safe-area-pb shadow-[0_-10px_40px_rgba(212,255,0,0.15)]"
                    >
                        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-3">
                            <div className="hidden sm:block flex-1">
                                <p className="text-white text-sm font-semibold">Early Bird Spot</p>
                                <p className="text-[#d4ff00] text-xs font-bold">{effectiveSpotsLeft}/{cohortInfo.totalSpots} spots left • {cohortInfo.daysUntil} days</p>
                            </div>
                            <Button
                                onClick={handleApply}
                                variant="primary"
                                className="flex-1 sm:flex-none px-6 py-3 text-sm font-bold"
                            >
                                Apply Now →
                            </Button>

                            <button
                                onClick={dismissStickyCTA}
                                className="p-2 text-gray-500 hover:text-white transition-colors"
                                aria-label="Dismiss"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Form Abandon Popup - triggers when user closes form without submitting */}
            <FormAbandonPopup
                isVisible={showAbandonPopup}
                onClose={() => setShowAbandonPopup(false)}
                onApply={openTallyForm}
                spotsLeft={effectiveSpotsLeft}
            />

            {/* Seat Secured Animation - plays before form opens */}
            <SeatSecuredAnimation
                isVisible={showSeatAnimation}
                onComplete={openTallyForm}
                spotsLeft={effectiveSpotsLeft}
                totalSpots={cohortInfo.totalSpots}
            />

            {/* Post-Form Confirmation Popup */}
            <PostFormPopup
                isVisible={showPostFormPopup}
                onClose={() => setShowPostFormPopup(false)}
                cohortDate={cohortInfo.formattedDate}
            />

            {/* Floating Timer - shows above Tally form */}
            <FloatingReservationTimer
                isVisible={tallyFormOpened}
                seatNumber={effectiveTakenSpots}
                initialMinutes={10}
            />

            {/* Scroll Progress Bar at top of page */}
            <ScrollProgressBar />

            {/* Live Activity Notifications - social proof toasts */}
            <LiveActivityNotifications isEnabled={!showSeatAnimation && !tallyFormOpened} />
        </div >
    );
}

export default EditorsLaunchpad;

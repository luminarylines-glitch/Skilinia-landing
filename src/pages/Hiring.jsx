import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Tally Form ID for BDE Application — REPLACE with your actual Tally form ID
const TALLY_FORM_ID = 'PdAV7P';

const RESPONSIBILITIES = [
    'Identify and acquire new clients for international dropshipping services',
    'Build and maintain strong relationships with global e-commerce brands',
    'Develop and execute outbound sales strategies across international markets',
    'Conduct market research to identify emerging dropshipping opportunities',
    'Negotiate contracts and close deals with international partners',
    'Collaborate with the operations team to ensure seamless client onboarding',
    'Track KPIs and present regular sales performance reports',
];

const REQUIREMENTS = [
    'Proven experience in B2B sales or business development (1-3 years preferred)',
    'Strong understanding of e-commerce, dropshipping, or international trade',
    'Excellent communication and negotiation skills in English',
    'Self-motivated with a hunter mentality — you love chasing targets',
    'Comfortable working in a fast-paced, startup environment',
    'Experience with CRM tools (HubSpot, Salesforce, or similar)',
    'Bonus: Existing network in e-commerce or logistics industry',
];

const PERKS = [
    {
        icon: '🚀',
        title: 'Rapid Growth',
        description: 'Be part of a high-growth startup scaling international operations. Clear path to leadership roles.',
    },
    {
        icon: '🌍',
        title: 'Global Exposure',
        description: 'Work with international clients and markets. Build a truly global professional network.',
    },
    {
        icon: '💰',
        title: 'Competitive Pay',
        description: 'Attractive base + uncapped commissions. Top performers earn significantly above market.',
    },
];

function Hiring() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [tallyFormSubmitted, setTallyFormSubmitted] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initialize Hiring Meta Pixel
        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
            window.fbq('init', '1421156615660541');
            window.fbq('trackSingle', '1421156615660541', 'PageView');
        }

        // Tally Submission Tracking for Hiring Form
        const handleTallySubmit = (e) => {
            const isTallySubmit =
                (typeof e.data === 'string' && e.data.includes('Tally.FormSubmitted')) ||
                (typeof e.data === 'object' && e.data?.event === 'Tally.FormSubmitted');

            if (isTallySubmit) {
                console.log("✅ Hiring Tally Form Submitted! Tracking 'Lead' event.");
                setTallyFormSubmitted(true);

                // Fire Lead event to the specific Hiring Pixel
                if (typeof window.fbq === 'function') {
                    window.fbq('trackSingle', '1421156615660541', 'Lead');
                }
            }
        };

        window.addEventListener('message', handleTallySubmit);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('message', handleTallySubmit);
        };
    }, []);

    const openTallyForm = () => {
        if (typeof window.Tally !== 'undefined') {
            window.Tally.openPopup(TALLY_FORM_ID, {
                layout: 'modal',
                align: 'center',
                width: 700,
                hideTitle: true,
                overlay: true,
                autoClose: 3000,
                onClose: () => {
                    console.log('Tally hiring form closed');
                },
            });
        } else {
            window.location.href = `https://tally.so/r/${TALLY_FORM_ID}`;
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (i = 0) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
        }),
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0a0a0a] to-black text-white font-sans selection:bg-[#d4ff00]/30 selection:text-black overflow-hidden">

            {/* ── Navbar ─────────────────────────────────────── */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src="/logo.png" alt="Skilinia" className="h-8 sm:h-10 w-auto object-contain" />
                    </Link>
                    <Link
                        to="/"
                        className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </nav>

            {/* ── Hero Section ───────────────────────────────── */}
            <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 px-4 sm:px-6">
                {/* Background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#d4ff00]/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-4xl mx-auto text-center">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4ff00]/10 border border-[#d4ff00]/20 text-[#d4ff00] text-xs font-semibold uppercase tracking-wider mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse" />
                            Now Hiring
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mt-6"
                    >
                        Join the{' '}
                        <span className="font-serif-display italic font-light text-5xl sm:text-7xl md:text-8xl">
                            Skilinia
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-[#d4ff00] to-[#a8e600] text-transparent bg-clip-text">
                            Team
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        className="mt-6 text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Help us build the future of international dropshipping. We're looking for driven individuals ready to make an impact.
                    </motion.p>
                </div>
            </section>

            {/* ── Job Listing ────────────────────────────────── */}
            <section className="px-4 sm:px-6 pb-20 sm:pb-28">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0}
                    className="max-w-4xl mx-auto"
                >
                    {/* Role header card */}
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
                        {/* Top accent strip */}
                        <div className="h-1 bg-gradient-to-r from-[#d4ff00] via-[#c3ff00] to-[#d4ff00]/40" />

                        <div className="p-6 sm:p-10">
                            {/* Title & meta */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                                        Business Development Executive
                                    </h2>
                                    <p className="text-[#d4ff00] font-medium mt-1">International Dropshipping</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 font-medium">
                                        Full-time
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 font-medium">
                                        Remote / Hybrid
                                    </span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-white/5 mb-8" />

                            {/* Responsibilities */}
                            <div className="mb-10">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-5">
                                    Key Responsibilities
                                </h3>
                                <ul className="space-y-3.5">
                                    {RESPONSIBILITIES.map((item, i) => (
                                        <motion.li
                                            key={i}
                                            variants={fadeUp}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                            custom={i * 0.5}
                                            className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed group"
                                        >
                                            <span className="text-[#d4ff00] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                            <span className="group-hover:text-white transition-colors">{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            {/* Requirements */}
                            <div className="mb-10">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-5">
                                    Requirements
                                </h3>
                                <ul className="space-y-3.5">
                                    {REQUIREMENTS.map((item, i) => (
                                        <motion.li
                                            key={i}
                                            variants={fadeUp}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                            custom={i * 0.5}
                                            className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed group"
                                        >
                                            <span className="text-[#d4ff00] mt-0.5 font-bold flex-shrink-0">→</span>
                                            <span className="group-hover:text-white transition-colors">{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            {/* Apply CTA */}
                            <div className="text-center sm:text-left">
                                <motion.button
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={openTallyForm}
                                    className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#d4ff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-lg hover:bg-[#e0ff33] transition-colors shadow-lg shadow-[#d4ff00]/20 hover:shadow-[#d4ff00]/30"
                                >
                                    Apply Now
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </motion.button>
                                <p className="text-gray-500 text-xs mt-3">Quick application • We'll get back within 48 hours</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ── Why Skilinia? ──────────────────────────────── */}
            <section className="px-4 sm:px-6 pb-20 sm:pb-28">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                            Why{' '}
                            <span className="bg-gradient-to-r from-[#d4ff00] to-[#a8e600] text-transparent bg-clip-text">
                                Skilinia?
                            </span>
                        </h2>
                        <p className="text-gray-500 text-sm mt-3">More than just a job — it's a launchpad</p>
                    </motion.div>

                    <div className="grid sm:grid-cols-3 gap-5">
                        {PERKS.map((perk, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={i}
                                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-7 hover:border-[#d4ff00]/20 hover:bg-white/[0.03] transition-all duration-300"
                            >
                                <span className="text-3xl block mb-4 group-hover:scale-110 transition-transform origin-left">{perk.icon}</span>
                                <h3 className="text-white font-bold text-lg mb-2 tracking-tight">{perk.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{perk.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Bottom CTA ─────────────────────────────────── */}
            <section className="px-4 sm:px-6 pb-20 sm:pb-28">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0}
                    className="max-w-3xl mx-auto text-center"
                >
                    <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-8 sm:p-12">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                            Ready to make an impact?
                        </h2>
                        <p className="text-gray-400 text-sm mb-8 max-w-lg mx-auto">
                            We're building something big in international dropshipping. If you're hungry, hustling, and hate the status quo — we want to hear from you.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={openTallyForm}
                            className="inline-flex items-center gap-2.5 px-10 py-4 bg-[#d4ff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-lg hover:bg-[#e0ff33] transition-colors shadow-lg shadow-[#d4ff00]/20 hover:shadow-[#d4ff00]/30"
                        >
                            Apply for BDE Role
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* ── Footer ─────────────────────────────────────── */}
            <footer className="border-t border-white/5 py-8 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
                    <p>© {new Date().getFullYear()} Skilinia. All rights reserved.</p>
                    <Link to="/" className="hover:text-gray-400 transition-colors">
                        skilinia.com
                    </Link>
                </div>
            </footer>
        </div>
    );
}

export default Hiring;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, X, Globe, CreditCard, Package, TrendingUp, ShoppingCart, Zap, PlayCircle, BookOpen, Users, Shield, ChevronDown, Building2, Truck, BarChart3, Sparkles } from 'lucide-react';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const glowPulse = {
    animate: {
        boxShadow: [
            "0 0 20px rgba(168, 85, 247, 0.3)",
            "0 0 40px rgba(168, 85, 247, 0.5)",
            "0 0 20px rgba(168, 85, 247, 0.3)"
        ],
        transition: { duration: 2, repeat: Infinity }
    }
};

// ============================================
// DESIGN 4: GLASSMORPHISM MODERN
// Frosted glass effects, purple-pink gradients, premium feel
// ============================================

function DropshippingV4() {
    const [showStickyNav, setShowStickyNav] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowStickyNav(window.scrollY > 600);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToPricing = () => {
        document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen text-white font-sans antialiased overflow-hidden" style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #1E1B4B 100%)' }}>
            {/* Animated gradient orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* ==================== HERO SECTION ==================== */}
            <section className="relative min-h-screen flex items-center justify-center px-6 py-24">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    {/* Glass Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-10"
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                    >
                        <Sparkles className="w-4 h-4 text-purple-300" />
                        <span className="text-sm font-medium text-purple-200">For Indian Entrepreneurs</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                    >
                        Master International
                        <span
                            className="block mt-2 bg-clip-text text-transparent"
                            style={{ backgroundImage: 'linear-gradient(135deg, #A855F7, #EC4899, #F97316)' }}
                        >
                            Dropshipping
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl md:text-2xl text-purple-200/80 max-w-2xl mx-auto mb-8 leading-relaxed"
                    >
                        The complete system for Indians to build profitable online stores
                        selling to US and European customers.
                    </motion.p>

                    {/* Differentiators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-6 mb-12"
                    >
                        {[
                            'No Amazon India hustling',
                            'No fake income proof',
                            'No get-rich-quick BS'
                        ].map((text, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-purple-300/70"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}
                            >
                                <X className="w-4 h-4 text-pink-400/70" />
                                <span className="text-sm">{text}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="group inline-flex items-center gap-3 px-10 py-5 font-semibold rounded-2xl transition-all duration-300"
                        style={{
                            background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                            boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)'
                        }}
                    >
                        See If This Is For You
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </div>
            </section>

            {/* ==================== THE PROBLEM SECTION ==================== */}
            <section className="py-24 px-6 relative">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.p variants={fadeInUp} className="text-pink-400 text-sm font-semibold tracking-wider uppercase mb-4 text-center">
                            The Reality
                        </motion.p>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center mb-16">
                            Why Most Indian Dropshippers Struggle
                        </motion.h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: BookOpen,
                                    title: "Generic, Outdated Advice",
                                    desc: "YouTube tutorials ignore India-specific challenges: GST, payment gateways, entity formation. You're left figuring things out alone."
                                },
                                {
                                    icon: ShoppingCart,
                                    title: "Domestic Platform Trap",
                                    desc: "Amazon India, Flipkart, Meesho all have 2-5% margins after fees. There's no real business to build — just a race to the bottom."
                                },
                                {
                                    icon: CreditCard,
                                    title: "Payment Gateway Block",
                                    desc: "Stripe doesn't accept Indian businesses directly. PayPal has limitations. This single issue stops 90% of aspiring sellers."
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Ad Spend Burnout",
                                    desc: "Without a proper testing framework, most beginners waste ₹50k-1L on Facebook ads before realizing their approach is wrong."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-8 rounded-3xl transition-all duration-300 hover:translate-y-[-4px]"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}
                                >
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                                        style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.2))' }}
                                    >
                                        <item.icon className="w-7 h-7 text-pink-300" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                    <p className="text-purple-200/60 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== THE SOLUTION SECTION ==================== */}
            <section className="py-24 px-6 relative">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.p variants={fadeInUp} className="text-purple-400 text-sm font-semibold tracking-wider uppercase mb-4 text-center">
                            The Solution
                        </motion.p>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center mb-4">
                            A Complete System Built for India
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-xl text-purple-200/70 text-center max-w-2xl mx-auto mb-16">
                            Not motivation. Not vague advice. A practical framework that addresses
                            every challenge you'll face selling internationally.
                        </motion.p>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {[
                                { icon: Building2, title: "US LLC Formation", desc: "Wyoming LLC setup for legal international operations" },
                                { icon: CreditCard, title: "Stripe Access", desc: "Accept payments from customers in 135+ countries" },
                                { icon: ShoppingCart, title: "Store Creation", desc: "Build a professional Shopify store that converts" },
                                { icon: BarChart3, title: "Product Research", desc: "Data-driven methods to find winning products" },
                                { icon: Zap, title: "Ad Strategy", desc: "Structured testing for Facebook and TikTok" },
                                { icon: Truck, title: "Fulfillment", desc: "Reliable global shipping without complaints" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-6 rounded-2xl transition-all duration-300 group hover:translate-y-[-2px]"
                                    style={{
                                        background: 'rgba(168, 85, 247, 0.1)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(168, 85, 247, 0.2)'
                                    }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                                        style={{ background: 'linear-gradient(135deg, #A855F7, #EC4899)' }}
                                    >
                                        <item.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold mb-2">{item.title}</h3>
                                    <p className="text-sm text-purple-200/50">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== MODULE BREAKDOWN ==================== */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.p variants={fadeInUp} className="text-pink-400 text-sm font-semibold tracking-wider uppercase mb-4 text-center">
                            Curriculum
                        </motion.p>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center mb-16">
                            What You'll Master
                        </motion.h2>

                        <div className="space-y-4">
                            {[
                                { num: "01", text: "Set up a US LLC from India legally and affordably" },
                                { num: "02", text: "Open Stripe and accept payments from global customers" },
                                { num: "03", text: "Find products with proven demand using research tools" },
                                { num: "04", text: "Build a Shopify store that actually converts visitors" },
                                { num: "05", text: "Run structured ad tests that minimize wasteful spending" },
                                { num: "06", text: "Handle fulfillment and shipping without constant issues" },
                                { num: "07", text: "Scale from first sale to consistent monthly revenue" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 hover:translate-x-2"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)'
                                    }}
                                >
                                    <span
                                        className="flex-shrink-0 w-12 h-12 rounded-xl font-bold text-sm flex items-center justify-center"
                                        style={{ background: 'linear-gradient(135deg, #A855F7, #EC4899)' }}
                                    >
                                        {item.num}
                                    </span>
                                    <p className="text-lg text-purple-100">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== WHO THIS IS FOR / NOT FOR ==================== */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center mb-16">
                            Is This Right For You?
                        </motion.h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* This IS For */}
                            <motion.div
                                variants={fadeInUp}
                                className="p-8 rounded-3xl"
                                style={{
                                    background: 'rgba(168, 85, 247, 0.1)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(168, 85, 247, 0.3)'
                                }}
                            >
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                        <Check className="w-5 h-5" />
                                    </div>
                                    <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #A855F7, #EC4899)' }}>
                                        Perfect Fit
                                    </span>
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "You're ready to invest time learning before earning",
                                        "You can commit 3-6 months to building this",
                                        "You have ₹50k-1L starting capital",
                                        "You understand success requires testing",
                                        "You want to build a real business"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-purple-200/80">
                                            <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* This is NOT For */}
                            <motion.div
                                variants={fadeInUp}
                                className="p-8 rounded-3xl"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}
                            >
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                        <X className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <span className="text-gray-400">Not Right</span>
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "You want passive income without effort",
                                        "You expect guaranteed quick returns",
                                        "You won't invest in running ads",
                                        "You'll quit after first failure",
                                        "You need constant hand-holding"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-purple-200/50">
                                            <X className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== WHY TRUST THIS COURSE ==================== */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.p variants={fadeInUp} className="text-purple-400 text-sm font-semibold tracking-wider uppercase mb-4 text-center">
                            Trust & Transparency
                        </motion.p>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center mb-4">
                            Why This Course Is Different
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-purple-200/60 text-center max-w-xl mx-auto mb-16">
                            No Instagram flexing. No rented Lamborghinis. Just honest education.
                        </motion.p>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: Shield,
                                    title: "Built From Experience",
                                    desc: "Every lesson comes from running actual stores — including the failures and what we learned from them."
                                },
                                {
                                    icon: BookOpen,
                                    title: "Complete Transparency",
                                    desc: "Real margins (15-30%), real timelines (3-6 months), real challenges. No hidden upsells or secrets."
                                },
                                {
                                    icon: Globe,
                                    title: "Made for Indians",
                                    desc: "Every module addresses India-specific challenges: LLC, payments, timezones, currency, compliance."
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Realistic Expectations",
                                    desc: "We won't promise overnight riches. We promise you'll learn a valuable, practical skill."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-6 rounded-2xl"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)'
                                    }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                        style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))' }}
                                    >
                                        <item.icon className="w-6 h-6 text-purple-300" />
                                    </div>
                                    <h3 className="font-semibold mb-2">{item.title}</h3>
                                    <p className="text-purple-200/50 text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== COURSE FORMAT ==================== */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="text-center"
                    >
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-16">
                            What's Included
                        </motion.h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                { icon: PlayCircle, title: "20+ Hours", desc: "Detailed video lessons" },
                                { icon: BookOpen, title: "Step-by-Step", desc: "Clear actionable process" },
                                { icon: Globe, title: "India Focus", desc: "Local challenges solved" },
                                { icon: Zap, title: "Build Along", desc: "Practical implementation" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-6 rounded-2xl text-center"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)'
                                    }}
                                >
                                    <div
                                        className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                                        style={{ background: 'linear-gradient(135deg, #A855F7, #EC4899)' }}
                                    >
                                        <item.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="font-semibold mb-1">{item.title}</h3>
                                    <p className="text-sm text-purple-200/50">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== PRICE & CTA ==================== */}
            <section id="pricing-section" className="py-24 px-6">
                <div className="max-w-xl mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Start?
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-purple-200/60 mb-10">
                            One-time investment. Lifetime access. All future updates.
                        </motion.p>

                        <motion.div
                            variants={fadeInUp}
                            className="p-10 rounded-3xl mb-10"
                            style={{
                                background: 'rgba(168, 85, 247, 0.1)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(168, 85, 247, 0.3)'
                            }}
                        >
                            <div className="mb-6">
                                <span
                                    className="text-6xl font-bold bg-clip-text text-transparent"
                                    style={{ backgroundImage: 'linear-gradient(135deg, #A855F7, #EC4899)' }}
                                >
                                    ₹4,999
                                </span>
                                <span className="text-2xl text-purple-300/40 ml-3 line-through">₹9,999</span>
                            </div>
                            <p className="text-purple-300 text-sm mb-8">Launch pricing • Limited time</p>

                            <button
                                className="group w-full inline-flex items-center justify-center gap-3 px-8 py-5 font-semibold text-lg rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                                style={{
                                    background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                                    boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)'
                                }}
                            >
                                Enroll Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="text-sm text-purple-300/40 mt-6">7-day money-back guarantee</p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-6">
                            {[
                                { value: "6+", label: "Modules" },
                                { value: "20+", label: "Video Hours" },
                                { value: "∞", label: "Lifetime Access" }
                            ].map((item, i) => (
                                <div key={i} className="text-center">
                                    <p
                                        className="text-3xl font-bold bg-clip-text text-transparent"
                                        style={{ backgroundImage: 'linear-gradient(135deg, #A855F7, #EC4899)' }}
                                    >
                                        {item.value}
                                    </p>
                                    <p className="text-sm text-purple-200/40">{item.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5 pb-32">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-sm text-purple-200/30">
                        © 2026 Skilinia. Built for serious learners in India.
                    </p>
                </div>
            </footer>

            {/* Sticky Mobile/Desktop CTA */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: showStickyNav ? 0 : 100, opacity: showStickyNav ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
            >
                <div
                    className="p-1.5 rounded-full pointer-events-auto backdrop-blur-md"
                    style={{
                        background: 'rgba(19, 10, 35, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <button
                        onClick={scrollToPricing}
                        className="group flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white transition-all hover:scale-105 active:scale-95"
                        style={{
                            background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                            boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
                        }}
                    >
                        Apply Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default DropshippingV4;

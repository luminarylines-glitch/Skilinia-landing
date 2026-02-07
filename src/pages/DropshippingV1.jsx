import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, X, Globe, CreditCard, Package, TrendingUp, ShoppingCart, Zap, PlayCircle, BookOpen, Users, Shield, ChevronDown } from 'lucide-react';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ============================================
// DESIGN 1: MINIMAL PROFESSIONAL (DARK MODE)
// Clean, minimal, dark theme with subtle cyan accents
// ============================================

function DropshippingV1() {
    const [expandedFaq, setExpandedFaq] = useState(null);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans antialiased">
            {/* Subtle gradient overlay */}
            <div className="fixed inset-0 bg-gradient-to-br from-cyan-950/20 via-transparent to-transparent pointer-events-none" />

            {/* ==================== HERO SECTION ==================== */}
            <section className="relative min-h-screen flex items-center justify-center px-6 py-24">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-8"
                    >
                        <Globe className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-cyan-400">For Indians Selling to US/EU Markets</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                    >
                        Learn International Dropshipping
                        <span className="block text-cyan-400 mt-2">The Right Way</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8"
                    >
                        A complete system built specifically for Indians to sell globally —
                        from US LLC setup to Stripe payments to profitable ads.
                    </motion.p>

                    {/* Differentiators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-4 mb-12"
                    >
                        {[
                            'No Amazon India',
                            'No Fake Screenshots',
                            'No Overnight Income Lies'
                        ].map((text, i) => (
                            <div key={i} className="flex items-center gap-2 text-gray-500">
                                <X className="w-4 h-4 text-red-500/70" />
                                <span className="text-sm">{text}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-300"
                    >
                        See If This Is Right For You
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <ChevronDown className="w-6 h-6 text-gray-600 animate-bounce" />
                    </motion.div>
                </div>
            </section>

            {/* ==================== THE PROBLEM SECTION ==================== */}
            <section className="py-24 px-6 border-t border-gray-900">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.p variants={fadeInUp} className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-4">
                            The Reality
                        </motion.p>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-12">
                            Why Most Indian Dropshippers Struggle
                        </motion.h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "Tutorial Overload, Zero Clarity",
                                    desc: "YouTube is filled with outdated, generic advice that doesn't address India-specific challenges like GST, payment gateways, or LLC formation."
                                },
                                {
                                    title: "Amazon/Meesho Models Are Broken",
                                    desc: "Domestic marketplaces have razor-thin margins, intense competition, and no path to building a real business."
                                },
                                {
                                    title: "Payment Gateway Nightmare",
                                    desc: "Stripe doesn't work directly in India. PayPal has limitations. Most beginners give up here without ever launching a store."
                                },
                                {
                                    title: "Ads That Burn Money",
                                    desc: "Without proper research and testing frameworks, most beginners spend thousands on Facebook ads that never convert."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-6 rounded-xl border border-gray-800/50 bg-gray-900/20"
                                >
                                    <h3 className="text-lg font-semibold mb-2 text-gray-200">{item.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== THE SOLUTION SECTION ==================== */}
            <section className="py-24 px-6 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.p variants={fadeInUp} className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-4">
                            The Solution
                        </motion.p>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
                            A Complete System, Not Just Another Course
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-xl text-gray-400 mb-12 max-w-2xl">
                            This isn't motivation. It's a step-by-step framework built specifically for Indians
                            who want to sell to international customers and actually make money.
                        </motion.p>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { icon: Globe, title: "US LLC Formation", desc: "Wyoming LLC setup for legal international operations" },
                                { icon: CreditCard, title: "Stripe Access", desc: "Accept payments from customers worldwide" },
                                { icon: ShoppingCart, title: "Store Creation", desc: "Build a professional Shopify store that converts" },
                                { icon: TrendingUp, title: "Product Research", desc: "Find winning products with real demand" },
                                { icon: Zap, title: "Ad Strategy", desc: "Run profitable Facebook & TikTok campaigns" },
                                { icon: Package, title: "Fulfillment", desc: "Reliable shipping without customer complaints" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-5 rounded-lg border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors"
                                >
                                    <item.icon className="w-8 h-8 text-cyan-400 mb-3" />
                                    <h3 className="font-semibold mb-1">{item.title}</h3>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== MODULE BREAKDOWN ==================== */}
            <section className="py-24 px-6 border-t border-gray-900">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.p variants={fadeInUp} className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-4">
                            What You'll Learn
                        </motion.p>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-12">
                            Practical Outcomes, Not Theory
                        </motion.h2>

                        <div className="space-y-4">
                            {[
                                "How to legally accept international payments from India using a US LLC and Stripe",
                                "How to identify products that actually sell — no guesswork, just data",
                                "How to structure your first ad campaigns without burning your budget",
                                "How to handle fulfillment and shipping without customer service nightmares",
                                "How to scale from first sales to consistent monthly revenue",
                                "How to manage your finances, taxes, and compliance as an international seller"
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-900/30 transition-colors"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-cyan-400" />
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">{item}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== WHO THIS IS FOR / NOT FOR ==================== */}
            <section className="py-24 px-6 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent">
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
                            <motion.div variants={fadeInUp} className="p-8 rounded-2xl border border-cyan-500/30 bg-cyan-500/5">
                                <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                                    <Check className="w-6 h-6" />
                                    This Is For You If...
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "You're willing to learn, test, and iterate",
                                        "You have 3-6 months to build something real",
                                        "You understand there's no magic formula",
                                        "You can invest ₹50k-1L to start your business",
                                        "You want to build a real skill, not chase trends"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300">
                                            <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* This is NOT For */}
                            <motion.div variants={fadeInUp} className="p-8 rounded-2xl border border-red-500/30 bg-red-500/5">
                                <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
                                    <X className="w-6 h-6" />
                                    This Is NOT For You If...
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "You want passive income without effort",
                                        "You're looking for get-rich-quick schemes",
                                        "You won't run paid ads or invest in testing",
                                        "You need guaranteed results",
                                        "You'll give up after the first failed product"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300">
                                            <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
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
            <section className="py-24 px-6 border-t border-gray-900">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.p variants={fadeInUp} className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-4">
                            Why Trust This
                        </motion.p>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-12">
                            No Fake Screenshots. No Lamborghinis.
                        </motion.h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    icon: Shield,
                                    title: "Real Experience",
                                    desc: "This course is built from actual experience running international dropshipping stores — the wins and the failures."
                                },
                                {
                                    icon: BookOpen,
                                    title: "Transparent Process",
                                    desc: "Every strategy, every tool, every step is explained. No secret sauce held back for upsells."
                                },
                                {
                                    icon: Users,
                                    title: "Indian Context",
                                    desc: "Built for the unique challenges Indians face: LLC formation, payment gateways, timezone management, and more."
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Realistic Expectations",
                                    desc: "We show you real margins (15-30%), real timelines (3-6 months), and real challenges you'll face."
                                }
                            ].map((item, i) => (
                                <motion.div key={i} variants={fadeInUp} className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center">
                                        <item.icon className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">{item.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== COURSE FORMAT ==================== */}
            <section className="py-24 px-6 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="text-center"
                    >
                        <motion.p variants={fadeInUp} className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-4">
                            Course Format
                        </motion.p>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-12">
                            How You'll Learn
                        </motion.h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: PlayCircle, title: "Video Lessons", desc: "Detailed walkthroughs you can follow along" },
                                { icon: BookOpen, title: "Step-by-Step", desc: "Clear actions, not vague advice" },
                                { icon: Globe, title: "Indian Context", desc: "Solutions for India-specific challenges" },
                                { icon: Zap, title: "Practical Focus", desc: "Build as you learn, not after" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-6 rounded-xl border border-gray-800 bg-gray-900/30 text-center"
                                >
                                    <item.icon className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
                                    <h3 className="font-semibold mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== PRICE & CTA ==================== */}
            <section className="py-24 px-6 border-t border-gray-900">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.p variants={fadeInUp} className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-4">
                            Investment
                        </motion.p>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
                            Start Building Your International Business
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-gray-400 mb-8">
                            One-time payment. Lifetime access. All future updates included.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="mb-8">
                            <span className="text-5xl md:text-6xl font-bold">₹4,999</span>
                            <span className="text-gray-500 ml-2 line-through">₹9,999</span>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4 mb-8">
                            <button className="group inline-flex items-center gap-3 px-10 py-5 bg-cyan-500 text-black font-bold text-lg rounded-lg hover:bg-cyan-400 transition-all duration-300">
                                Start Learning International Dropshipping
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <p className="text-sm text-gray-600">7-day refund policy. No questions asked.</p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-800">
                            {[
                                { label: "Modules", value: "6+" },
                                { label: "Video Hours", value: "20+" },
                                { label: "Support", value: "Lifetime" }
                            ].map((item, i) => (
                                <div key={i} className="text-center">
                                    <p className="text-2xl font-bold text-cyan-400">{item.value}</p>
                                    <p className="text-sm text-gray-500">{item.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-sm text-gray-600">
                        © 2026 Skilinia. Built for serious learners in India.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default DropshippingV1;

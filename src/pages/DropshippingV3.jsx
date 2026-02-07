import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, X, Globe, CreditCard, Package, TrendingUp, ShoppingCart, Zap, PlayCircle, BookOpen, Users, Shield, ChevronDown, Building2, Truck, BarChart3, Terminal, Layers, GitBranch } from 'lucide-react';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const drawLine = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }
};

// ============================================
// DESIGN 3: EDUCATIONAL BLUEPRINT
// Blueprint/diagram aesthetic, grid pattern, connecting lines
// ============================================

function DropshippingV3() {
    return (
        <div className="min-h-screen bg-[#0F172A] text-white font-sans antialiased overflow-hidden">
            {/* Grid Pattern Background */}
            <div
                className="fixed inset-0 pointer-events-none opacity-30"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* ==================== HERO SECTION ==================== */}
            <section className="relative min-h-screen flex items-center justify-center px-6 py-24">
                {/* Blueprint decorative elements */}
                <div className="absolute top-20 left-10 text-sky-500/20 font-mono text-xs hidden lg:block">
                    <pre>{`// BLUEPRINT v2.0
// International DS System
// Target: US/EU Markets`}</pre>
                </div>
                <div className="absolute bottom-20 right-10 text-sky-500/20 font-mono text-xs hidden lg:block">
                    <pre>{`[x] Legal Entity
[x] Payments
[x] Store
[x] Ads`}</pre>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    {/* Technical Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded border border-sky-500/40 bg-sky-500/10 mb-8 font-mono text-sm"
                    >
                        <Terminal className="w-4 h-4 text-sky-400" />
                        <span className="text-sky-400">SYSTEM_INIT: India → Global Markets</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
                        style={{ fontFamily: "'Inter Tight', sans-serif" }}
                    >
                        <span className="text-sky-400">&lt;</span>
                        International Dropshipping
                        <span className="text-sky-400">/&gt;</span>
                        <span className="block text-sky-400 mt-2 text-3xl md:text-4xl font-normal">
                            The Complete Blueprint
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed"
                    >
                        A systematic, step-by-step framework for Indians to build legitimate
                        dropshipping businesses targeting US and EU customers.
                    </motion.p>

                    {/* Technical specs */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-6 mb-12 font-mono text-xs"
                    >
                        {[
                            { label: 'NO_AMAZON_INDIA', status: '✕' },
                            { label: 'NO_FAKE_PROOF', status: '✕' },
                            { label: 'NO_QUICK_RICHES', status: '✕' }
                        ].map((item, i) => (
                            <div key={i} className="px-3 py-1 rounded border border-red-500/30 bg-red-500/10 text-red-400">
                                {item.status} {item.label}
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
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-sky-500 text-slate-900 font-bold rounded border-2 border-sky-400 hover:bg-sky-400 transition-all duration-300"
                    >
                        <span className="font-mono">$</span> Initialize Learning Sequence
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </div>
            </section>

            {/* ==================== THE PROBLEM SECTION ==================== */}
            <section className="py-24 px-6 border-t border-sky-500/20">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                            <p className="text-red-400 font-mono text-sm tracking-wider uppercase">
                                ERROR_LOG: Common Failure Points
                            </p>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-12">
                            Why Most Indian Dropshippers <span className="text-red-400">Fail</span>
                        </motion.h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    code: "ERR_001",
                                    title: "Outdated Tutorial Syndrome",
                                    desc: "Generic YouTube content that ignores India-specific challenges: GST, payment gateways, entity formation."
                                },
                                {
                                    code: "ERR_002",
                                    title: "Domestic Platform Trap",
                                    desc: "Amazon India, Flipkart, Meesho = 2-5% margins after fees. No scalable business possible."
                                },
                                {
                                    code: "ERR_003",
                                    title: "Payment Gateway Block",
                                    desc: "Stripe rejects Indian businesses. PayPal has limitations. 90% stop here before launching."
                                },
                                {
                                    code: "ERR_004",
                                    title: "Ad Spend Burnout",
                                    desc: "No testing framework = ₹50k-1L wasted on Facebook ads with zero structured learning."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-6 rounded-lg border border-red-500/20 bg-red-500/5 relative overflow-hidden"
                                >
                                    <div className="absolute top-2 right-2 font-mono text-xs text-red-500/50">
                                        {item.code}
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-red-400">{item.title}</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== THE SOLUTION SECTION ==================== */}
            <section className="py-24 px-6 relative">
                {/* Connection lines SVG */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 hidden lg:block" viewBox="0 0 1200 800">
                    <motion.path
                        initial="hidden"
                        whileInView="visible"
                        variants={drawLine}
                        d="M200 400 Q 400 200, 600 400 T 1000 400"
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth="2"
                        strokeDasharray="8 4"
                    />
                </svg>

                <div className="max-w-5xl mx-auto relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
                            <div className="w-3 h-3 rounded-full bg-sky-500 animate-pulse" />
                            <p className="text-sky-400 font-mono text-sm tracking-wider uppercase">
                                SOLUTION: The Complete System
                            </p>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
                            A <span className="text-sky-400">Systematic Framework</span>, Not Motivation
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-xl text-slate-400 mb-12 max-w-2xl">
                            Every step mapped out. Every challenge addressed. Built specifically for
                            Indians selling to international customers.
                        </motion.p>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { icon: Building2, num: "01", title: "Entity Formation", desc: "Wyoming LLC for legal operations" },
                                { icon: CreditCard, num: "02", title: "Payment System", desc: "Stripe access for global sales" },
                                { icon: ShoppingCart, num: "03", title: "Store Build", desc: "Converting Shopify architecture" },
                                { icon: BarChart3, num: "04", title: "Product Research", desc: "Data-driven winner selection" },
                                { icon: Zap, num: "05", title: "Ad Campaigns", desc: "Structured testing protocols" },
                                { icon: Truck, num: "06", title: "Fulfillment", desc: "Reliable global shipping" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-5 rounded-lg border border-sky-500/30 bg-sky-500/5 hover:bg-sky-500/10 transition-colors relative"
                                >
                                    <div className="absolute top-3 right-3 font-mono text-xs text-sky-500/60">
                                        STEP_{item.num}
                                    </div>
                                    <item.icon className="w-8 h-8 text-sky-400 mb-3" />
                                    <h3 className="font-semibold mb-1">{item.title}</h3>
                                    <p className="text-sm text-slate-500">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== MODULE BREAKDOWN ==================== */}
            <section className="py-24 px-6 border-t border-sky-500/20">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
                            <Layers className="w-5 h-5 text-sky-400" />
                            <p className="text-sky-400 font-mono text-sm tracking-wider uppercase">
                                MODULE_MAP: Practical Outcomes
                            </p>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-12">
                            What You'll <span className="text-sky-400">Execute</span>
                        </motion.h2>

                        <div className="space-y-3">
                            {[
                                { cmd: "setup_llc()", desc: "Form a US LLC from India without attorneys or travel" },
                                { cmd: "init_stripe()", desc: "Open Stripe account and accept payments from 135+ countries" },
                                { cmd: "find_products()", desc: "Identify winning products using data-driven research methods" },
                                { cmd: "build_store()", desc: "Create a professional Shopify store that converts" },
                                { cmd: "run_ads()", desc: "Execute structured Facebook/TikTok testing campaigns" },
                                { cmd: "fulfill_orders()", desc: "Handle shipping and customer service efficiently" },
                                { cmd: "scale_revenue()", desc: "Grow from first sale to consistent monthly income" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-sky-500/30 transition-colors font-mono"
                                >
                                    <div className="flex-shrink-0 w-6 h-6 rounded bg-sky-500/20 flex items-center justify-center text-sky-400 text-xs">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 flex flex-wrap items-center gap-2">
                                        <code className="text-sky-400 text-sm">{item.cmd}</code>
                                        <span className="text-slate-600">//</span>
                                        <span className="text-slate-400 text-sm">{item.desc}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== WHO THIS IS FOR / NOT FOR ==================== */}
            <section className="py-24 px-6 bg-slate-900/50">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4">
                            <GitBranch className="w-5 h-5 text-sky-400" />
                            <p className="text-sky-400 font-mono text-sm tracking-wider uppercase">
                                COMPATIBILITY_CHECK
                            </p>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center mb-16">
                            System <span className="text-sky-400">Requirements</span>
                        </motion.h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Compatible */}
                            <motion.div variants={fadeInUp} className="p-8 rounded-lg border border-sky-500/30 bg-sky-500/5">
                                <div className="flex items-center gap-2 mb-6 font-mono text-sm">
                                    <Check className="w-5 h-5 text-sky-400" />
                                    <span className="text-sky-400">COMPATIBLE_USER</span>
                                </div>
                                <ul className="space-y-4 font-mono text-sm">
                                    {[
                                        "ready_to_learn = true",
                                        "timeline >= 3_months",
                                        "capital >= 50000_INR",
                                        "expects_magic = false",
                                        "persistence_level = high"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-300">
                                            <Check className="w-4 h-4 text-sky-400" />
                                            <code>{item}</code>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Not Compatible */}
                            <motion.div variants={fadeInUp} className="p-8 rounded-lg border border-red-500/30 bg-red-500/5">
                                <div className="flex items-center gap-2 mb-6 font-mono text-sm">
                                    <X className="w-5 h-5 text-red-400" />
                                    <span className="text-red-400">INCOMPATIBLE_USER</span>
                                </div>
                                <ul className="space-y-4 font-mono text-sm">
                                    {[
                                        "wants_passive_income = true",
                                        "timeline < 1_month",
                                        "will_run_ads = false",
                                        "needs_guarantees = true",
                                        "quits_on_failure = true"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-400">
                                            <X className="w-4 h-4 text-red-400" />
                                            <code>{item}</code>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== WHY TRUST THIS COURSE ==================== */}
            <section className="py-24 px-6 border-t border-sky-500/20">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
                            <Shield className="w-5 h-5 text-sky-400" />
                            <p className="text-sky-400 font-mono text-sm tracking-wider uppercase">
                                TRUST_METRICS
                            </p>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-12">
                            No Lambos. No <span className="text-sky-400">Screenshots</span>. Just System.
                        </motion.h2>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: Shield,
                                    metric: "experience_based",
                                    title: "Built From Real Operations",
                                    desc: "Every module comes from running actual stores — wins and failures both."
                                },
                                {
                                    icon: BookOpen,
                                    metric: "transparency_100%",
                                    title: "Full Documentation",
                                    desc: "Every strategy, tool, and step explained. No secrets held for upsells."
                                },
                                {
                                    icon: Globe,
                                    metric: "india_optimized",
                                    title: "India-Specific Solutions",
                                    desc: "LLC formation, payment gateways, timezones — all challenges addressed."
                                },
                                {
                                    icon: TrendingUp,
                                    metric: "realistic_data",
                                    title: "Real Numbers Only",
                                    desc: "15-30% margins. 3-6 month timelines. Actual challenges documented."
                                }
                            ].map((item, i) => (
                                <motion.div key={i} variants={fadeInUp} className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50">
                                    <div className="flex items-center gap-3 mb-4">
                                        <item.icon className="w-6 h-6 text-sky-400" />
                                        <code className="text-xs text-sky-500/60">{item.metric}</code>
                                    </div>
                                    <h3 className="font-semibold mb-2">{item.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== COURSE FORMAT ==================== */}
            <section className="py-24 px-6 bg-slate-900/50">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="text-center"
                    >
                        <motion.p variants={fadeInUp} className="text-sky-400 font-mono text-sm tracking-wider uppercase mb-4">
                            DELIVERY_FORMAT
                        </motion.p>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-12">
                            System <span className="text-sky-400">Architecture</span>
                        </motion.h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { icon: PlayCircle, title: "Video Modules", desc: "Screen recordings + walkthroughs" },
                                { icon: Terminal, title: "Step-by-Step", desc: "Execute as you learn" },
                                { icon: Globe, title: "India Context", desc: "Local challenges solved" },
                                { icon: Zap, title: "Practical Build", desc: "Build alongside course" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-6 rounded-lg border border-slate-700 bg-slate-800/30 text-center"
                                >
                                    <item.icon className="w-10 h-10 text-sky-400 mx-auto mb-4" />
                                    <h3 className="font-semibold mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-500">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== PRICE & CTA ==================== */}
            <section className="py-24 px-6 border-t border-sky-500/20">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.p variants={fadeInUp} className="text-sky-400 font-mono text-sm tracking-wider uppercase mb-4">
                            SYSTEM_INSTALL
                        </motion.p>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
                            Initialize Your <span className="text-sky-400">Journey</span>
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-slate-400 mb-8 font-mono text-sm">
              // One-time payment. Lifetime access. All updates included.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="mb-8 p-8 rounded-lg border-2 border-dashed border-sky-500/40 bg-sky-500/5">
                            <code className="text-slate-500 text-sm">const price = </code>
                            <span className="text-5xl font-bold text-white">₹4,999</span>
                            <span className="text-slate-500 ml-2 line-through">₹9,999</span>
                            <code className="text-slate-500 text-sm">;</code>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4 mb-8">
                            <button className="group inline-flex items-center gap-3 px-10 py-5 bg-sky-500 text-slate-900 font-bold text-lg rounded border-2 border-sky-400 hover:bg-sky-400 transition-all duration-300">
                                <Terminal className="w-5 h-5" />
                                npm install dropshipping-blueprint
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <code className="text-sm text-slate-600">// 7-day refund policy</code>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800 font-mono">
                            {[
                                { label: "modules", value: "6+" },
                                { label: "video_hours", value: "20+" },
                                { label: "access", value: "∞" }
                            ].map((item, i) => (
                                <div key={i} className="text-center">
                                    <p className="text-2xl font-bold text-sky-400">{item.value}</p>
                                    <p className="text-xs text-slate-500">{item.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-slate-800">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-sm text-slate-600 font-mono">
                        © 2026 Skilinia // Built for serious learners in India
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default DropshippingV3;

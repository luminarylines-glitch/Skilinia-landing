import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, X, Globe, CreditCard, Package, TrendingUp, ShoppingCart, Zap, PlayCircle, BookOpen, Users, Shield, ChevronDown, Building2, Truck, BarChart3 } from 'lucide-react';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

// ============================================
// DESIGN 2: TRUST-FOCUSED CLASSIC (LIGHT MODE)
// Light theme, professional credibility, serif accents
// ============================================

function DropshippingV2() {
    return (
        <div className="min-h-screen bg-[#FAFAF8] text-gray-900 font-sans antialiased">

            {/* ==================== HERO SECTION ==================== */}
            <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-white to-[#F5F5F0]">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Trust Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-50 border border-emerald-200 mb-10"
                    >
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-medium text-emerald-700">Designed for Indian Entrepreneurs</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900"
                        style={{ fontFamily: "'Inter Tight', sans-serif" }}
                    >
                        Build a Legitimate International
                        <span className="block text-emerald-600 mt-2">Dropshipping Business</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed"
                    >
                        A structured, practical course for Indians who want to sell to US and EU customers —
                        with proper legal setup, payment processing, and realistic expectations.
                    </motion.p>

                    {/* What This Isn't */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="inline-flex flex-wrap justify-center gap-6 mb-12 px-6 py-4 rounded-xl bg-gray-100 border border-gray-200"
                    >
                        {[
                            'Not Amazon India',
                            'Not Fake Income Screenshots',
                            'Not Get Rich Quick'
                        ].map((text, i) => (
                            <div key={i} className="flex items-center gap-2 text-gray-500">
                                <X className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-medium">{text}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(5, 150, 105, 0.2)" }}
                        whileTap={{ scale: 0.98 }}
                        className="group inline-flex items-center gap-3 px-10 py-5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-600/20"
                    >
                        See If This Course Is Right For You
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2"
                    >
                        <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
                    </motion.div>
                </div>
            </section>

            {/* ==================== THE PROBLEM SECTION ==================== */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-16">
                            <p className="text-emerald-600 text-sm font-semibold tracking-wider uppercase mb-3">
                                The Problem
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Why Indian Dropshipping Tutorials Usually Fail
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    icon: BookOpen,
                                    title: "Generic, Outdated Advice",
                                    desc: "Most tutorials are made for Western audiences. They don't address India-specific challenges like payment processing, GST compliance, or entity formation."
                                },
                                {
                                    icon: ShoppingCart,
                                    title: "Broken Domestic Models",
                                    desc: "Amazon India, Flipkart, and Meesho have 2-5% margins after fees. There's no real business to build there — just a race to the bottom."
                                },
                                {
                                    icon: CreditCard,
                                    title: "The Payment Gateway Wall",
                                    desc: "Stripe doesn't accept Indian businesses. PayPal has major limitations. This single issue stops 90% of aspiring dropshippers before they start."
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Expensive Trial-and-Error",
                                    desc: "Without a proper testing framework, most beginners waste ₹50k-1L on ads before realizing they're doing everything wrong."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-5">
                                        <item.icon className="w-6 h-6 text-red-500" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== THE SOLUTION SECTION ==================== */}
            <section className="py-24 px-6 bg-gradient-to-b from-[#F5F5F0] to-white">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-16">
                            <p className="text-emerald-600 text-sm font-semibold tracking-wider uppercase mb-3">
                                The Solution
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                A Complete System Built for Indian Sellers
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Not motivation. Not vague advice. A practical framework that addresses
                                every challenge you'll face selling internationally from India.
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: Building2, title: "Wyoming LLC Setup", desc: "Step-by-step legal entity formation for international operations" },
                                { icon: CreditCard, title: "Stripe Access", desc: "Accept credit cards from customers in 135+ countries" },
                                { icon: ShoppingCart, title: "Store Creation", desc: "Build a professional, high-converting Shopify store" },
                                { icon: BarChart3, title: "Product Research", desc: "Data-driven methods to find products with real demand" },
                                { icon: Zap, title: "Ad Strategy", desc: "Structured testing frameworks for Facebook and TikTok" },
                                { icon: Truck, title: "Fulfillment", desc: "Reliable suppliers and shipping without customer complaints" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-6 rounded-xl bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all duration-300"
                                >
                                    <div className="w-11 h-11 rounded-lg bg-emerald-50 flex items-center justify-center mb-4">
                                        <item.icon className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== MODULE BREAKDOWN ==================== */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-16">
                            <p className="text-emerald-600 text-sm font-semibold tracking-wider uppercase mb-3">
                                Curriculum
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                What You'll Be Able To Do
                            </h2>
                        </motion.div>

                        <div className="space-y-4">
                            {[
                                { num: "01", text: "Set up a US LLC from India without traveling or hiring expensive attorneys" },
                                { num: "02", text: "Open a Stripe account and legally accept payments from US/EU customers" },
                                { num: "03", text: "Find products with proven demand using free and paid research tools" },
                                { num: "04", text: "Build a professional Shopify store that actually converts visitors to buyers" },
                                { num: "05", text: "Run structured ad tests that minimize wasted spend and maximize learnings" },
                                { num: "06", text: "Handle fulfillment, shipping, and customer service without constant problems" },
                                { num: "07", text: "Scale from first sale to consistent revenue with realistic margin expectations" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="flex items-start gap-5 p-5 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm flex items-center justify-center">
                                        {item.num}
                                    </span>
                                    <p className="text-lg text-gray-700 leading-relaxed pt-2">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== WHO THIS IS FOR / NOT FOR ==================== */}
            <section className="py-24 px-6 bg-[#F5F5F0]">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
                            Is This Course Right For You?
                        </motion.h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* This IS For */}
                            <motion.div variants={fadeInUp} className="p-8 rounded-2xl bg-white border border-emerald-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <Check className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-emerald-700">Perfect Match If...</h3>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        "You're willing to invest time learning before earning",
                                        "You can commit 3-6 months to building this business",
                                        "You have ₹50k-1L starting capital for inventory and ads",
                                        "You understand success requires testing and iteration",
                                        "You want to build a real business, not chase quick money"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-700">
                                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* This is NOT For */}
                            <motion.div variants={fadeInUp} className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                        <X className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-700">Not Right If...</h3>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        "You're looking for passive income without work",
                                        "You expect guaranteed results or quick returns",
                                        "You're not willing to run paid advertisements",
                                        "You'll give up after the first product doesn't sell",
                                        "You need someone to hold your hand through everything"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-600">
                                            <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== WHY TRUST THIS COURSE ==================== */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-16">
                            <p className="text-emerald-600 text-sm font-semibold tracking-wider uppercase mb-3">
                                Trust & Transparency
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Why This Course Is Different
                            </h2>
                            <p className="text-gray-600 max-w-xl mx-auto">
                                No Instagram flexing. No rented Lamborghinis. Just honest education
                                built from real experience.
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            {[
                                {
                                    icon: Shield,
                                    title: "Built From Experience",
                                    desc: "This course comes from running actual stores — including the failures. Every lesson is something we learned the hard way."
                                },
                                {
                                    icon: BookOpen,
                                    title: "Complete Transparency",
                                    desc: "We share real margins (15-30%), real timelines (3-6 months to profit), and real challenges. No hidden upsells."
                                },
                                {
                                    icon: Users,
                                    title: "Made for Indians",
                                    desc: "Every module addresses India-specific challenges: LLC formation, payment gateways, timezone management, currency handling."
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Realistic Expectations",
                                    desc: "We won't promise you'll make ₹10 lakh in your first month. We promise you'll learn a real skill."
                                }
                            ].map((item, i) => (
                                <motion.div key={i} variants={fadeInUp} className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                                        <item.icon className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== COURSE FORMAT ==================== */}
            <section className="py-24 px-6 bg-[#F5F5F0]">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="text-center"
                    >
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
                            What's Included
                        </motion.h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: PlayCircle, title: "20+ Hours", desc: "Video lessons with screen recordings" },
                                { icon: BookOpen, title: "Step-by-Step", desc: "Clear processes, not vague concepts" },
                                { icon: Globe, title: "Indian Context", desc: "Every lesson addresses local challenges" },
                                { icon: Zap, title: "Practical Focus", desc: "Build alongside the course" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-6 rounded-xl bg-white border border-gray-200 text-center"
                                >
                                    <div className="w-14 h-14 rounded-full bg-emerald-50 mx-auto mb-4 flex items-center justify-center">
                                        <item.icon className="w-7 h-7 text-emerald-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== PRICE & CTA ==================== */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-xl mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Ready to Start?
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-gray-600 mb-8">
                            One-time investment. Lifetime access. All updates included.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="mb-10 p-8 rounded-2xl bg-gradient-to-b from-emerald-50 to-white border border-emerald-200">
                            <div className="mb-4">
                                <span className="text-5xl font-bold text-gray-900">₹4,999</span>
                                <span className="text-xl text-gray-400 ml-2 line-through">₹9,999</span>
                            </div>
                            <p className="text-sm text-emerald-600 font-medium mb-6">Launch price • Limited time</p>

                            <button className="group w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-emerald-600 text-white font-semibold text-lg rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-600/20">
                                Enroll Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="text-sm text-gray-500 mt-4">7-day money-back guarantee</p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-6">
                            {[
                                { value: "6+", label: "Modules" },
                                { value: "20+", label: "Video Hours" },
                                { value: "∞", label: "Lifetime Access" }
                            ].map((item, i) => (
                                <div key={i} className="text-center">
                                    <p className="text-2xl font-bold text-emerald-600">{item.value}</p>
                                    <p className="text-sm text-gray-500">{item.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-gray-200 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-sm text-gray-500">
                        © 2026 Skilinia. Built for serious learners in India.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default DropshippingV2;

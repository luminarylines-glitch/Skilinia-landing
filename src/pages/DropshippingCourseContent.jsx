import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, X, Shield, Users, Zap, BookOpen, Target, Globe, AlertTriangle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

function DropshippingCourseContent() {

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-[#d4ff00] selection:text-black">

            {/* Navigation Back */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-6 mix-blend-difference">
                <Link to="/internationaldropshipping" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-[#d4ff00] transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Overview
                </Link>
            </nav>

            {/* ==================== SECTION 1: HERO ==================== */}
            <section className="relative min-h-[80vh] flex flex-col justify-center px-6 pt-24 pb-12 border-b border-white/10">
                <div className="max-w-5xl mx-auto w-full">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.span variants={fadeInUp} className="inline-block text-[#d4ff00] font-mono text-xs tracking-[0.3em] uppercase mb-6">
                            Initiation Protocol // Content
                        </motion.span>
                        <motion.h1 variants={fadeInUp} className="text-[10vw] md:text-[6vw] font-black leading-[0.9] tracking-tighter mb-8">
                            INTERNATIONAL<br />
                            DROPSHIPPING.
                        </motion.h1>
                        <motion.div variants={fadeInUp} className="max-w-2xl border-l-2 border-[#d4ff00] pl-6 md:pl-8">
                            <p className="text-xl md:text-2xl text-white font-medium mb-4">
                                A realistic blueprint for building a global online business.
                            </p>
                            <p className="text-gray-500 font-mono text-sm leading-relaxed">
                                THIS IS NOT A QUICK MONEY SCHEME.<br />
                                THIS IS A PRECISION-DRIVEN BUSINESS MODEL.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Decorative Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none -z-10" />
            </section>

            {/* ==================== SECTION 2: POSITIONING STATEMENT ==================== */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto text-center md:text-left">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-12"
                    >
                        <motion.p variants={fadeInUp} className="text-3xl md:text-4xl font-light text-gray-300 leading-tight">
                            Most people enter dropshipping chasing shortcuts. <br />
                            <span className="text-white font-bold">The reality is different.</span>
                        </motion.p>

                        <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10">
                            {['RESEARCH', 'TESTING', 'TRUST-BUILDING', 'EXECUTION'].map((item, i) => (
                                <div key={i} className="text-center md:text-left">
                                    <span className="block text-[#d4ff00] text-xs font-mono mb-2">0{i + 1}</span>
                                    <span className="text-sm font-bold tracking-widest">{item}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== SECTION 3: WHAT’S INCLUDED ==================== */}
            <section className="py-24 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 mb-16">
                        <div className="md:w-1/3">
                            <h2 className="text-4xl font-black tracking-tight mb-4">WHAT'S<br />INCLUDED</h2>
                            <p className="text-gray-500">Sharp, premium, structured clarity.</p>
                        </div>
                        <div className="md:w-2/3 grid gap-1">
                            {[
                                { title: "Understanding the Model", desc: "Deep breakdown of how the business actually works.", icon: Target },
                                { title: "Market & Product Research", desc: "How to identify real demand and avoid beginner traps.", icon: SearchIcon },
                                { title: "Winning Product Logic", desc: "Scroll-stopping products, problem-solving focus, profit margins.", icon: Zap },
                                { title: "Business & Payment Setup", desc: "Beginner vs Pro route explained clearly.", icon: Globe },
                                { title: "Supplier & Fulfillment", desc: "How to select reliable suppliers and avoid refund disasters.", icon: Lock },
                                { title: "Traffic & Marketing Strategy", desc: "Organic, Theme Pages, Paid Ads logic.", icon: Users },
                                { title: "Common Mistakes", desc: "Critical errors beginners repeatedly make.", icon: AlertTriangle },
                                { title: "Customer Support Systems", desc: "Building trust, preventing disputes, protecting revenue.", icon: Shield }
                            ].map((module, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group flex items-start gap-6 p-6 bg-black border border-white/5 hover:border-[#d4ff00]/50 transition-colors"
                                >
                                    <span className="text-gray-600 font-mono text-sm pt-1">0{i + 1}</span>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#d4ff00] transition-colors">{module.title}</h3>
                                        <p className="text-sm text-gray-400">{module.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== SECTION 4: WHAT YOU’LL GET ==================== */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 gap-16 items-center"
                    >
                        <div>
                            <motion.h2 variants={fadeInUp} className="text-4xl font-black tracking-tight mb-8">
                                WHAT YOU'LL<br /><span className="text-[#d4ff00]">GET.</span>
                            </motion.h2>
                            <motion.div variants={fadeInUp} className="space-y-6">
                                {[
                                    { title: "Clear Business Framework", desc: "No confusion, no random YouTube chaos." },
                                    { title: "Decision-Making Clarity", desc: "Know exactly what to test, avoid, scale." },
                                    { title: "Risk Awareness", desc: "Understand refunds, suppliers, disputes." },
                                    { title: "Execution Logic", desc: "Structured approach instead of guessing." },
                                    { title: "Realistic Expectations", desc: "Business mindset, not hype mindset." }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <Check className="w-5 h-5 text-[#d4ff00] mt-1 shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-white">{item.title}</h4>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                        <div className="relative aspect-square md:aspect-auto md:h-full bg-white/5 border border-white/10 p-8 flex items-center justify-center">
                            <div className="text-center">
                                <span className="block text-[8rem] leading-none font-black text-[#d4ff00] opacity-20">1%</span>
                                <span className="block text-2xl font-bold tracking-tight">EXECUTION<br />OVER HYPE</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== SECTION 5-7: PHILOSOPHY GRID ==================== */}
            <section className="py-24 px-6 bg-[#d4ff00] text-black">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-1">
                    {[
                        {
                            head: "TRUST IS YOUR CURRENCY",
                            body: "Customers don’t buy products. They buy confidence. Payment systems and store credibility directly influence conversions."
                        },
                        {
                            head: "SUPPLIER IS YOUR BACKBONE",
                            body: "Quality control, shipping expectations, refund risks, and scaling transition logic. This is where businesses break."
                        },
                        {
                            head: "TRAFFIC IS THE LIFELINE",
                            body: "Visibility without strategy is wasted effort. This course teaches structured testing logic, not gambling."
                        }
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-black text-white p-10 flex flex-col justify-between min-h-[300px] hover:bg-gray-900 transition-colors"
                        >
                            <div>
                                <span className="block text-[#d4ff00] font-mono text-xs mb-4">PRINCIPLE 0{i + 1}</span>
                                <h3 className="text-2xl font-black uppercase mb-6 leading-none">{card.head}</h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed border-t border-white/10 pt-6">
                                {card.body}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ==================== SECTION 8-9: FAILURE & SUPPORT ==================== */}
            <section className="py-24 px-6 border-b border-white/10">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <AlertTriangle className="w-6 h-6 text-[#FF2C2C]" />
                            <span className="font-mono text-sm tracking-widest text-[#FF2C2C]">WARNING SIGNALS</span>
                        </div>
                        <h3 className="text-3xl font-black mb-6">WHY STORES FAIL.</h3>
                        <ul className="space-y-4">
                            {['Poor product selection', 'Bad supplier decisions', 'Unrealistic expectations', 'Scaling without testing', 'Ignoring customer support'].map((fail, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-400">
                                    <X className="w-4 h-4 text-[#FF2C2C]" />
                                    {fail}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-6 h-6 text-[#d4ff00]" />
                            <span className="font-mono text-sm tracking-widest text-[#d4ff00]">INSURANCE POLICY</span>
                        </div>
                        <h3 className="text-3xl font-black mb-6">SUPPORT PHILOSOPHY.</h3>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Support isn't just answering emails. It's <span className="text-white">business insurance</span>.
                        </p>
                        <div className="grid grid-cols-1 gap-4">
                            {['Trust preservation', 'Chargeback prevention', 'Reputation protection'].map((item, i) => (
                                <div key={i} className="p-4 border border-white/10 bg-white/5">
                                    <span className="font-bold text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== SECTION 10: TESTIMONIALS ==================== */}
            <section className="py-24 px-6 bg-black">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl font-black mb-4">REAL RESULTS.</h2>
                    <p className="text-gray-500">Stories from students building global stores.</p>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="p-10 bg-[#0a0a0a] border-l-4 border-[#d4ff00]">
                        <p className="text-xl text-gray-300 italic mb-8">
                            "Before this, I was jumping between random tutorials. Now I understand how to evaluate products logically."
                        </p>
                        <div>
                            <p className="font-bold text-white">Binil</p>
                            <p className="text-xs text-gray-500">Dropshipping V2.0 Alumni</p>
                        </div>
                    </div>
                    <div className="p-10 bg-[#0a0a0a] border-l-4 border-[#d4ff00]">
                        <p className="text-xl text-gray-300 italic mb-8">
                            "This course removed confusion. Everything feels structured."
                        </p>
                        <div>
                            <p className="font-bold text-white">Abhay</p>
                            <p className="text-xs text-gray-500">Dropshipping V2.0 Alumni</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== FINAL CTA ==================== */}
            <section className="py-24 px-6 border-t border-white/10 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-[3rem] md:text-[5rem] font-black leading-[0.9] mb-8 text-[#d4ff00]">
                        BUILD<br />AUTHORITY.
                    </h2>
                    <Link to="/internationaldropshipping" className="inline-block px-12 py-5 bg-white text-black font-black text-xl hover:bg-gray-200 transition-colors">
                        GET STARTED
                    </Link>
                </div>
            </section>

        </div>
    );
}

// Icon helper
function SearchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}

export default DropshippingCourseContent;

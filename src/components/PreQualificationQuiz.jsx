import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Analytics Event Tracking Helper
const trackEvent = (eventName, properties = {}) => {
    console.log(`[Analytics] ${eventName}`, properties);
    if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', eventName, properties);
    }
};

// Quiz Questions with Icons and Scoring - OPTIMIZED FOR LEAD GEN
const QUIZ_QUESTIONS = [
    {
        id: 'experience',
        question: "What's your current editing experience?",
        subtext: "Be honest — we'll match you with the right path",
        options: [
            {
                value: 'beginner',
                label: 'Complete Beginner',
                description: 'Never edited or just started',
                icon: '🌱',
                score: 1
            },
            {
                value: 'learning',
                label: 'Edited 5-10 Videos',
                description: 'Learning the basics',
                icon: '📚',
                score: 2
            },
            {
                value: 'practicing',
                label: 'Edited 20+ Videos',
                description: 'Confident in my skills',
                icon: '🎬',
                score: 3
            },
            {
                value: 'ready',
                label: 'Ready for Clients',
                description: 'Need strategy, not tutorials',
                icon: '🚀',
                score: 4
            }
        ]
    },
    {
        id: 'goal',
        question: "What's your goal?",
        subtext: "This helps us understand your motivation",
        options: [
            {
                value: 'learning',
                label: 'Learn Video Editing',
                description: 'Want to build the skill',
                icon: '🎓',
                score: 2
            },
            {
                value: 'sideincome',
                label: 'Earn Side Income',
                description: 'Get paid while keeping my job',
                icon: '💰',
                score: 3
            },
            {
                value: 'freelance',
                label: 'Full-Time Freelance',
                description: 'Replace my job with editing',
                icon: '💼',
                score: 4
            },
            {
                value: 'agency',
                label: 'Build an Agency',
                description: 'Scale beyond just me',
                icon: '🏢',
                score: 4
            }
        ]
    },
    {
        id: 'readiness',
        question: "When do you want your first client?",
        subtext: "Timing matters for cohort matching",
        options: [
            {
                value: 'exploring',
                label: 'Just Exploring',
                description: 'Researching for now',
                icon: '🔍',
                score: 1
            },
            {
                value: 'months',
                label: 'Within 3 Months',
                description: 'Need some time to prepare',
                icon: '📆',
                score: 2
            },
            {
                value: 'sixweeks',
                label: 'In 6 Weeks',
                description: 'Ready for this program',
                icon: '✅',
                score: 3
            },
            {
                value: 'asap',
                label: 'ASAP',
                description: "Let's start now!",
                icon: '🔥',
                score: 4
            }
        ]
    }
];

// Calculate qualification result
const getQualificationResult = (answers) => {
    let totalScore = 0;
    let maxScore = QUIZ_QUESTIONS.length * 4;

    Object.values(answers).forEach(answer => {
        totalScore += answer.score;
    });

    const percentage = (totalScore / maxScore) * 100;

    if (percentage >= 70) {
        return {
            qualified: true,
            tier: 'high',
            message: "You're an excellent fit!",
            subtext: "Based on your answers, you're exactly who we designed this program for."
        };
    } else if (percentage >= 45) {
        return {
            qualified: true,
            tier: 'medium',
            message: "You could be a good fit",
            subtext: "Watch the breakdown to see if this aligns with where you are right now."
        };
    } else {
        return {
            qualified: true,
            tier: 'low',
            message: "This program might be advanced for your current stage",
            subtext: "You can still watch the breakdown, but consider building more basics first."
        };
    }
};

function PreQualificationQuiz({ onComplete }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const currentQuestion = QUIZ_QUESTIONS[currentStep];
    const progress = ((currentStep) / QUIZ_QUESTIONS.length) * 100;

    const handleOptionSelect = (option) => {
        setSelectedOption(option);

        // Track selection
        trackEvent('quiz_answer', {
            question_id: currentQuestion.id,
            answer: option.value,
            step: currentStep + 1
        });

        // Save answer
        const newAnswers = {
            ...answers,
            [currentQuestion.id]: option
        };
        setAnswers(newAnswers);

        // Auto-advance after short delay
        setTimeout(() => {
            if (currentStep < QUIZ_QUESTIONS.length - 1) {
                setCurrentStep(prev => prev + 1);
                setSelectedOption(null);
            } else {
                // Calculate and show result
                const qualResult = getQualificationResult(newAnswers);
                setResult(qualResult);
                setShowResult(true);

                trackEvent('quiz_completed', {
                    result: qualResult.tier,
                    qualified: qualResult.qualified,
                    total_questions: QUIZ_QUESTIONS.length
                });
            }
        }, 400);
    };

    const handleContinue = () => {
        if (result) {
            onComplete(result.qualified, result.tier, answers);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <AnimatePresence mode="wait">
                {!showResult ? (
                    <motion.div
                        key={`question-${currentStep}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
                                <button
                                    onClick={() => {
                                        trackEvent('quiz_skipped', { at_step: currentStep + 1 });
                                        onComplete(true, 'medium', {});
                                    }}
                                    className="text-emerald-500 hover:text-emerald-400 underline transition-colors"
                                >
                                    Skip to video →
                                </button>
                            </div>
                            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                                    initial={{ width: `${progress}%` }}
                                    animate={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>

                        {/* Question */}
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                {currentQuestion.question}
                            </h2>
                            <p className="text-gray-400 text-sm">
                                {currentQuestion.subtext}
                            </p>
                        </div>

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {currentQuestion.options.map((option, index) => (
                                <motion.button
                                    key={option.value}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`
                                        relative p-4 rounded-xl border text-left transition-all duration-300 group
                                        ${selectedOption?.value === option.value
                                            ? 'bg-emerald-600/20 border-emerald-500 scale-[1.02]'
                                            : 'bg-gray-900/50 border-gray-700/50 hover:border-gray-600 hover:bg-gray-800/50'
                                        }
                                    `}
                                >
                                    <div className="flex items-start gap-3">
                                        {/* Icon */}
                                        <div className={`
                                            w-12 h-12 rounded-lg flex items-center justify-center text-2xl
                                            transition-all duration-300
                                            ${selectedOption?.value === option.value
                                                ? 'bg-emerald-500/30 scale-110'
                                                : 'bg-gray-800 group-hover:bg-gray-700 group-hover:scale-105'
                                            }
                                        `}>
                                            {option.icon}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className={`
                                                font-semibold text-base transition-colors
                                                ${selectedOption?.value === option.value
                                                    ? 'text-emerald-400'
                                                    : 'text-white group-hover:text-emerald-300'
                                                }
                                            `}>
                                                {option.label}
                                            </p>
                                            <p className="text-gray-400 text-xs mt-0.5 line-clamp-2">
                                                {option.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Selection indicator */}
                                    {selectedOption?.value === option.value && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute top-3 right-3 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
                                        >
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </motion.div>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-center space-y-6 py-8"
                    >
                        {/* Result Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className={`
                                w-20 h-20 rounded-full mx-auto flex items-center justify-center text-4xl
                                ${result.qualified
                                    ? 'bg-emerald-500/20 border-2 border-emerald-500/50'
                                    : 'bg-gray-800 border-2 border-gray-600'
                                }
                            `}
                        >
                            {result.qualified ? '✨' : '🕐'}
                        </motion.div>

                        {/* Result Message */}
                        <div className="space-y-2">
                            <h2 className={`text-2xl sm:text-3xl font-bold ${result.qualified ? 'text-emerald-400' : 'text-gray-300'}`}>
                                {result.message}
                            </h2>
                            <p className="text-gray-400 max-w-md mx-auto">
                                {result.subtext}
                            </p>
                        </div>

                        {/* CTA */}
                        {result.qualified ? (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                onClick={handleContinue}
                                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transform hover:-translate-y-0.5"
                            >
                                Watch the Free Breakdown →
                            </motion.button>
                        ) : (
                            <div className="space-y-4">
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    onClick={handleContinue}
                                    className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300"
                                >
                                    Join the Waitlist →
                                </motion.button>
                                <p className="text-gray-500 text-sm">
                                    Or <button onClick={handleContinue} className="text-emerald-500 hover:underline">watch the video anyway</button>
                                </p>
                            </div>
                        )}

                        {/* Score visualization (subtle) */}
                        {result.qualified && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex items-center justify-center gap-2 text-xs text-gray-500"
                            >
                                <span>Your fit score:</span>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div
                                            key={i}
                                            className={`w-2 h-2 rounded-full ${(result.tier === 'high' && i <= 5) ||
                                                (result.tier === 'medium' && i <= 3)
                                                ? 'bg-emerald-500'
                                                : 'bg-gray-700'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span>{result.tier === 'high' ? 'Excellent' : 'Good'}</span>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default PreQualificationQuiz;

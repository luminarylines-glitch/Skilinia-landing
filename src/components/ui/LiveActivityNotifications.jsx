import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Names and cities for realistic notifications - Kerala focused, mostly male
const NAMES = [
    'Arun', 'Vishnu', 'Rahul', 'Arjun', 'Akhil', 'Jibin', 'Ajay', 'Anoop',
    'Midhun', 'Sreeraj', 'Jithin', 'Abhijith', 'Sreejith', 'Nandhu', 'Priya', 'Ashwin'
];

const CITIES = [
    'Kochi', 'Thrissur', 'Kozhikode', 'Trivandrum', 'Kannur', 'Palakkad', 'Kottayam',
    'Malappuram', 'Kollam', 'Alappuzha', 'Ernakulam', 'Kasaragod', 'Wayanad', 'Idukki'
];

const ACTIONS = [
    { text: 'just applied', emoji: '📝' },
    { text: 'secured their spot', emoji: '🎉' },
    { text: 'joined the waitlist', emoji: '⏳' },
    { text: 'is viewing this page', emoji: '👀' },
];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomMinutes = () => Math.floor(Math.random() * 12) + 1;

export default function LiveActivityNotifications({ isEnabled = true }) {
    const [notification, setNotification] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isEnabled) return;

        // Initial delay before first notification (8-15 seconds)
        const initialDelay = 8000 + Math.random() * 7000;

        const showNotification = () => {
            const name = getRandomItem(NAMES);
            const city = getRandomItem(CITIES);
            const action = getRandomItem(ACTIONS);
            const minutes = getRandomMinutes();

            setNotification({
                name,
                city,
                action: action.text,
                emoji: action.emoji,
                time: action.text.includes('viewing') ? 'right now' : `${minutes} min ago`
            });
            setIsVisible(true);

            // Hide after 4 seconds
            setTimeout(() => {
                setIsVisible(false);
            }, 4000);
        };

        // First notification
        const firstTimer = setTimeout(showNotification, initialDelay);

        // Recurring notifications every 15-30 seconds
        const interval = setInterval(() => {
            showNotification();
        }, 15000 + Math.random() * 15000);

        return () => {
            clearTimeout(firstTimer);
            clearInterval(interval);
        };
    }, [isEnabled]);

    if (!notification) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: -400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -400, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-6 left-6 z-[90] max-w-xs"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-3 px-4 py-3 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl"
                    >
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4ff00] to-emerald-500 flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                            {notification.name[0]}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                                <span className="text-[#d4ff00]">{notification.name}</span> from {notification.city}
                            </p>
                            <p className="text-gray-400 text-xs flex items-center gap-1">
                                <span>{notification.emoji}</span>
                                <span>{notification.action}</span>
                                <span className="text-gray-600">•</span>
                                <span className="text-gray-500">{notification.time}</span>
                            </p>
                        </div>

                        {/* Verification badge */}
                        <div className="text-emerald-400 flex-shrink-0">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Progress bar for auto-dismiss */}
                    <motion.div
                        initial={{ scaleX: 1 }}
                        animate={{ scaleX: 0 }}
                        transition={{ duration: 4, ease: "linear" }}
                        className="h-0.5 bg-[#d4ff00]/50 rounded-full mt-1 origin-left"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

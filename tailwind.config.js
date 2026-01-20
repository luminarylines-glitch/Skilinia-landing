/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                emerald: {
                    500: '#017F4C',
                    600: '#01663D', // Primary Brand Color
                    700: '#014D2D',
                    800: '#01331F',
                    900: '#002616',
                },
                gray: {
                    850: '#1a1a1a',
                    900: '#111111',
                    950: '#0a0a0a', // Deep Charcoal/Black
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Antonio', 'sans-serif'], // Tall, condensed display font
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                glow: {
                    'from': { boxShadow: '0 0 10px -2px rgba(1, 102, 61, 0.3)' },
                    'to': { boxShadow: '0 0 20px 2px rgba(1, 102, 61, 0.6)' },
                }
            }
        },
    },
    plugins: [],
}

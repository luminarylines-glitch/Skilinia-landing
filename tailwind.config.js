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
                    500: '#10B981', // Restore default emerald for flexibility, or use a specific premium one if needed. Keeping standard for now but avoiding heavy use.
                    600: '#01663D', // Primary Brand Color (Deep, rich green)
                    700: '#014D2D',
                    800: '#01331F',
                    900: '#002616',
                },
                gray: {
                    850: '#1a1a1a', // Keep custom gray
                    900: '#111111', // Almost black
                    950: '#0a0a0a', // Deep Charcoal/Black
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['"Inter Tight"', 'sans-serif'], // Replaced Antonio with Inter Tight
            },
            backgroundImage: {
                'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'shimmer': 'shimmer 2.5s infinite',
                'ripple': 'ripple 0.6s ease-out forwards',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'spin-slow': 'spin 3s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                ripple: {
                    '0%': { width: '0', height: '0', opacity: '0.5' },
                    '100%': { width: '200px', height: '200px', opacity: '0' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 30px rgba(212,255,0,0.5), 0 0 60px rgba(212,255,0,0.3)' },
                    '50%': { boxShadow: '0 0 50px rgba(212,255,0,0.7), 0 0 80px rgba(212,255,0,0.5), 0 0 100px rgba(212,255,0,0.3)' },
                },
            }
        },
    },
    plugins: [],
}

import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#020202",
          panel: "#0F0F0F",
          border: "#1F1F1F",
          gold: "#E3B52E"
        },
        gg: {
          black: '#050505',
          panel: '#0B0B0B',
          panel2: '#0F0F0F',
          border: '#1C1C1C',
          gold: '#E3B52E',
          gold2: '#CFA31D',
          ink: '#F4F4F4'
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.45s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;

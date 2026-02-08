/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Primary Colors */
        primary: {
          DEFAULT: 'var(--color-primary)', /* teal-400 */
          foreground: 'var(--color-primary-foreground)' /* white */
        },
        
        /* Secondary Colors */
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* teal-800 */
          foreground: 'var(--color-secondary-foreground)' /* white */
        },
        
        /* Accent Colors */
        accent: {
          DEFAULT: 'var(--color-accent)', /* red-400 */
          foreground: 'var(--color-accent-foreground)' /* white */
        },
        
        /* Background Colors */
        background: 'var(--color-background)', /* gray-50 / slate-900 */
        foreground: 'var(--color-foreground)', /* gray-900 / slate-200 */
        
        /* Surface Colors */
        card: {
          DEFAULT: 'var(--color-card)', /* white / slate-800 */
          foreground: 'var(--color-card-foreground)' /* gray-900 / slate-200 */
        },
        
        /* Popover Colors */
        popover: {
          DEFAULT: 'var(--color-popover)', /* white / slate-800 */
          foreground: 'var(--color-popover-foreground)' /* gray-900 / slate-200 */
        },
        
        /* Muted Colors */
        muted: {
          DEFAULT: 'var(--color-muted)', /* gray-100 / slate-700 */
          foreground: 'var(--color-muted-foreground)' /* gray-500 / slate-400 */
        },
        
        /* Border & Input */
        border: 'var(--color-border)', /* gray-400 with opacity */
        input: 'var(--color-input)', /* gray-400 with opacity */
        ring: 'var(--color-ring)', /* teal-400 */
        
        /* Status Colors */
        success: {
          DEFAULT: 'var(--color-success)', /* green-500 / green-600 */
          foreground: 'var(--color-success-foreground)' /* white */
        },
        
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber-500 / amber-600 */
          foreground: 'var(--color-warning-foreground)' /* white */
        },
        
        error: {
          DEFAULT: 'var(--color-error)', /* red-500 / red-600 */
          foreground: 'var(--color-error-foreground)' /* white */
        },
        
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-500 / red-600 */
          foreground: 'var(--color-destructive-foreground)' /* white */
        },
        
        /* Text Colors */
        'text-primary': 'var(--color-text-primary)', /* gray-900 / slate-200 */
        'text-secondary': 'var(--color-text-secondary)' /* gray-500 / slate-400 */
      },
      
      borderRadius: {
        DEFAULT: 'var(--radius)', /* 12px */
        sm: 'var(--radius-sm)', /* 8px */
        lg: 'var(--radius-lg)', /* 18px */
        xl: 'var(--radius-xl)' /* 24px */
      },
      
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['Inter', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace']
      },
      
      fontSize: {
        'h1': ['2.25rem', { lineHeight: '1.2' }],
        'h2': ['1.875rem', { lineHeight: '1.25' }],
        'h3': ['1.5rem', { lineHeight: '1.3' }],
        'h4': ['1.25rem', { lineHeight: '1.4' }],
        'h5': ['1.125rem', { lineHeight: '1.5' }],
        'caption': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.025em' }]
      },
      
      boxShadow: {
        'sm': '0 1px 3px rgba(15, 23, 42, 0.08)',
        'DEFAULT': '0 2px 4px rgba(15, 23, 42, 0.08)',
        'md': '0 4px 8px rgba(15, 23, 42, 0.1)',
        'lg': '0 8px 16px rgba(15, 23, 42, 0.12)',
        'xl': '0 20px 25px -5px rgba(15, 23, 42, 0.1)',
        'nav': '0 -2px 8px rgba(15, 23, 42, 0.08)',
        'nav-top': '0 2px 8px rgba(15, 23, 42, 0.08)'
      },
      
      transitionDuration: {
        '250': '250ms'
      },
      
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      
      spacing: {
        '4.5': '1.125rem',
        '18': '4.5rem'
      },
      
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300'
      },
      
      animation: {
        'shimmer': 'shimmer 2s infinite'
      },
      
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    })
  ]
}

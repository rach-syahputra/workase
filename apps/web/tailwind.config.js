/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      width: {
        sidebar: 'var(--sidebar-width)',
        'bottom-bar': 'var(--bottom-bar-height)',
        'assessment-session-header-height':
          'var(--assessment-session-header-height)',
        'assessment-session-navbar-height':
          'var(--assessment-session-navbar-height)',
      },
      spacing: {
        sidebar: 'var(--sidebar-width)',
        'bottom-bar': 'var(--bottom-bar-height)',
        'assessment-session-header-height':
          'var(--assessment-session-header-height)',
        'assessment-session-navbar-height':
          'var(--assessment-session-navbar-height)',
      },
      margin: {
        sidebar: 'var(--sidebar-width)',
        'bottom-bar': 'var(--bottom-bar-height)',
        'assessment-session-header-height':
          'var(--assessment-session-header-height)',
        'assessment-session-navbar-height':
          'var(--assessment-session-navbar-height)',
      },
      screens: {
        sm: '440px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        'primary-blue': 'var(--primary-blue)',
        'primary-blue-hover': 'var(--primary-blue-hover)',
        'primary-dark-blue': 'var(--primary-dark-blue)',
        'primary-dark': 'var(--primary-dark)',
        'primary-dark-background': 'var(--primary-dark-background)',
        'primary-gray': 'var(--primary-gray)',
        'primary-gray-background': 'var(--primary-gray-background)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
  	screens: {
  		xs: '375px',
  		sm: '640px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1536px'
  	},
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '1rem',
  			xs: '1rem',
  			sm: '1.5rem',
  			md: '2rem',
  			lg: '2rem',
  			xl: '2.5rem',
  			'2xl': '3rem'
  		},
  		screens: {
  			xs: '100%',
  			sm: '100%',
  			md: '100%',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			sans: [
  				'ui-sans-serif',
  				'system-ui',
  				'sans-serif',
  				'Apple Color Emoji',
  				'Segoe UI Emoji',
  				'Segoe UI Symbol',
  				'Noto Color Emoji'
  			],
  			display: [
  				'Plus Jakarta Sans',
  				'system-ui',
  				'sans-serif'
  			],
  			serif: [
  				'ui-serif',
  				'Georgia',
  				'Cambria',
  				'Times New Roman',
  				'Times',
  				'serif'
  			],
  			mono: [
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'Monaco',
  				'Consolas',
  				'Liberation Mono',
  				'Courier New',
  				'monospace'
  			]
  		},
  		fontSize: {
  			xs: [
  				'var(--text-xs)',
  				{
  					lineHeight: 'var(--leading-normal)'
  				}
  			],
  			sm: [
  				'var(--text-sm)',
  				{
  					lineHeight: 'var(--leading-normal)'
  				}
  			],
  			base: [
  				'var(--text-base)',
  				{
  					lineHeight: 'var(--leading-relaxed)'
  				}
  			],
  			lg: [
  				'var(--text-lg)',
  				{
  					lineHeight: 'var(--leading-relaxed)'
  				}
  			],
  			xl: [
  				'var(--text-xl)',
  				{
  					lineHeight: 'var(--leading-snug)'
  				}
  			],
  			'2xl': [
  				'var(--text-2xl)',
  				{
  					lineHeight: 'var(--leading-snug)'
  				}
  			],
  			'3xl': [
  				'var(--text-3xl)',
  				{
  					lineHeight: 'var(--leading-tight)'
  				}
  			],
  			'4xl': [
  				'var(--text-4xl)',
  				{
  					lineHeight: 'var(--leading-tight)'
  				}
  			],
  			'5xl': [
  				'var(--text-5xl)',
  				{
  					lineHeight: 'var(--leading-tight)'
  				}
  			],
  			'6xl': [
  				'var(--text-6xl)',
  				{
  					lineHeight: 'var(--leading-tight)'
  				}
  			],
  			'7xl': [
  				'var(--text-7xl)',
  				{
  					lineHeight: 'var(--leading-tight)'
  				}
  			]
  		},
  		lineHeight: {
  			none: 'var(--leading-none)',
  			tight: 'var(--leading-tight)',
  			snug: 'var(--leading-snug)',
  			normal: 'var(--leading-normal)',
  			relaxed: 'var(--leading-relaxed)',
  			loose: 'var(--leading-loose)'
  		},
  		letterSpacing: {
  			tighter: 'var(--tracking-tighter)',
  			tight: 'var(--tracking-tight)',
  			normal: 'var(--tracking-normal)',
  			wide: 'var(--tracking-wide)',
  			wider: 'var(--tracking-wider)',
  			widest: 'var(--tracking-widest)'
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))',
  				light: 'hsl(var(--primary-light))',
  				dark: 'hsl(var(--primary-dark))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			success: {
  				DEFAULT: 'hsl(var(--success))',
  				light: 'hsl(var(--success-light))'
  			},
  			warning: 'hsl(var(--warning))',
  			info: 'hsl(var(--info))',
  			status: {
  				optimal: 'hsl(var(--status-optimal))',
  				good: 'hsl(var(--status-good))',
  				caution: 'hsl(var(--status-caution))',
  				attention: 'hsl(var(--status-attention))',
  				critical: 'hsl(var(--status-critical))'
  			},
  			'chart-health': {
  				underweight: 'hsl(var(--chart-underweight))',
  				normal: 'hsl(var(--chart-normal))',
  				overweight: 'hsl(var(--chart-overweight))',
  				obese: 'hsl(var(--chart-obese))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			'deep-charcoal': 'hsl(var(--deep-charcoal))',
  			'pure-white': 'hsl(var(--pure-white))',
  			'warm-stone': 'hsl(var(--warm-stone))',
  			'soft-linen': 'hsl(var(--soft-linen))',
  			'rich-black': 'hsl(var(--rich-black))',
  			'warm-gray': 'hsl(var(--warm-gray))',
  			'light-cloud': 'hsl(var(--light-cloud))',
  			'neutral-gray': 'hsl(var(--neutral-gray))',
  			'accent-gold': 'hsl(var(--accent-gold))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			marquee: {
  				'0%': {
  					transform: 'translateX(0)'
  				},
  				'100%': {
  					transform: 'translateX(-50%)'
  				}
  			},
  			'fade-in': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			'fade-in-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(16px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'fade-in-down': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(-16px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'fade-out-up': {
  				'0%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				},
  				'100%': {
  					opacity: '0',
  					transform: 'translateY(-8px)'
  				}
  			},
  			'scale-in': {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.96)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			'scale-out': {
  				'0%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				},
  				'100%': {
  					opacity: '0',
  					transform: 'scale(0.96)'
  				}
  			},
  			'slide-in-right': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(24px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			'slide-in-left': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(-24px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			'slide-in-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(24px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '-200% 0'
  				},
  				'100%': {
  					backgroundPosition: '200% 0'
  				}
  			},
  			'pulse-subtle': {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.7'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-4px)'
  				}
  			},
  			'glow-pulse': {
  				'0%, 100%': {
  					boxShadow: '0 0 20px hsl(41 51% 59% / 0.15)'
  				},
  				'50%': {
  					boxShadow: '0 0 30px hsl(41 51% 59% / 0.25)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
  			'accordion-up': 'accordion-up 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
  			marquee: 'marquee 30s linear infinite',
  			'fade-in': 'fade-in 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
  			'fade-in-up': 'fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  			'fade-in-down': 'fade-in-down 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  			'fade-out-up': 'fade-out-up 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  			'scale-in': 'scale-in 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
  			'scale-out': 'scale-out 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  			'slide-in-right': 'slide-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  			'slide-in-left': 'slide-in-left 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  			'slide-in-up': 'slide-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  			shimmer: 'shimmer 2s linear infinite',
  			'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
  			float: 'float 3s ease-in-out infinite'
  		},
  		transitionTimingFunction: {
  			premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
  			'premium-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  			'premium-in': 'cubic-bezier(0.4, 0, 1, 1)'
  		},
  		boxShadow: {
  			'2xs': 'var(--shadow-2xs)',
  			xs: 'var(--shadow-xs)',
  			sm: 'var(--shadow-sm)',
  			md: 'var(--shadow-md)',
  			lg: 'var(--shadow-lg)',
  			xl: 'var(--shadow-xl)',
  			'2xl': 'var(--shadow-2xl)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

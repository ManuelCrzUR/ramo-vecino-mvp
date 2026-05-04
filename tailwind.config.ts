import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ramo: {
          yellow: '#FFD700',      // Amarillo Ramo (principal)
          red: '#E30613',         // Rojo Ramo
          chocolate: '#3D1F0F',   // Chocolate (oscuro)
          cream: '#FFF8E7',       // Crema (fondo)
          white: '#FFFFFF',
          dark: '#1a1a1a',        // Texto oscuro
          gray: '#6B7280',        // Gris neutral
          lightGray: '#F3F4F6',   // Gris claro
          border: '#E5E7EB',      // Bordes
          success: '#10B981',
          alert: '#F97316',
        },
      },
      backgroundImage: {
        'ramo-gradient': 'linear-gradient(135deg, #FFD700 0%, #E30613 50%, #FFD700 100%)',
        'ramo-pattern': "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h10v10H0z\" fill=\"%23FFD700\" fill-opacity=\"0.05\"/%3E%3C/svg%3E')",
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        slideUp: 'slideUp 0.5s ease-out',
        fadeIn: 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config

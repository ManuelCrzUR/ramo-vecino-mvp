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
          blue: '#0099FF',        // Azul principal (cliente)
          blueDark: '#0078D4',    // Azul oscuro (links)
          red: '#E30613',         // Rojo principal (panadero)
          white: '#FFFFFF',       // Blanco
          grayDark: '#1F2937',    // Gris oscuro (texto)
          grayLight: '#F3F4F6',   // Gris claro (fondos)
          grayBorder: '#E5E7EB',  // Gris bordes
          success: '#10B981',     // Verde éxito
          alert: '#F97316',       // Naranja alerta
        },
      },
      backgroundImage: {
        'ramo-gradient-splash': 'linear-gradient(135deg, #0099FF 0%, #E30613 50%, #0099FF 100%)',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

export default config

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A365D',      // 深靛蓝 - 主色调
        secondary: '#4A6F5D',    // 自然绿 - 进度指示
        trace: '#8B6B4E',        // 土褐色 - 历史轨迹
        neutral: '#F5F5F0',      // 米白色 - 背景
        success: '#2E7D32',
        warning: '#E65100',
        danger: '#C62828',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
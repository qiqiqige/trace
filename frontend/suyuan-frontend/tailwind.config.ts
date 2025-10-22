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
        primary: '#0B1220',      // 夜空蓝 - 主背景
        secondary: '#7C3AED',    // 灵光紫 - 品牌强调
        trace: '#38BDF8',        // 天蓝光 - 高亮/动效
        neutral: '#E6EAF2',      // 雪灰白 - 文案/图标
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
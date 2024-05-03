module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}", // 这会匹配 pages 目录下所有的 JS 和 JSX 文件
    "./components/**/*.{js,jsx,ts,tsx}", // 如果你有 components 目录，也应该加上
    "./src/**/*.{js,jsx,ts,tsx}" // 如果有其他源代码目录，也加入类似的模式
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

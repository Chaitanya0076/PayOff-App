/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{sm:'360px',
             md:'450px',
             lg: '750px',
             xl: '1050px',
            },
    extend: {},
  },
  plugins: [],
}


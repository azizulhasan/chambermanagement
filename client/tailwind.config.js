/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                themeColor: 'rgb(103, 147, 75)',
            },
            screens: {
                xs: '400px',
            },
        },
    },
    plugins: [],
};

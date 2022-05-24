module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Noto Sans TC', 'sans-serif'],
      paytone: ['Paytone One', 'serif'],
      azeret: ['Azeret Mono', ' monospace'],
      baloo: ['Baloo Da 2', 'cursive'],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#03438D',
        },
        secondary: '#EFECE7',
        warning: '#EEC32A',
        alert: '#F57375',
        black: '#000400',
        subtitle: '#9B9893',
        'disabled-color': '#A8B0B9',
        apple: {
          red: '#DE4B63',
          yellow: '#FAA722',
          green: '#83C51D',
        },
      },
      boxShadow: {
        btn: '-2px 2px 0px #000400',
        post: '0px 3px 0px #000400',
        login: '-8px 8px 0px #00040029',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

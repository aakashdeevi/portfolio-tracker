module.exports = {
  theme: {
    extend: {
      animation: {
        typing: 'typing 3.5s steps(40) 1s infinite normal both',
        blink: 'blink 0.75s step-end infinite'
      },
      keyframes: {
        typing: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%': { borderColor: 'transparent' },
          '100%': { borderColor: 'transparent' },
        },
      },
    },
  },
};

const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'theme-blue-100': '#2246c9',
        'theme-blue-200': '#001b65'
      },
      minHeight: {
        // '0': '0',
        // '1/4': '25%',
        // '1/2': '50%',
        // '3/4': '75%',
        // 'full': '100%',
        '1/3-screen': 'calc(100vh / 3)',
        '2/3-screen': 'calc(100vh / 1.5)',
        '1/4-screen': 'calc(100vh / 4)',
        '3/4-screen': 'calc(100vh / 1.33)',
      },
      maxHeight: {
        '100': '520px',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        bb: {
          primary: '#255700',
          secondary: '#c86251',
          accent: '#fda427',
          neutral: '#2b2928',
          'base-100': '#ffffff',
          'base-200': '#f7f8fd',
          'base-300': '#ecf0f3',
          'base-content': '#2b2928',
          info: '#40e2f1',
          success: '#13cebb',
          warning: '#eab76b',
          error: '#e0633a'

        },
      }
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
};

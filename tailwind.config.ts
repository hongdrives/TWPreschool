import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        teal:     'var(--teal)',
        'teal-dk':'var(--teal-dk)',
        'teal-lt':'var(--teal-lt)',
        'teal-xl':'var(--teal-xl)',
        cream:    'var(--cream)',
        sand:     'var(--sand)',
        blush:    'var(--blush)',
        gold:     'var(--gold)',
        ink:      'var(--ink)',
        grey:     'var(--grey)',
        mid:      'var(--mid)',
        border:   'var(--border)',
      },
      fontFamily: {
        serif: ['var(--serif)'],
        sans:  ['var(--sans)'],
      },
    },
  },
  plugins: [],
}

export default config

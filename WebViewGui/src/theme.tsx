'use client';

import {
  createTheme,
  getContrastRatio,
  darken,
  lighten,
} from '@mui/material/styles';

const primaryMain = '#00479B';
const secondryMain = '#6974F9';

const greyMain = '#636B74';

export const themeVars = {
  cssVariables: true,

  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 760,
      lg: 1000,
      xl: 1360,
    },
  },

  typography: {
    fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
    h1: {
      fontSize: 'var(--mui-fontSize-xl4, 2.25rem)',
      fontWeight: 'var(--mui-fontWeight-xl, 700)'
    },
    h2: {
      fontSize: 'var(--mui-fontSize-xl3, 1.875rem)',
      fontWeight: 'var(--mui-fontWeight-xl, 700)'
    },
    h3: {
      fontSize: 'var(--mui-fontSize-xl2, 1.5rem)',
      fontWeight: 'var(--mui-fontWeight-lg, 600)'
    },
    h4: {
      fontSize: 'var(--mui-fontSize-xl, 1.25rem)',
      fontWeight: 'var(--mui-fontWeight-lg, 600)'
    },
    h5: {
      fontSize: 'var(--mui-fontSize-md, 1rem)',
      fontWeight: 'var(--mui-fontWeight-lg, 600)'
    },

    subtitle1: { // 차트 툴팁 라벨
      fontWeight: 'var(--mui-fontWeight-md, 500)'
    },

    subtitle2: { // 차트 툴팁 값
      fontWeight: 'var(--mui-fontWeight-lg, 600)'
    }
  },
  fontWeight: {
    sm: 300,
    md: 500,
    lg: 600,
    xl: 700,
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xl2: '1.5rem',
    xl3: '1.875rem',
    xl4: '2.25rem',
    xl5: '2.55rem',
  },

  shape: {
    borderRadius: 6,
    chartCardBorderRadius: 24
  },

  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',

      surface: 'var(--mui-palette-neutral-50, #FBFCFE)',
      level1: 'var(--mui-palette-neutral-100, #F0F4F8)',
      level2: 'var(--mui-palette-neutral-200, #DDE7EE)',
      level3: 'var(--mui-palette-neutral-300, #CDD7E1)',
      chartPaper: '#F1F2F2',
      chartCard: '#FFFFFF',
      footer: '#414244',
    },
    primary: {
      main: primaryMain,
      lightest: lighten(primaryMain, 0.93),
      lighter: lighten(primaryMain, 0.85),
      lighten: lighten(primaryMain, 0.7),
      moreLight: lighten(primaryMain, 0.50),
      light: lighten(primaryMain, 0.2),
      dark: darken(primaryMain, 0.2),
      contrastText: getContrastRatio(primaryMain, '#fff') > 2.5 ? '#fff' : '#111',
    },
    original: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondry: {
      main: secondryMain,
      light: lighten(secondryMain, 0.2),
      dark: darken(secondryMain, 0.2),
      contrastText: getContrastRatio(secondryMain, '#fff') > 2.5 ? '#fff' : '#111',
    },
    info: {
      main: greyMain,
      light: lighten(greyMain, 0.2),
      dark: darken(greyMain, 0.2),
      contrastText: getContrastRatio(greyMain, '#fff') > 2.5 ? '#fff' : '#111',
    },
    neutral: {
      50: '#FBFCFE',
      100: '#F0F4F8',
      200: '#DDE7EE',
      300: '#CDD7E1',
      400: '#9FA6AD',
      500: '#636B74',
      600: '#555E68',
      700: '#32383E',
      800: '#171A1C',
      900: '#0B0D0E',
      main: '#9e9e9e',
      light: lighten('#9e9e9e', 0.2),
      dark: darken('#9e9e9e', 0.2),
      plainColor: 'var(--mui-palette-neutral-700, #32383E)',
      softColor: 'var(--mui-palette-neutral-700, #32383E)',
      softHoverBg: 'var(--mui-palette-neutral-200, #DDE7EE)',
      outlinedBorder: 'var(--mui-palette-neutral-300, #CDD7E1)',
      outlinedDisabledColor: 'var(--mui-palette-neutral-400, #9FA6AD)',
    },
    Tooltip: {
      bg: 'rgba(97, 97, 97, 0.92)'
    },
    divider: 'rgba(var(--mui-palette-neutral-mainChannel, 99 107 116) / 0.2)',
    white: '#ffffff',
    black: '#000000',
    grey: '#999999',
  },

  components: {
  },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const theme = createTheme(themeVars);

export default theme;

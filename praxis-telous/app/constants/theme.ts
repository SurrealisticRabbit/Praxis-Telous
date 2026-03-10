'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c4dff', // Deep Purple
    },
    secondary: {
      main: '#009688', // Teal
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

export default theme;
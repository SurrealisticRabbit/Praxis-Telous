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
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c4dff', // Deep Purple
    },
    secondary: {
      main: '#69f0ae', // Teal Accent
    },
    background: {
      default: '#0f1214', // Rich dark background
      paper: '#1e2327',   // Slightly lighter paper
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Cleaner look without the default overlay
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(124, 77, 255, 0.12)',
            '&:hover': { backgroundColor: 'rgba(124, 77, 255, 0.2)' },
          },
        },
      },
    },
  },
});

export default theme;
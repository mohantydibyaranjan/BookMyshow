import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1d4ed8', // Blue-700
    },
    secondary: {
      main: '#FFD700', // Gold
    },
    common: {
      silver: '#C0C0C0',
    },
    background: {
      default: '#f3f4f6', // A very light grey for main content background
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#4b5563',
    },
  },
  typography: {
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'capitalize', // Capitalize first letter of button text
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 12px 0 rgba(0,0,0,0.08)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.12)',
          },
        },
      },
    },
  },
});

export default theme;
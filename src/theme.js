// src/theme.js
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#ff0055', // Neon Cyber-Red
    },
    secondary: {
      main: '#00f2ff', // Electric Cyan
    },
    background: {
      default: '#050505', // Deep Obsidian
      paper: '#121212',   // Slightly lighter for cards/surface
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  shape: {
    borderRadius: 12, // More modern, rounded look
  },
  overrides: {
    MuiCard: {
      root: {
        border: '1px solid rgba(255, 255, 255, 0.05)', // Subtle glass border
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)', // Slight lift
          boxShadow: '0 8px 20px rgba(255, 0, 85, 0.2)', // Neon glow
        },
      },
    },
  },
});

export default theme;

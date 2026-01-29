import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const ThemeContext = createContext();

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
};

const CustomThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [themeMode, setThemeMode] = useState('academic'); // 'academic' or 'professional'

  // Theme configurations
  const themeConfigs = {
    academic: {
      light: {
        primary: { main: '#1976d2', light: '#42a5f5', dark: '#1565c0' },
        secondary: { main: '#dc004e', light: '#ff5983', dark: '#9a0036' },
        background: {
          default: '#f8f9fa',
          paper: '#ffffff'
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#666666'
        }
      },
      dark: {
        primary: { main: '#42a5f5', light: '#80d6ff', dark: '#0077c2' },
        secondary: { main: '#ff5983', light: '#ff8bb3', dark: '#c62d56' },
        background: {
          default: '#121212',
          paper: '#1e1e1e'
        },
        text: {
          primary: '#ffffff',
          secondary: '#b3b3b3'
        }
      }
    },
    professional: {
      light: {
        primary: { main: '#2e7d32', light: '#60ad5e', dark: '#005005' },
        secondary: { main: '#ed6c02', light: '#ff9d3f', dark: '#b53d00' },
        background: {
          default: '#f5f5f5',
          paper: '#ffffff'
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#666666'
        }
      },
      dark: {
        primary: { main: '#60ad5e', light: '#92de8b', dark: '#2e7d32' },
        secondary: { main: '#ff9d3f', light: '#ffce70', dark: '#c66900' },
        background: {
          default: '#0a0a0a',
          paper: '#1a1a1a'
        },
        text: {
          primary: '#ffffff',
          secondary: '#b3b3b3'
        }
      }
    }
  };

  const createCustomTheme = () => {
    const config = themeConfigs[themeMode][darkMode ? 'dark' : 'light'];
    
    return createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        ...config
      },
      typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
      },
      shape: {
        borderRadius: 12
      },
      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              boxShadow: darkMode 
                ? '0 4px 20px rgba(0,0,0,0.3)' 
                : '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                boxShadow: darkMode 
                  ? '0 8px 30px rgba(0,0,0,0.4)' 
                  : '0 8px 30px rgba(0,0,0,0.15)',
              }
            }
          }
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 8,
              padding: '10px 24px',
              transition: 'all 0.3s ease'
            },
            contained: {
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
                transform: 'translateY(-2px)'
              }
            }
          }
        },
        MuiFab: {
          styleOverrides: {
            root: {
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
              '&:hover': {
                boxShadow: '0 8px 25px rgba(0,0,0,0.25)',
                transform: 'scale(1.05)'
              }
            }
          }
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)'
            }
          }
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              borderRight: 'none',
              boxShadow: '4px 0 20px rgba(0,0,0,0.1)'
            }
          }
        }
      }
    });
  };

  const theme = createCustomTheme();

  const value = {
    darkMode,
    setDarkMode,
    themeMode,
    setThemeMode,
    theme
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
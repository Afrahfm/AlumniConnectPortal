import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../context/ThemeContext';
import ProgressOutcomeTracker from '../components/ai/ProgressOutcomeTracker';
import FeedbackMentorReassignment from '../components/ai/FeedbackMentorReassignment';

const ProgressPage = () => {
  const navigate = useNavigate();
  const { themeMode: globalThemeMode } = useThemeMode();
  
  const themes = {
    academic: {
      primary: '#1976d2',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    professional: {
      primary: '#2e7d32',
      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
    }
  };
  
  const currentTheme = themes[globalThemeMode];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" sx={{ background: currentTheme.background }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/student/dashboard')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Progress & Analytics
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          Track Your Growth
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <ProgressOutcomeTracker />
          </Grid>
          <Grid item xs={12}>
            <FeedbackMentorReassignment />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProgressPage;
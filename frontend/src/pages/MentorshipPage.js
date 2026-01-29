import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
  Tabs,
  Tab
} from '@mui/material';
import { ArrowBack, Psychology, TrendingUp, Notes } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../context/ThemeContext';
import MentorMatching from '../components/mentorship/MentorMatching';
import ProgressTracker from '../components/mentorship/ProgressTracker';
import SessionNotes from '../components/mentorship/SessionNotes';

const MentorshipPage = () => {
  const navigate = useNavigate();
  const { themeMode: globalThemeMode } = useThemeMode();
  const [activeTab, setActiveTab] = useState('matching');
  
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
            Mentorship Hub
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          Your Mentorship Journey
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            centered
            sx={{
              '& .MuiTab-root': {
                minWidth: 160,
                fontWeight: 600,
                textTransform: 'none'
              }
            }}
          >
            <Tab label="AI Mentor Matching" value="matching" icon={<Psychology />} />
            <Tab label="Your Progress" value="progress" icon={<TrendingUp />} />
            <Tab label="Session Notes" value="notes" icon={<Notes />} />
          </Tabs>
        </Box>
        
        {activeTab === 'matching' && <MentorMatching />}
        {activeTab === 'progress' && <ProgressTracker />}
        {activeTab === 'notes' && <SessionNotes />}
      </Container>
    </Box>
  );
};

export default MentorshipPage;
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Zoom,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { ArrowBack, SmartToy, Menu, TableOfContents } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../context/ThemeContext';
import SkillGapAnalysis from '../components/ai/SkillGapAnalysis';
import RecommendedMentors from '../components/ai/RecommendedMentors';
import CareerRoadmap from '../components/ai/CareerRoadmap';
import AIMentorshipCompanion from '../components/ai/AIMentorshipCompanion';
import AIInsights from '../components/ai/AIInsights';
import SmartScheduling from '../components/ai/SmartScheduling';

const AIFeaturesPage = () => {
  const navigate = useNavigate();
  const { themeMode: globalThemeMode } = useThemeMode();
  const [aiCompanionOpen, setAiCompanionOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Debug logging
  useEffect(() => {
    console.log('AIFeaturesPage mounted successfully');
  }, []);
  
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

  const sections = [
    { id: 'skill-gap', title: 'Skill Gap Analysis' },
    { id: 'recommended-mentors', title: 'Recommended Mentors' },
    { id: 'career-roadmap', title: 'Personalized Career Roadmap' },
    { id: 'ai-insights', title: 'AI Mentorship Insights' },
    { id: 'smart-scheduling', title: 'Smart Scheduling' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTocOpen(false);
    }
  };

  const TableOfContents = () => (
    <Paper sx={{ p: 2, mb: 4, bgcolor: 'background.paper' }}>
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <TableOfContents sx={{ color: currentTheme.primary }} />
        Quick Navigation
      </Typography>
      <List dense>
        {sections.map((section, index) => (
          <ListItem key={section.id} disablePadding>
            <ListItemButton 
              onClick={() => scrollToSection(section.id)}
              sx={{ 
                borderRadius: 1,
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <ListItemText 
                primary={`${index + 1}. ${section.title}`}
                sx={{ '& .MuiListItemText-primary': { fontWeight: 500 } }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );

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
            AI-Powered Features
          </Typography>
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={() => setTocOpen(true)}
            >
              <Menu />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          Intelligent Learning Assistant
        </Typography>
        
        {!isMobile && <TableOfContents />}
        
        {/* Skill Gap Analysis Section */}
        <Box id="skill-gap" sx={{ mb: 6, scrollMarginTop: '80px' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 4, height: 24, bgcolor: currentTheme.primary, borderRadius: 1 }} />
            Skill Gap Analysis
          </Typography>
          <SkillGapAnalysis />
        </Box>
        
        {/* Recommended Mentors Section */}
        <Box id="recommended-mentors" sx={{ mb: 6, scrollMarginTop: '80px' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 4, height: 24, bgcolor: currentTheme.primary, borderRadius: 1 }} />
            Recommended Mentors
          </Typography>
          <RecommendedMentors />
        </Box>
        
        {/* Personalized Career Roadmap Section */}
        <Box id="career-roadmap" sx={{ mb: 6, scrollMarginTop: '80px' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 4, height: 24, bgcolor: currentTheme.primary, borderRadius: 1 }} />
            Personalized Career Roadmap
          </Typography>
          <CareerRoadmap />
        </Box>
        

        {/* AI Mentorship Insights Section */}
        <Box id="ai-insights" sx={{ mb: 6, scrollMarginTop: '80px' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 4, height: 24, bgcolor: currentTheme.primary, borderRadius: 1 }} />
            AI Mentorship Insights
          </Typography>
          <AIInsights />
        </Box>
        
        {/* Smart Scheduling Section */}
        <Box id="smart-scheduling" sx={{ mb: 6, scrollMarginTop: '80px' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 4, height: 24, bgcolor: currentTheme.primary, borderRadius: 1 }} />
            Smart Scheduling
          </Typography>
          <SmartScheduling />
        </Box>
      </Container>
      
      {/* AI Companion Floating Button */}
      <Zoom in={true} timeout={500}>
        <Fab
          color="primary"
          onClick={() => setAiCompanionOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: currentTheme.background,
            '&:hover': {
              transform: 'scale(1.1)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          <SmartToy sx={{ color: 'white' }} />
        </Fab>
      </Zoom>
      
      {/* AI Companion Dialog */}
      <Dialog
        open={aiCompanionOpen}
        onClose={() => setAiCompanionOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SmartToy sx={{ color: currentTheme.primary }} />
          AI Mentorship Companion
        </DialogTitle>
        <DialogContent>
          <AIMentorshipCompanion />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAiCompanionOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      
      {/* Mobile Table of Contents Drawer */}
      <Drawer
        anchor="right"
        open={tocOpen}
        onClose={() => setTocOpen(false)}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <TableOfContents sx={{ color: currentTheme.primary }} />
            Quick Navigation
          </Typography>
          <List>
            {sections.map((section, index) => (
              <ListItem key={section.id} disablePadding>
                <ListItemButton 
                  onClick={() => scrollToSection(section.id)}
                  sx={{ 
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                >
                  <ListItemText 
                    primary={`${index + 1}. ${section.title}`}
                    sx={{ '& .MuiListItemText-primary': { fontWeight: 500 } }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default AIFeaturesPage;
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Tabs,
  Tab,
  Avatar,
  Chip,
  Alert
} from '@mui/material';
import {
  Psychology,
  Assignment,
  Schedule,
  Description,
  EmojiEvents,
  TrendingUp,
  AutoAwesome,
  Insights
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Import all AI feature components
import AIInsights from './AIInsights';
import SessionSummary from './SessionSummary';
import SmartScheduling from './SmartScheduling';
import ResumeInsights from './ResumeInsights';
import MentorRecognition from './MentorRecognition';

const AIFeaturesHub = () => {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      id: 0,
      title: 'AI Mentorship Insights',
      description: 'Personalized recommendations and mentee analysis',
      icon: <Psychology />,
      color: '#1976d2',
      component: <AIInsights />,
      stats: { insights: 24, accuracy: '94%' }
    },
    {
      id: 1,
      title: 'Session Summary & Actions',
      description: 'Automated session summaries and action item tracking',
      icon: <Assignment />,
      color: '#388e3c',
      component: <SessionSummary />,
      stats: { sessions: 48, completion: '87%' }
    },
    {
      id: 2,
      title: 'Smart Scheduling',
      description: 'AI-optimized scheduling for maximum effectiveness',
      icon: <Schedule />,
      color: '#f57c00',
      component: <SmartScheduling />,
      stats: { efficiency: '+23%', conflicts: 2 }
    },
    {
      id: 3,
      title: 'Resume Insights',
      description: 'AI-powered resume analysis and feedback validation',
      icon: <Description />,
      color: '#7b1fa2',
      component: <ResumeInsights />,
      stats: { reviews: 12, improvement: '+35%' }
    },
    {
      id: 4,
      title: 'Recognition System',
      description: 'Achievement tracking and mentor recognition',
      icon: <EmojiEvents />,
      color: '#d32f2f',
      component: <MentorRecognition />,
      stats: { achievements: 12, rank: '#1' }
    }
  ];

  const FeatureCard = ({ feature, isActive, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        sx={{
          cursor: 'pointer',
          border: isActive ? `2px solid ${feature.color}` : '1px solid #e0e0e0',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 3,
            borderColor: feature.color
          }
        }}
        onClick={onClick}
      >
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: feature.color, mr: 2 }}>
              {feature.icon}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Box>
          </Box>
          
          <Box display="flex" gap={1} flexWrap="wrap">
            {Object.entries(feature.stats).map(([key, value]) => (
              <Chip
                key={key}
                label={`${key}: ${value}`}
                size="small"
                variant="outlined"
                sx={{ borderColor: feature.color, color: feature.color }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (activeTab > 0) {
    return features[activeTab].component;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
            <AutoAwesome sx={{ fontSize: 50, mr: 2, color: 'primary.main' }} />
            <Typography variant="h3" fontWeight="bold" color="primary.main">
              AI-Powered Mentorship Suite
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary" maxWidth="800px" mx="auto">
            Leverage artificial intelligence to enhance your mentoring effectiveness, 
            gain deeper insights, and create more impactful mentorship experiences
          </Typography>
        </Box>

        {/* AI Features Overview */}
        <Alert severity="info" sx={{ mb: 4 }}>
          <Box display="flex" alignItems="center">
            <Insights sx={{ mr: 1 }} />
            <Typography variant="body1">
              <strong>New AI Features Available:</strong> Advanced analytics, automated insights, 
              and intelligent recommendations to supercharge your mentoring impact
            </Typography>
          </Box>
        </Alert>

        {/* Feature Navigation */}
        <Box mb={4}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minHeight: 60,
                textTransform: 'none'
              }
            }}
          >
            <Tab
              label="Overview"
              icon={<TrendingUp />}
              iconPosition="start"
            />
            {features.map((feature) => (
              <Tab
                key={feature.id}
                label={feature.title}
                icon={feature.icon}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={3}>
          {features.map((feature) => (
            <Grid item xs={12} md={6} lg={4} key={feature.id}>
              <FeatureCard
                feature={feature}
                isActive={activeTab === feature.id + 1}
                onClick={() => setActiveTab(feature.id + 1)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Quick Stats */}
        <Card sx={{ mt: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
              Your AI-Enhanced Mentoring Impact
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={6} sm={3}>
                <Box textAlign="center">
                  <Typography variant="h3" fontWeight="bold">94%</Typography>
                  <Typography variant="body2">AI Accuracy</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box textAlign="center">
                  <Typography variant="h3" fontWeight="bold">+35%</Typography>
                  <Typography variant="body2">Efficiency Gain</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box textAlign="center">
                  <Typography variant="h3" fontWeight="bold">48</Typography>
                  <Typography variant="body2">Sessions Analyzed</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box textAlign="center">
                  <Typography variant="h3" fontWeight="bold">12</Typography>
                  <Typography variant="body2">Achievements</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Getting Started with AI Features
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center" p={2}>
                  <Psychology sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    1. Explore AI Insights
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Get personalized recommendations for each mentee
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center" p={2}>
                  <Assignment sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    2. Review Session Summaries
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Access AI-generated summaries and action items
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center" p={2}>
                  <Schedule sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    3. Optimize Scheduling
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Let AI find the best meeting times for effectiveness
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center" p={2}>
                  <EmojiEvents sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    4. Track Recognition
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Celebrate achievements and track your impact
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default AIFeaturesHub;
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Chip
} from '@mui/material';
import {
  Route,
  CheckCircle,
  Schedule,
  TrendingUp,
  Star
} from '@mui/icons-material';

const CareerRoadmap = () => {
  const [roadmapData] = useState({
    currentLevel: 'Junior Developer',
    nextMilestone: 'Mid-level Developer',
    timeframe: '8-12 months',
    progress: 65,
    milestones: [
      { title: 'Complete 3 major projects', completed: true, dueDate: 'Completed' },
      { title: 'Gain leadership experience', completed: true, dueDate: 'Completed' },
      { title: 'Master system design', completed: false, dueDate: 'Next 3 months' },
      { title: 'Build professional network', completed: false, dueDate: 'Next 6 months' },
      { title: 'Obtain relevant certifications', completed: false, dueDate: 'Next 4 months' }
    ],
    nextActions: [
      'Schedule mentorship session with ML expert',
      'Complete online system design course',
      'Join technical leadership workshop',
      'Attend 2 networking events this month'
    ],
    careerPath: [
      { role: 'Junior Developer', status: 'current', duration: 'Current' },
      { role: 'Mid-level Developer', status: 'next', duration: '8-12 months' },
      { role: 'Senior Developer', status: 'future', duration: '2-3 years' },
      { role: 'Tech Lead', status: 'future', duration: '4-5 years' }
    ]
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'current': return 'primary';
      case 'next': return 'warning';
      case 'future': return 'default';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <Route sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h6">Personalized Career Roadmap</Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box mb={3}>
              <Typography variant="h5" color="primary.main" gutterBottom>
                {roadmapData.currentLevel} → {roadmapData.nextMilestone}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Estimated timeframe: {roadmapData.timeframe}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={roadmapData.progress}
                sx={{ height: 10, borderRadius: 5, mb: 1 }}
              />
              <Typography variant="caption" color="text.secondary">
                {roadmapData.progress}% Complete
              </Typography>
            </Box>

            <Typography variant="subtitle1" gutterBottom>
              Career Path Progression
            </Typography>
            <Grid container spacing={2} mb={3}>
              {roadmapData.careerPath.map((step, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    variant="outlined"
                    sx={{
                      p: 2,
                      border: step.status === 'current' ? '2px solid' : '1px solid',
                      borderColor: step.status === 'current' ? 'primary.main' : 'grey.300'
                    }}
                  >
                    <Box textAlign="center">
                      <Chip
                        label={step.status}
                        color={getStatusColor(step.status)}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="subtitle2" fontWeight="bold">
                        {step.role}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {step.duration}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Typography variant="subtitle1" gutterBottom>
              Key Milestones
            </Typography>
            <Stepper orientation="vertical">
              {roadmapData.milestones.map((milestone, index) => (
                <Step key={index} active={true} completed={milestone.completed}>
                  <StepLabel
                    StepIconComponent={() => (
                      <CheckCircle
                        color={milestone.completed ? 'success' : 'disabled'}
                        sx={{ mr: 1 }}
                      />
                    )}
                  >
                    <Typography
                      variant="body2"
                      color={milestone.completed ? 'text.primary' : 'text.secondary'}
                    >
                      {milestone.title}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="caption" color="text.secondary">
                      {milestone.dueDate}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, bgcolor: 'primary.light', color: 'white', mb: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Star sx={{ mr: 1 }} />
                <Typography variant="h6">Next Actions</Typography>
              </Box>
              {roadmapData.nextActions.map((action, index) => (
                <Typography key={index} variant="body2" paragraph>
                  • {action}
                </Typography>
              ))}
            </Paper>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Progress Metrics
                </Typography>
                <Box mb={2}>
                  <Typography variant="body2" gutterBottom>
                    Technical Skills
                  </Typography>
                  <LinearProgress variant="determinate" value={78} sx={{ height: 6 }} />
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" gutterBottom>
                    Leadership Skills
                  </Typography>
                  <LinearProgress variant="determinate" value={65} sx={{ height: 6 }} />
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" gutterBottom>
                    Industry Knowledge
                  </Typography>
                  <LinearProgress variant="determinate" value={72} sx={{ height: 6 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" gap={2} mt={2}>
              <Button variant="contained" startIcon={<Schedule />}>
                Update Timeline
              </Button>
              <Button variant="outlined" startIcon={<TrendingUp />}>
                View Detailed Plan
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CareerRoadmap;
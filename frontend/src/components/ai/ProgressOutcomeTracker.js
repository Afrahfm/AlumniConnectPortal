import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  Tabs,
  Tab
} from '@mui/material';
import {
  Timeline,
  TrendingUp,
  CheckCircle,
  Star,
  EmojiEvents,
  Assessment
} from '@mui/icons-material';

const ProgressOutcomeTracker = () => {
  const [tabValue, setTabValue] = useState(0);
  const [progressData] = useState({
    overallProgress: 68,
    skillProgress: [
      { skill: 'React.js', progress: 85, target: 90, trend: '+15%' },
      { skill: 'System Design', progress: 45, target: 80, trend: '+25%' },
      { skill: 'Communication', progress: 78, target: 85, trend: '+12%' },
      { skill: 'Problem Solving', progress: 82, target: 90, trend: '+18%' }
    ],
    milestones: [
      {
        title: 'Completed React Certification',
        date: '2024-01-20',
        type: 'achievement',
        impact: 'High',
        mentor: 'John Doe'
      },
      {
        title: 'Built First Full-Stack Project',
        date: '2024-01-15',
        type: 'project',
        impact: 'High',
        mentor: 'Sarah Wilson'
      },
      {
        title: 'Improved Interview Skills',
        date: '2024-01-10',
        type: 'skill',
        impact: 'Medium',
        mentor: 'Mike Johnson'
      }
    ],
    outcomes: [
      {
        metric: 'Technical Skills',
        before: 45,
        after: 78,
        improvement: '+33%',
        sessions: 12
      },
      {
        metric: 'Interview Performance',
        before: 60,
        after: 85,
        improvement: '+25%',
        sessions: 8
      },
      {
        metric: 'Confidence Level',
        before: 55,
        after: 82,
        improvement: '+27%',
        sessions: 15
      }
    ],
    predictions: {
      jobReadiness: 75,
      timeToGoal: '4 months',
      successProbability: 88,
      recommendedActions: [
        'Focus on system design practice',
        'Complete 2 more projects',
        'Practice technical interviews'
      ]
    }
  });

  const getMilestoneIcon = (type) => {
    switch (type) {
      case 'achievement': return <EmojiEvents color="warning" />;
      case 'project': return <Assessment color="primary" />;
      case 'skill': return <TrendingUp color="success" />;
      default: return <CheckCircle />;
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'success';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Progress Overview" />
          <Tab label="Milestones" />
          <Tab label="Outcomes" />
          <Tab label="AI Predictions" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Overall Progress
                </Typography>
                <Box mb={2}>
                  <LinearProgress
                    variant="determinate"
                    value={progressData.overallProgress}
                    sx={{ height: 12, borderRadius: 6 }}
                  />
                  <Typography variant="h4" color="primary" sx={{ mt: 1 }}>
                    {progressData.overallProgress}%
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  You're making excellent progress toward your career goals!
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Skill Development
                </Typography>
                {progressData.skillProgress.map((skill, index) => (
                  <Box key={index} mb={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body2">{skill.skill}</Typography>
                      <Chip label={skill.trend} color="success" size="small" />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={skill.progress}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {skill.progress}% / {skill.target}% target
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Milestones
            </Typography>
            <List>
              {progressData.milestones.map((milestone, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    {getMilestoneIcon(milestone.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={milestone.title}
                    secondary={
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {milestone.date} • Mentor: {milestone.mentor}
                        </Typography>
                        <Box mt={0.5}>
                          <Chip
                            label={`${milestone.impact} Impact`}
                            color={getImpactColor(milestone.impact)}
                            size="small"
                          />
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          {progressData.outcomes.map((outcome, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    {outcome.metric}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Box>
                      <Typography variant="h4" color="text.secondary">
                        {outcome.before}%
                      </Typography>
                      <Typography variant="caption">Before</Typography>
                    </Box>
                    <TrendingUp color="success" sx={{ alignSelf: 'center' }} />
                    <Box>
                      <Typography variant="h4" color="success.main">
                        {outcome.after}%
                      </Typography>
                      <Typography variant="caption">After</Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={outcome.improvement}
                    color="success"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary" display="block">
                    {outcome.sessions} mentoring sessions
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  AI Career Predictions
                </Typography>
                <Box mb={3}>
                  <Typography variant="body2" gutterBottom>
                    Job Readiness Score
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={progressData.predictions.jobReadiness}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="h5" color="primary" sx={{ mt: 1 }}>
                    {progressData.predictions.jobReadiness}%
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary">
                    Estimated time to goal: <strong>{progressData.predictions.timeToGoal}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Success probability: <strong>{progressData.predictions.successProbability}%</strong>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recommended Actions
                </Typography>
                <List dense>
                  {progressData.predictions.recommendedActions.map((action, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Star color="warning" />
                      </ListItemIcon>
                      <ListItemText primary={action} />
                    </ListItem>
                  ))}
                </List>
                <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                  Update Learning Plan
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ProgressOutcomeTracker;
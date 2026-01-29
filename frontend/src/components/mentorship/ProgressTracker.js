import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Avatar,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import { 
  TrendingUp, 
  EmojiEvents, 
  Schedule, 
  Star,
  CheckCircle,
  Timeline
} from '@mui/icons-material';

const ProgressTracker = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const progressData = {
    overallProgress: 75,
    completedSessions: 8,
    totalSessions: 12,
    achievements: [
      { id: 1, title: 'First Session', icon: '🎯', earned: true },
      { id: 2, title: 'Consistent Learner', icon: '📚', earned: true },
      { id: 3, title: 'Goal Setter', icon: '🎪', earned: true },
      { id: 4, title: 'Skill Master', icon: '⭐', earned: false }
    ],
    milestones: [
      { id: 1, title: 'Complete Profile Setup', completed: true, date: '2024-01-15' },
      { id: 2, title: 'First Mentor Meeting', completed: true, date: '2024-01-20' },
      { id: 3, title: 'Complete 5 Sessions', completed: true, date: '2024-02-10' },
      { id: 4, title: 'Skill Assessment', completed: false, date: null },
      { id: 5, title: 'Career Plan Review', completed: false, date: null }
    ],
    skillProgress: [
      { skill: 'Technical Skills', progress: 80 },
      { skill: 'Communication', progress: 65 },
      { skill: 'Leadership', progress: 45 },
      { skill: 'Problem Solving', progress: 70 }
    ]
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <TrendingUp color="primary" />
            <Typography variant="h6">Your Progress</Typography>
          </Box>

          <Box mb={3}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2">Overall Progress</Typography>
              <Typography variant="body2" fontWeight="bold">
                {progressData.overallProgress}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progressData.overallProgress} 
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>

          <Grid container spacing={2} mb={3}>
            <Grid item xs={6}>
              <Box textAlign="center">
                <Typography variant="h4" color="primary" fontWeight="bold">
                  {progressData.completedSessions}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sessions Completed
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box textAlign="center">
                <Typography variant="h4" color="success.main" fontWeight="bold">
                  {progressData.achievements.filter(a => a.earned).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Badges Earned
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Typography variant="subtitle2" gutterBottom>Recent Achievements</Typography>
          <Box display="flex" gap={1} mb={3} flexWrap="wrap">
            {progressData.achievements.slice(0, 3).map((achievement) => (
              <Chip
                key={achievement.id}
                label={`${achievement.icon} ${achievement.title}`}
                color={achievement.earned ? "primary" : "default"}
                size="small"
              />
            ))}
          </Box>

          <Button
            variant="outlined"
            onClick={() => setDetailsOpen(true)}
            startIcon={<Timeline />}
            fullWidth
          >
            View Detailed Progress
          </Button>
        </CardContent>
      </Card>

      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Detailed Progress Report</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Milestones</Typography>
              {progressData.milestones.map((milestone) => (
                <Box key={milestone.id} display="flex" alignItems="center" gap={2} mb={2}>
                  <CheckCircle 
                    color={milestone.completed ? "success" : "disabled"} 
                  />
                  <Box flex={1}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        textDecoration: milestone.completed ? 'line-through' : 'none',
                        color: milestone.completed ? 'text.secondary' : 'text.primary'
                      }}
                    >
                      {milestone.title}
                    </Typography>
                    {milestone.date && (
                      <Typography variant="caption" color="text.secondary">
                        Completed: {milestone.date}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Skill Development</Typography>
              {progressData.skillProgress.map((skill) => (
                <Box key={skill.skill} mb={2}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">{skill.skill}</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {skill.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={skill.progress}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>
              ))}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>All Achievements</Typography>
              <Grid container spacing={2}>
                {progressData.achievements.map((achievement) => (
                  <Grid item xs={6} sm={3} key={achievement.id}>
                    <Card 
                      sx={{ 
                        textAlign: 'center', 
                        opacity: achievement.earned ? 1 : 0.5,
                        border: achievement.earned ? 2 : 1,
                        borderColor: achievement.earned ? 'primary.main' : 'divider'
                      }}
                    >
                      <CardContent sx={{ py: 2 }}>
                        <Typography variant="h4" mb={1}>
                          {achievement.icon}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {achievement.title}
                        </Typography>
                        {achievement.earned && (
                          <Chip label="Earned" color="primary" size="small" sx={{ mt: 1 }} />
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProgressTracker;
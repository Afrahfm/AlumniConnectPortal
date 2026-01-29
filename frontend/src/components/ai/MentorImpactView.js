import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating
} from '@mui/material';
import {
  TrendingUp,
  People,
  Star,
  EmojiEvents,
  Timeline
} from '@mui/icons-material';

const MentorImpactView = () => {
  const [impactData] = useState({
    overallRating: 4.8,
    totalMentees: 12,
    completedSessions: 48,
    impactScore: 92,
    achievements: [
      { title: 'Top Mentor', description: 'Highest rated mentor this month', icon: '🏆' },
      { title: 'Session Master', description: '50+ completed sessions', icon: '📚' },
      { title: 'Career Catalyst', description: 'Helped 5 mentees get jobs', icon: '🚀' }
    ],
    recentFeedback: [
      { student: 'Alice Johnson', rating: 5, comment: 'Excellent guidance on career planning' },
      { student: 'Bob Smith', rating: 5, comment: 'Very helpful with technical interview prep' },
      { student: 'Carol Davis', rating: 4, comment: 'Great insights on industry trends' }
    ],
    skillImpact: [
      { skill: 'Technical Mentoring', score: 95 },
      { skill: 'Career Guidance', score: 88 },
      { skill: 'Communication', score: 92 },
      { skill: 'Leadership Development', score: 85 }
    ]
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <TrendingUp color="primary" />
              <Typography variant="h6">Impact Overview</Typography>
              <Chip label={`Impact Score: ${impactData.impactScore}`} color="success" />
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box textAlign="center">
                  <Typography variant="h4" color="primary">
                    {impactData.totalMentees}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Total Mentees
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box textAlign="center">
                  <Typography variant="h4" color="success.main">
                    {impactData.completedSessions}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Sessions Completed
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Box mt={3}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Star color="warning" />
                <Typography variant="subtitle2">Overall Rating</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Rating value={impactData.overallRating} readOnly precision={0.1} />
                <Typography variant="h6">{impactData.overallRating}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <EmojiEvents color="warning" />
              <Typography variant="h6">Achievements</Typography>
            </Box>

            <List>
              {impactData.achievements.map((achievement, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                      {achievement.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={achievement.title}
                    secondary={achievement.description}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Skill Impact Analysis
            </Typography>
            <Grid container spacing={2}>
              {impactData.skillImpact.map((skill, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">{skill.skill}</Typography>
                      <Typography variant="body2" color="primary">
                        {skill.score}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={skill.score}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Feedback
            </Typography>
            <List>
              {impactData.recentFeedback.map((feedback, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar>{feedback.student[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="subtitle2">{feedback.student}</Typography>
                        <Rating value={feedback.rating} size="small" readOnly />
                      </Box>
                    }
                    secondary={feedback.comment}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MentorImpactView;
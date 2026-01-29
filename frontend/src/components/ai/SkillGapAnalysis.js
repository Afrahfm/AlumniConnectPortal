import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Chip,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Alert
} from '@mui/material';
import {
  Assessment,
  TrendingUp,
  Person,
  Star,
  Psychology
} from '@mui/icons-material';

const SkillGapAnalysis = () => {
  const [analysisData] = useState({
    targetRole: 'Software Engineer',
    overallMatch: 72,
    skillGaps: [
      { skill: 'React.js', current: 60, required: 85, gap: 25, priority: 'High' },
      { skill: 'System Design', current: 40, required: 80, gap: 40, priority: 'High' },
      { skill: 'Data Structures', current: 75, required: 90, gap: 15, priority: 'Medium' },
      { skill: 'Communication', current: 80, required: 85, gap: 5, priority: 'Low' }
    ],
    recommendedMentors: [
      {
        name: 'John Doe',
        company: 'Google',
        expertise: ['React.js', 'System Design'],
        rating: 4.9,
        sessions: 45,
        match: 95
      },
      {
        name: 'Sarah Wilson',
        company: 'Microsoft',
        expertise: ['System Design', 'Leadership'],
        rating: 4.8,
        sessions: 38,
        match: 88
      },
      {
        name: 'Mike Johnson',
        company: 'Amazon',
        expertise: ['Data Structures', 'Algorithms'],
        rating: 4.7,
        sessions: 52,
        match: 82
      }
    ]
  });

  const getGapColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'primary';
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Alert severity="info" sx={{ mb: 2 }}>
          AI analyzed your profile for {analysisData.targetRole} role - {analysisData.overallMatch}% match
        </Alert>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Assessment color="primary" />
              <Typography variant="h6">Skill Gap Analysis</Typography>
            </Box>

            {analysisData.skillGaps.map((skill, index) => (
              <Box key={index} mb={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle2">{skill.skill}</Typography>
                  <Chip 
                    label={`${skill.gap}% gap`} 
                    color={getGapColor(skill.priority)} 
                    size="small" 
                  />
                </Box>
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <Box flex={1}>
                    <Typography variant="caption" color="text.secondary">
                      Current: {skill.current}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={skill.current}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="caption" color="text.secondary">
                      Required: {skill.required}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={skill.required}
                      color="success"
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                </Box>
                <Typography variant="caption" color={getGapColor(skill.priority).main}>
                  Priority: {skill.priority}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Psychology color="success" />
              <Typography variant="h6">Recommended Mentors</Typography>
            </Box>

            <List dense>
              {analysisData.recommendedMentors.map((mentor, index) => (
                <ListItem key={index} sx={{ px: 0, mb: 2 }}>
                  <ListItemAvatar>
                    <Avatar>{mentor.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box>
                        <Typography variant="subtitle2">{mentor.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {mentor.company}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Box display="flex" alignItems="center" gap={1} my={0.5}>
                          <Star fontSize="small" color="warning" />
                          <Typography variant="caption">
                            {mentor.rating} ({mentor.sessions} sessions)
                          </Typography>
                        </Box>
                        <Box display="flex" gap={0.5} flexWrap="wrap">
                          {mentor.expertise.slice(0, 2).map((skill, i) => (
                            <Chip key={i} label={skill} size="small" variant="outlined" />
                          ))}
                        </Box>
                        <Chip 
                          label={`${mentor.match}% match`} 
                          color="success" 
                          size="small" 
                          sx={{ mt: 0.5 }}
                        />
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>

            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              Connect with Mentors
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SkillGapAnalysis;
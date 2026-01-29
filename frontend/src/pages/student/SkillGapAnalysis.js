import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Alert,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Chip
} from '@mui/material';
import {
  Psychology,
  AutoAwesome,
  Warning,
  CheckCircle,
  TrendingUp,
  School
} from '@mui/icons-material';

const SkillGapAnalysis = () => {
  const [skillData] = useState({
    currentSkills: [
      { name: 'JavaScript', level: 85, category: 'Technical' },
      { name: 'React', level: 80, category: 'Technical' },
      { name: 'Communication', level: 70, category: 'Soft Skills' },
      { name: 'Problem Solving', level: 75, category: 'Soft Skills' }
    ],
    skillGaps: [
      { name: 'Machine Learning', priority: 'High', timeToLearn: '6-8 weeks' },
      { name: 'System Design', priority: 'High', timeToLearn: '4-6 weeks' },
      { name: 'Leadership', priority: 'Medium', timeToLearn: '3-4 weeks' },
      { name: 'Cloud Computing', priority: 'Medium', timeToLearn: '5-7 weeks' }
    ],
    recommendations: [
      'Focus on Machine Learning fundamentals first',
      'Practice system design through mock interviews',
      'Join leadership workshops or student organizations',
      'Get AWS/Azure certifications for cloud skills'
    ]
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <Psychology sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h6">AI-Powered Skill Gap Analysis</Typography>
        </Box>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <AutoAwesome sx={{ mr: 1 }} />
          Based on your career goals and current market trends, here's your personalized skill analysis
        </Alert>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Current Skill Levels
            </Typography>
            {skillData.currentSkills.map((skill, index) => (
              <Box key={index} mb={2}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">{skill.name}</Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip label={skill.category} size="small" variant="outlined" />
                    <Typography variant="body2" color="primary.main">
                      {skill.level}%
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={skill.level}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            ))}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Identified Skill Gaps
            </Typography>
            {skillData.skillGaps.map((gap, index) => (
              <Box key={index} mb={2}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body1" fontWeight="bold">
                      {gap.name}
                    </Typography>
                    <Chip
                      label={gap.priority}
                      color={getPriorityColor(gap.priority)}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Estimated learning time: {gap.timeToLearn}
                  </Typography>
                </Card>
              </Box>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              AI Recommendations
            </Typography>
            <List>
              {skillData.recommendations.map((recommendation, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText primary={recommendation} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" gap={2} mt={2}>
              <Button variant="contained" startIcon={<School />}>
                Find Learning Resources
              </Button>
              <Button variant="outlined" startIcon={<TrendingUp />}>
                Track Progress
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SkillGapAnalysis;
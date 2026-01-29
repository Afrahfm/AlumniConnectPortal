import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Grid,
  Avatar
} from '@mui/material';
import {
  Psychology,
  Lightbulb,
  Assessment,
  TrendingUp,
  People,
  Star
} from '@mui/icons-material';
import DetailedAnalysisDialog from './DetailedAnalysisDialog';

const AlumniAIInsights = () => {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [insights] = useState({
    mentorEffectiveness: 92,
    studentSatisfaction: 4.8,
    careerImpact: 85,
    keyStrengths: ['Technical Expertise', 'Career Guidance', 'Communication'],
    recommendations: [
      'Consider specializing in leadership mentoring',
      'Expand availability for weekend sessions',
      'Share more industry insights in sessions'
    ],
    menteeProgress: [
      { name: 'Alice Johnson', progress: 85, goal: 'Software Engineer Role' },
      { name: 'Bob Smith', progress: 72, goal: 'Technical Skills' },
      { name: 'Carol Davis', progress: 90, goal: 'Career Transition' }
    ],
    aiScore: 92
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Psychology color="primary" />
              <Typography variant="h6">AI Mentorship Insights</Typography>
              <Chip label={`AI Score: ${insights.aiScore}%`} color="primary" size="small" />
            </Box>

            <Box mb={3}>
              <Typography variant="subtitle2" gutterBottom>
                Mentor Effectiveness
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={insights.mentorEffectiveness} 
                sx={{ height: 8, borderRadius: 4 }}
                color="success"
              />
              <Typography variant="caption" color="text.secondary">
                {insights.mentorEffectiveness}% - Excellent Performance
              </Typography>
            </Box>

            <Box mb={3}>
              <Typography variant="subtitle2" gutterBottom>
                Student Satisfaction
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Star color="warning" />
                <Typography variant="h6">{insights.studentSatisfaction}</Typography>
                <Typography variant="body2" color="text.secondary">
                  / 5.0
                </Typography>
              </Box>
            </Box>

            <Box mb={3}>
              <Typography variant="subtitle2" gutterBottom>
                Key Strengths
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {insights.keyStrengths.map((strength, index) => (
                  <Chip key={index} label={strength} color="success" size="small" />
                ))}
              </Box>
            </Box>

            <Button 
              variant="outlined" 
              size="small" 
              startIcon={<Assessment />} 
              onClick={() => setDetailsDialogOpen(true)}
              fullWidth
            >
              View Detailed Analysis
            </Button>
          </CardContent>

          <DetailedAnalysisDialog
            open={detailsDialogOpen}
            onClose={() => setDetailsDialogOpen(false)}
          />
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <TrendingUp color="success" />
              <Typography variant="h6">Mentee Progress Tracking</Typography>
            </Box>

            <List dense>
              {insights.menteeProgress.map((mentee, index) => (
                <ListItem key={index} sx={{ px: 0, mb: 1 }}>
                  <ListItemIcon>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {mentee.name[0]}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={mentee.name}
                    secondary={
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Goal: {mentee.goal}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={mentee.progress}
                          sx={{ mt: 0.5, height: 4, borderRadius: 2 }}
                          color={mentee.progress > 80 ? 'success' : 'primary'}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {mentee.progress}% Complete
                        </Typography>
                      </Box>
                    }
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
              AI Recommendations for Enhanced Mentoring
            </Typography>
            <List dense>
              {insights.recommendations.map((rec, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Lightbulb fontSize="small" color="warning" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={rec}
                    primaryTypographyProps={{ variant: 'body2' }}
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

export default AlumniAIInsights;
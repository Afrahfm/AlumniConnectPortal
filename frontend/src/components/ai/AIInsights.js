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
  Button
} from '@mui/material';
import {
  Psychology,
  Lightbulb,
  Assessment
} from '@mui/icons-material';
import DetailedAnalysisDialog from './DetailedAnalysisDialog';

const AIInsights = () => {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [insights] = useState({
    overallProgress: 78,
    keyStrengths: ['Technical Skills', 'Communication', 'Problem Solving'],
    recommendations: [
      'Focus on leadership development in next sessions',
      'Practice technical interviews weekly',
      'Join networking events to build connections'
    ],
    aiScore: 85
  });

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Psychology color="primary" />
          <Typography variant="h6">AI Mentorship Insights</Typography>
          <Chip label={`AI Score: ${insights.aiScore}%`} color="primary" size="small" />
        </Box>

        <Box mb={3}>
          <Typography variant="subtitle2" gutterBottom>
            Overall Progress
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={insights.overallProgress} 
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Typography variant="caption" color="text.secondary">
            {insights.overallProgress}% Complete
          </Typography>
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

        <Box mb={3}>
          <Typography variant="subtitle2" gutterBottom>
            AI Recommendations
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
        </Box>

        <Button variant="outlined" size="small" startIcon={<Assessment />} onClick={() => setDetailsDialogOpen(true)}>
          View Detailed Analysis
        </Button>
      </CardContent>

      <DetailedAnalysisDialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
      />
    </Card>
  );
};

export default AIInsights;
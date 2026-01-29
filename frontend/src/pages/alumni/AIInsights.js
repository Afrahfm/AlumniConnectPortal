import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Tabs,
  Tab,
  Chip,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  Psychology,
  TrendingUp,
  Lightbulb,
  Assessment,
  AutoAwesome,
  CheckCircle,
  Warning,
  Info
} from '@mui/icons-material';

const AIInsights = () => {
  const [tabValue, setTabValue] = useState(0);
  const [insights, setInsights] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAIInsights();
  }, []);

  const fetchAIInsights = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setInsights({
        menteeAnalysis: [
          {
            mentee: 'Sarah Chen',
            strengths: ['Technical Skills', 'Problem Solving'],
            improvements: ['Communication', 'Leadership'],
            recommendation: 'Focus on presentation skills and team collaboration exercises',
            confidence: 92
          },
          {
            mentee: 'Mike Johnson',
            strengths: ['Leadership', 'Strategic Thinking'],
            improvements: ['Technical Depth', 'Time Management'],
            recommendation: 'Recommend advanced technical courses and productivity tools',
            confidence: 88
          }
        ],
        sessionOptimization: {
          bestTimes: ['Tuesday 2-4 PM', 'Thursday 10-12 PM'],
          duration: '45-60 minutes',
          frequency: 'Bi-weekly',
          effectiveness: 94
        },
        careerPredictions: [
          { mentee: 'Sarah Chen', prediction: 'Senior Developer in 18 months', probability: 85 },
          { mentee: 'Mike Johnson', prediction: 'Team Lead in 12 months', probability: 78 }
        ]
      });
      setLoading(false);
    }, 1000);
  };

  const InsightCard = ({ title, children, severity = 'info' }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <AutoAwesome color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Alert severity={severity} sx={{ mb: 2 }}>
          AI-Generated Insight
        </Alert>
        {children}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Box textAlign="center">
            <Psychology sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6">AI is analyzing your mentorship data...</Typography>
            <LinearProgress sx={{ mt: 2, width: 300 }} />
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Psychology sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            AI Mentorship Insights
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Personalized recommendations powered by machine learning
          </Typography>
        </Box>
      </Box>

      <Card sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="Mentee Analysis" icon={<Assessment />} />
            <Tab label="Session Optimization" icon={<TrendingUp />} />
            <Tab label="Career Predictions" icon={<Lightbulb />} />
          </Tabs>
        </Box>

        <CardContent>
          {tabValue === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Individual Mentee Analysis
              </Typography>
              {insights.menteeAnalysis?.map((analysis, index) => (
                <InsightCard key={index} title={`Analysis for ${analysis.mentee}`} severity="info">
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="success.main" gutterBottom>
                        Strengths Identified
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                        {analysis.strengths.map((strength, i) => (
                          <Chip key={i} label={strength} color="success" size="small" />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="warning.main" gutterBottom>
                        Areas for Improvement
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                        {analysis.improvements.map((improvement, i) => (
                          <Chip key={i} label={improvement} color="warning" size="small" />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>
                        AI Recommendation
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {analysis.recommendation}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Typography variant="caption" color="text.secondary">
                          Confidence Score: {analysis.confidence}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={analysis.confidence}
                          sx={{ ml: 2, width: 100, height: 6 }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </InsightCard>
              ))}
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Session Optimization Recommendations
              </Typography>
              <InsightCard title="Optimal Meeting Schedule" severity="success">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Best Time Slots"
                          secondary={insights.sessionOptimization.bestTimes.join(', ')}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Info color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Recommended Duration"
                          secondary={insights.sessionOptimization.duration}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <TrendingUp color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Optimal Frequency"
                          secondary={insights.sessionOptimization.frequency}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box textAlign="center">
                      <Typography variant="h3" color="success.main" fontWeight="bold">
                        {insights.sessionOptimization.effectiveness}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Predicted Effectiveness Improvement
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </InsightCard>
            </Box>
          )}

          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Career Trajectory Predictions
              </Typography>
              {insights.careerPredictions?.map((prediction, index) => (
                <InsightCard key={index} title={`Career Forecast for ${prediction.mentee}`} severity="info">
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h6" color="primary.main">
                        {prediction.prediction}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Based on current progress and industry trends
                      </Typography>
                    </Box>
                    <Box textAlign="center">
                      <Typography variant="h4" color="success.main" fontWeight="bold">
                        {prediction.probability}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Probability
                      </Typography>
                    </Box>
                  </Box>
                </InsightCard>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      <Box display="flex" justifyContent="center" mt={3}>
        <Button
          variant="contained"
          startIcon={<AutoAwesome />}
          onClick={fetchAIInsights}
          size="large"
        >
          Refresh AI Insights
        </Button>
      </Box>
    </Container>
  );
};

export default AIInsights;
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Tabs,
  Tab,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Alert,
  Divider
} from '@mui/material';
import {
  TrendingUp,
  People,
  Star,
  Assessment,
  Timeline,
  EmojiEvents,
  Psychology,
  AutoAwesome,
  Insights,
  Launch
} from '@mui/icons-material';

const ImpactAnalytics = () => {
  const [tabValue, setTabValue] = useState(0);
  const [aiInsightsEnabled, setAiInsightsEnabled] = useState(true);

  const overviewData = {
    totalMentees: 12,
    activeMentorships: 8,
    completedSessions: 48,
    averageRating: 4.8,
    careerPlacements: 5,
    impactScore: 92,
    aiPredictedGrowth: 15,
    mentorshipEfficiency: 94
  };

  const aiInsights = {
    topPerformingAreas: ['Technical Mentoring', 'Career Guidance', 'Interview Prep'],
    improvementSuggestions: [
      'Consider focusing more on soft skills development',
      'Increase frequency of follow-up sessions',
      'Leverage video calls for better engagement'
    ],
    predictedOutcomes: {
      nextMonth: '2 more job placements expected',
      quarterlyGrowth: '15% increase in mentee satisfaction predicted'
    }
  };

  const menteeOutcomes = [
    { name: 'Alice Johnson', outcome: 'Software Engineer at Google', date: '2024-01-15' },
    { name: 'Bob Smith', outcome: 'Data Analyst at Microsoft', date: '2024-01-10' },
    { name: 'Carol Davis', outcome: 'Product Manager at Apple', date: '2023-12-20' },
    { name: 'David Wilson', outcome: 'Full Stack Developer at Netflix', date: '2023-12-15' },
    { name: 'Emma Brown', outcome: 'UX Designer at Adobe', date: '2023-11-30' }
  ];

  const skillImpactData = [
    { skill: 'Technical Skills', improvement: 85, mentees: 10 },
    { skill: 'Interview Preparation', improvement: 92, mentees: 8 },
    { skill: 'Career Planning', improvement: 78, mentees: 12 },
    { skill: 'Leadership Development', improvement: 88, mentees: 6 },
    { skill: 'Communication', improvement: 90, mentees: 9 }
  ];

  const monthlyProgress = [
    { month: 'Oct 2023', sessions: 8, rating: 4.6, placements: 1 },
    { month: 'Nov 2023', sessions: 12, rating: 4.7, placements: 2 },
    { month: 'Dec 2023', sessions: 15, rating: 4.8, placements: 1 },
    { month: 'Jan 2024', sessions: 13, rating: 4.9, placements: 1 }
  ];

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" fontWeight="bold" color={color}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box sx={{ color: color, opacity: 0.7 }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Mentor Impact & Performance View
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            AI-enhanced analytics for comprehensive mentoring insights
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Psychology />}
          href="/alumni/ai-features"
          sx={{ height: 'fit-content' }}
        >
          Explore AI Features
        </Button>
      </Box>

      {/* AI Insights Alert */}
      {aiInsightsEnabled && (
        <Alert 
          severity="info" 
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" startIcon={<Launch />}>
              View Details
            </Button>
          }
        >
          <Box display="flex" alignItems="center">
            <AutoAwesome sx={{ mr: 1 }} />
            <Typography variant="body2">
              <strong>AI Insight:</strong> Your mentorship effectiveness has increased by 23% this month. 
              {aiInsights.predictedOutcomes.nextMonth}
            </Typography>
          </Box>
        </Alert>
      )}

      {/* Overview Stats */}
      <Grid container spacing={3} sx={{ mt: 2, mb: 4 }}>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Total Mentees"
            value={overviewData.totalMentees}
            icon={<People sx={{ fontSize: 40 }} />}
            color="#2563eb"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Active Mentorships"
            value={overviewData.activeMentorships}
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            color="#059669"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Sessions"
            value={overviewData.completedSessions}
            icon={<Assessment sx={{ fontSize: 40 }} />}
            color="#dc2626"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Avg Rating"
            value={overviewData.averageRating}
            icon={<Star sx={{ fontSize: 40 }} />}
            color="#7c3aed"
            subtitle="out of 5.0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Placements"
            value={overviewData.careerPlacements}
            icon={<EmojiEvents sx={{ fontSize: 40 }} />}
            color="#ea580c"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Impact Score"
            value={overviewData.impactScore}
            icon={<Timeline sx={{ fontSize: 40 }} />}
            color="#0891b2"
            subtitle="AI calculated"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="AI Efficiency"
            value={`${overviewData.mentorshipEfficiency}%`}
            icon={<Psychology sx={{ fontSize: 40 }} />}
            color="#7c3aed"
            subtitle="AI optimized"
          />
        </Grid>
      </Grid>

      {/* AI-Enhanced Analytics */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Insights sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">AI-Powered Insights</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="success.main" gutterBottom>
                Top Performing Areas
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {aiInsights.topPerformingAreas.map((area, index) => (
                  <Chip key={index} label={area} color="success" size="small" />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="primary.main" gutterBottom>
                AI Recommendations
              </Typography>
              <List dense>
                {aiInsights.improvementSuggestions.slice(0, 2).map((suggestion, index) => (
                  <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                    <ListItemText 
                      primary={suggestion} 
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="warning.main" gutterBottom>
                Predicted Growth
              </Typography>
              <Typography variant="body2" gutterBottom>
                {aiInsights.predictedOutcomes.quarterlyGrowth}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={overviewData.aiPredictedGrowth * 5} 
                sx={{ height: 6, borderRadius: 3 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Detailed Analytics */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="Career Outcomes" />
            <Tab label="Skill Impact" />
            <Tab label="Monthly Trends" />
            <Tab label="AI Predictions" />
          </Tabs>
        </Box>

        <CardContent>
          {tabValue === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Mentee Career Outcomes
              </Typography>
              <List>
                {menteeOutcomes.map((outcome, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'success.main' }}>
                        <EmojiEvents />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={outcome.name}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="success.main">
                            {outcome.outcome}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {outcome.date}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Skill Development Impact
              </Typography>
              <Grid container spacing={2}>
                {skillImpactData.map((skill, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box mb={2}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2">{skill.skill}</Typography>
                        <Typography variant="body2" color="primary">
                          {skill.improvement}% improvement
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={skill.improvement}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {skill.mentees} mentees impacted
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Monthly Performance Trends
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Month</TableCell>
                      <TableCell>Sessions</TableCell>
                      <TableCell>Avg Rating</TableCell>
                      <TableCell>Placements</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {monthlyProgress.map((month, index) => (
                      <TableRow key={index}>
                        <TableCell>{month.month}</TableCell>
                        <TableCell>{month.sessions}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Star color="warning" fontSize="small" />
                            {month.rating}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={month.placements}
                            color="success"
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {tabValue === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                AI-Powered Predictions & Recommendations
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Career Trajectory Predictions
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'success.main' }}>
                              <TrendingUp />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Sarah Chen - Senior Developer"
                            secondary="85% probability within 18 months"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              <Star />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Mike Johnson - Team Lead"
                            secondary="78% probability within 12 months"
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Optimization Suggestions
                      </Typography>
                      <List>
                        {aiInsights.improvementSuggestions.map((suggestion, index) => (
                          <ListItem key={index}>
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: 'warning.main' }}>
                                <AutoAwesome />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={suggestion} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ImpactAnalytics;
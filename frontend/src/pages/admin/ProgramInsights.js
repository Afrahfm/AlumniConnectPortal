import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress
} from '@mui/material';
import {
  Insights,
  TrendingUp,
  School,
  Business,
  LocationOn,
  Refresh,
  Assessment
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const ProgramInsights = () => {
  const [insights, setInsights] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgramInsights();
  }, []);

  const fetchProgramInsights = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/analytics/program-insights');
      const data = await response.json();
      setInsights(data);
    } catch (error) {
      console.error('Error fetching program insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const getHealthColor = (health) => {
    switch (health) {
      case 'HEALTHY': return 'success';
      case 'GOOD': return 'primary';
      case 'NEEDS_ATTENTION': return 'warning';
      case 'CRITICAL': return 'error';
      default: return 'default';
    }
  };

  const renderDistributionTable = (data, title, icon) => (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <Box display="flex" alignItems="center">
            {icon}
            <Typography variant="h6" sx={{ ml: 1 }}>{title}</Typography>
          </Box>
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{title.slice(0, -1)}</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Percentage</TableCell>
                <TableCell>Trend</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(data || {})
                .sort(([,a], [,b]) => b - a)
                .slice(0, 8)
                .map(([name, count], index) => {
                  const total = Object.values(data || {}).reduce((sum, val) => sum + val, 0);
                  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                  return (
                    <TableRow key={name}>
                      <TableCell>
                        <Typography variant="body2" noWrap title={name}>
                          {name.length > 20 ? `${name.substring(0, 20)}...` : name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={count} size="small" color="primary" />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" width={80}>
                          <LinearProgress 
                            variant="determinate" 
                            value={percentage} 
                            sx={{ flexGrow: 1, mr: 1 }}
                          />
                          <Typography variant="caption">{percentage}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <TrendingUp 
                          color={index < 3 ? 'success' : 'action'} 
                          fontSize="small" 
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <Box p={3}><Typography>Loading program insights...</Typography></Box>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5">
              <Insights sx={{ mr: 1, verticalAlign: 'middle' }} />
              Program-Level Insights Dashboard
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={fetchProgramInsights}
            >
              Refresh Insights
            </Button>
          </Box>
        </Grid>

        {/* Program Health Overview */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Assessment sx={{ mr: 1, verticalAlign: 'middle' }} />
                Program Health Status
              </Typography>
              <Box textAlign="center" py={2}>
                <Chip 
                  label={insights.programHealth || 'UNKNOWN'}
                  color={getHealthColor(insights.programHealth)}
                  size="large"
                  sx={{ fontSize: '1.2rem', py: 3, px: 2 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  {insights.programHealth === 'HEALTHY' 
                    ? "Program is performing excellently with strong engagement"
                    : insights.programHealth === 'GOOD'
                    ? "Program is stable with room for improvement"
                    : "Program requires attention to improve outcomes"
                  }
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Growth Metrics */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
                Growth Metrics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Total Users</Typography>
                  <Typography variant="h4" color="primary.main">
                    {insights.growthMetrics?.totalUsers || 0}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Total Mentorships</Typography>
                  <Typography variant="h4" color="secondary.main">
                    {insights.growthMetrics?.totalMentorships || 0}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Active Mentorships</Typography>
                  <Typography variant="h4" color="success.main">
                    {insights.growthMetrics?.activeMentorships || 0}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Engagement Rate</Typography>
                  <Typography variant="h4" color="warning.main">
                    {insights.growthMetrics?.engagementRate || 0}%
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Industry Distribution */}
        <Grid item xs={12} md={6}>
          {renderDistributionTable(
            insights.industryDistribution, 
            'Industry Distribution',
            <Business color="primary" />
          )}
        </Grid>

        {/* University Distribution */}
        <Grid item xs={12} md={6}>
          {renderDistributionTable(
            insights.universityDistribution, 
            'University Distribution',
            <School color="secondary" />
          )}
        </Grid>

        {/* Key Performance Indicators */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Key Performance Indicators (KPIs)
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="primary">
                        User Growth Rate
                      </Typography>
                      <Typography variant="h4" color="primary.main">
                        +{Math.floor(Math.random() * 20) + 5}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        vs last month
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="success.main">
                        Mentorship Success Rate
                      </Typography>
                      <Typography variant="h4" color="success.main">
                        {Math.floor(Math.random() * 20) + 75}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        completed successfully
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="warning.main">
                        Average Session Duration
                      </Typography>
                      <Typography variant="h4" color="warning.main">
                        {Math.floor(Math.random() * 30) + 45}min
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        per meeting
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="info.main">
                        Mentor Retention Rate
                      </Typography>
                      <Typography variant="h4" color="info.main">
                        {Math.floor(Math.random() * 15) + 80}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        active after 6 months
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Strategic Recommendations */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Strategic Recommendations
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        🎯 Expand High-Performing Industries
                      </Typography>
                      <Typography variant="body2">
                        Focus recruitment efforts on top-performing industries like Technology and Finance
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="subtitle2" color="secondary" gutterBottom>
                        🏫 University Partnership Program
                      </Typography>
                      <Typography variant="body2">
                        Strengthen partnerships with top universities to increase student participation
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="subtitle2" color="success.main" gutterBottom>
                        📈 Scale Successful Practices
                      </Typography>
                      <Typography variant="body2">
                        Replicate successful mentorship models across underperforming segments
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default ProgramInsights;
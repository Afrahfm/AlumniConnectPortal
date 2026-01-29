import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button
} from '@mui/material';
import {
  Timeline,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Cancel,
  Refresh
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MentorshipContinuity = () => {
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    fetchContinuityMetrics();
  }, []);

  const fetchContinuityMetrics = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/analytics/mentorship-continuity');
      const data = await response.json();
      setMetrics(data);
      
      // Mock trend data
      setTrends([
        { month: 'Jan', completions: 85, dropouts: 15 },
        { month: 'Feb', completions: 78, dropouts: 22 },
        { month: 'Mar', completions: 92, dropouts: 8 },
        { month: 'Apr', completions: 88, dropouts: 12 },
        { month: 'May', completions: 95, dropouts: 5 }
      ]);
    } catch (error) {
      console.error('Error fetching continuity metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Box p={3}><Typography>Loading continuity metrics...</Typography></Box>;
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
              <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
              Mentorship Continuity Monitoring
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={fetchContinuityMetrics}
            >
              Refresh
            </Button>
          </Box>
        </Grid>

        {/* Key Metrics Cards */}
        <Grid item xs={12} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <CheckCircle color="success" sx={{ mr: 1 }} />
                <Typography variant="h6" color="success.main">Completion Rate</Typography>
              </Box>
              <Typography variant="h3" color="success.main">
                {metrics.completionRate || 0}%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={metrics.completionRate || 0} 
                color="success"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Cancel color="error" sx={{ mr: 1 }} />
                <Typography variant="h6" color="error.main">Dropout Rate</Typography>
              </Box>
              <Typography variant="h3" color="error.main">
                {metrics.dropoutRate || 0}%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={metrics.dropoutRate || 0} 
                color="error"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="primary.main">Average Duration</Typography>
              <Typography variant="h3" color="primary.main">
                {metrics.averageDurationDays || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">days</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="info.main">Active Mentorships</Typography>
              <Typography variant="h3" color="info.main">
                {metrics.activeMentorships || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                of {metrics.totalMentorships || 0} total
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Health Status Alert */}
        <Grid item xs={12}>
          <Alert 
            severity={
              metrics.completionRate >= 80 ? "success" : 
              metrics.completionRate >= 60 ? "warning" : "error"
            }
          >
            <Typography variant="h6">
              Program Health Status: {
                metrics.completionRate >= 80 ? "Excellent" : 
                metrics.completionRate >= 60 ? "Good" : "Needs Attention"
              }
            </Typography>
            <Typography variant="body2">
              {metrics.completionRate >= 80 
                ? "Mentorship program is performing exceptionally well with high completion rates."
                : metrics.completionRate >= 60
                ? "Program is stable but could benefit from retention improvements."
                : "Immediate attention required to address high dropout rates."
              }
            </Typography>
          </Alert>
        </Grid>

        {/* Monthly Trends */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Continuity Trends
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Month</TableCell>
                      <TableCell>Completions</TableCell>
                      <TableCell>Dropouts</TableCell>
                      <TableCell>Trend</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trends.map((trend, index) => (
                      <TableRow key={trend.month}>
                        <TableCell>{trend.month}</TableCell>
                        <TableCell>
                          <Chip 
                            label={`${trend.completions}%`} 
                            color="success" 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={`${trend.dropouts}%`} 
                            color="error" 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>
                          {index > 0 && (
                            trend.completions > trends[index - 1].completions ? 
                            <TrendingUp color="success" /> : 
                            <TrendingDown color="error" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Continuity Improvement Recommendations
              </Typography>
              <Box>
                {metrics.dropoutRate > 20 && (
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    <Typography variant="subtitle2">High Dropout Rate Detected</Typography>
                    <Typography variant="body2">
                      Consider implementing early intervention strategies and regular check-ins.
                    </Typography>
                  </Alert>
                )}
                {metrics.averageDurationDays < 60 && (
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="subtitle2">Short Average Duration</Typography>
                    <Typography variant="body2">
                      Encourage longer-term mentorship commitments for better outcomes.
                    </Typography>
                  </Alert>
                )}
                {metrics.completionRate >= 90 && (
                  <Alert severity="success">
                    <Typography variant="subtitle2">Excellent Performance</Typography>
                    <Typography variant="body2">
                      Current strategies are working well. Consider scaling successful practices.
                    </Typography>
                  </Alert>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default MentorshipContinuity;
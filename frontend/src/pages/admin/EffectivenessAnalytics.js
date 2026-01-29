import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  Assessment,
  Star,
  TrendingUp,
  EmojiEvents,
  Refresh
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const EffectivenessAnalytics = () => {
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [topPerformers, setTopPerformers] = useState([]);

  useEffect(() => {
    fetchEffectivenessMetrics();
  }, []);

  const fetchEffectivenessMetrics = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/analytics/effectiveness');
      const data = await response.json();
      setMetrics(data);
      
      // Mock top performers data
      setTopPerformers([
        { name: 'Sarah Johnson', rating: 4.9, mentorships: 12, industry: 'Technology' },
        { name: 'Michael Chen', rating: 4.8, mentorships: 8, industry: 'Finance' },
        { name: 'Emily Davis', rating: 4.7, mentorships: 15, industry: 'Healthcare' },
        { name: 'David Wilson', rating: 4.6, mentorships: 6, industry: 'Marketing' },
        { name: 'Lisa Brown', rating: 4.5, mentorships: 10, industry: 'Engineering' }
      ]);
    } catch (error) {
      console.error('Error fetching effectiveness metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Box p={3}><Typography>Loading effectiveness analytics...</Typography></Box>;
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
              <Assessment sx={{ mr: 1, verticalAlign: 'middle' }} />
              Mentorship Effectiveness Analytics
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={fetchEffectivenessMetrics}
            >
              Refresh
            </Button>
          </Box>
        </Grid>

        {/* Key Effectiveness Metrics */}
        <Grid item xs={12} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <EmojiEvents color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6" color="warning.main">Success Rate</Typography>
              </Box>
              <Typography variant="h3" color="warning.main">
                {metrics.successRate || 0}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Mentorships rated 4+ stars
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Star color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="primary.main">Avg Mentor Rating</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="h3" color="primary.main" sx={{ mr: 1 }}>
                  {metrics.averageMentorRating || 0}
                </Typography>
                <Rating value={metrics.averageMentorRating || 0} readOnly precision={0.1} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Star color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="secondary.main">Avg Mentee Rating</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="h3" color="secondary.main" sx={{ mr: 1 }}>
                  {metrics.averageMenteeRating || 0}
                </Typography>
                <Rating value={metrics.averageMenteeRating || 0} readOnly precision={0.1} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="info.main">Avg Meetings</Typography>
              <Typography variant="h3" color="info.main">
                {metrics.averageMeetingsCompleted || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                per mentorship
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Effectiveness Breakdown */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Rating Distribution
              </Typography>
              {[5, 4, 3, 2, 1].map((rating) => {
                const percentage = Math.random() * 30 + (rating === 5 ? 40 : rating === 4 ? 30 : 10);
                return (
                  <Box key={rating} display="flex" alignItems="center" mb={1}>
                    <Box display="flex" alignItems="center" width={100}>
                      <Typography variant="body2" sx={{ mr: 1 }}>{rating}</Typography>
                      <Star color="warning" fontSize="small" />
                    </Box>
                    <Box flexGrow={1} mx={2}>
                      <LinearProgress 
                        variant="determinate" 
                        value={percentage} 
                        color={rating >= 4 ? 'success' : rating >= 3 ? 'warning' : 'error'}
                      />
                    </Box>
                    <Typography variant="body2" width={50}>
                      {Math.round(percentage)}%
                    </Typography>
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Meeting Completion Analysis
              </Typography>
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Average Meetings per Mentorship
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(metrics.averageMeetingsCompleted || 0) * 10} 
                  color="primary"
                  sx={{ mt: 1 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {metrics.averageMeetingsCompleted || 0} meetings
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Completion Rate vs Target (8 meetings)
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={((metrics.averageMeetingsCompleted || 0) / 8) * 100} 
                  color="success"
                  sx={{ mt: 1 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {Math.round(((metrics.averageMeetingsCompleted || 0) / 8) * 100)}% of target
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Performing Mentors */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <EmojiEvents sx={{ mr: 1, verticalAlign: 'middle' }} />
                Top Performing Mentors
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Rank</TableCell>
                      <TableCell>Mentor</TableCell>
                      <TableCell>Industry</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Mentorships</TableCell>
                      <TableCell>Performance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topPerformers.map((mentor, index) => (
                      <TableRow key={mentor.name}>
                        <TableCell>
                          <Chip 
                            label={`#${index + 1}`} 
                            color={index === 0 ? 'warning' : index === 1 ? 'info' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{mentor.name}</TableCell>
                        <TableCell>{mentor.industry}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Typography variant="body2" sx={{ mr: 1 }}>
                              {mentor.rating}
                            </Typography>
                            <Rating value={mentor.rating} readOnly size="small" />
                          </Box>
                        </TableCell>
                        <TableCell>{mentor.mentorships}</TableCell>
                        <TableCell>
                          <Chip 
                            label={mentor.rating >= 4.7 ? 'Excellent' : mentor.rating >= 4.5 ? 'Very Good' : 'Good'}
                            color={mentor.rating >= 4.7 ? 'success' : mentor.rating >= 4.5 ? 'primary' : 'default'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Improvement Recommendations */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Effectiveness Improvement Strategies
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="primary">
                        Enhance Mentor Training
                      </Typography>
                      <Typography variant="body2">
                        Provide specialized training for mentors with ratings below 4.0
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="secondary">
                        Increase Meeting Frequency
                      </Typography>
                      <Typography variant="body2">
                        Encourage more regular meetings to improve outcomes
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="warning.main">
                        Recognition Program
                      </Typography>
                      <Typography variant="body2">
                        Implement rewards for top-performing mentors
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

export default EffectivenessAnalytics;
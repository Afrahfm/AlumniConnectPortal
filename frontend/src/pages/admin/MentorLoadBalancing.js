import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  Balance,
  AutoFixHigh,
  Refresh,
  Person,
  TrendingUp,
  CheckCircle
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MentorLoadBalancing = () => {
  const [loadData, setLoadData] = useState({});
  const [loading, setLoading] = useState(true);
  const [balancingDialog, setBalancingDialog] = useState(false);
  const [balancingResult, setBalancingResult] = useState({});
  const [autoBalancing, setAutoBalancing] = useState(false);

  useEffect(() => {
    fetchLoadBalancingData();
  }, []);

  const fetchLoadBalancingData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/analytics/mentor-load-balancing');
      const data = await response.json();
      setLoadData(data);
    } catch (error) {
      console.error('Error fetching load balancing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoBalance = async () => {
    setAutoBalancing(true);
    try {
      const response = await fetch('/api/admin/auto-balance-mentors', {
        method: 'POST'
      });
      const result = await response.json();
      setBalancingResult(result);
      setBalancingDialog(true);
    } catch (error) {
      console.error('Error performing auto-balance:', error);
    } finally {
      setAutoBalancing(false);
    }
  };

  const getLoadStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE': return 'success';
      case 'OPTIMAL': return 'primary';
      case 'HIGH': return 'warning';
      case 'OVERLOADED': return 'error';
      default: return 'default';
    }
  };

  const getLoadPercentage = (currentLoad) => {
    const maxLoad = 5; // Assuming max 5 mentorships per mentor
    return Math.min((currentLoad / maxLoad) * 100, 100);
  };

  if (loading) {
    return <Box p={3}><Typography>Loading load balancing data...</Typography></Box>;
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
              <Balance sx={{ mr: 1, verticalAlign: 'middle' }} />
              Automated Mentor Load Balancing
            </Typography>
            <Box>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={fetchLoadBalancingData}
                sx={{ mr: 2 }}
              >
                Refresh
              </Button>
              <Button
                variant="contained"
                startIcon={<AutoFixHigh />}
                onClick={handleAutoBalance}
                disabled={autoBalancing}
                color="primary"
              >
                {autoBalancing ? 'Balancing...' : 'Auto-Balance'}
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Load Distribution Overview */}
        <Grid item xs={12} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <CheckCircle color="success" sx={{ mr: 1 }} />
                <Typography variant="h6" color="success.main">Available</Typography>
              </Box>
              <Typography variant="h3" color="success.main">
                {loadData.availableMentors || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ready for new mentorships
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Person color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="primary.main">Total Mentors</Typography>
              </Box>
              <Typography variant="h3" color="primary.main">
                {loadData.totalMentors || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active verified mentors
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TrendingUp color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6" color="warning.main">High Load</Typography>
              </Box>
              <Typography variant="h3" color="warning.main">
                {(loadData.mentorLoads || []).filter(m => m.loadStatus === 'HIGH').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Approaching capacity
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Balance color="error" sx={{ mr: 1 }} />
                <Typography variant="h6" color="error.main">Overloaded</Typography>
              </Box>
              <Typography variant="h3" color="error.main">
                {loadData.overloadedMentors || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Need load redistribution
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Load Balancing Recommendations */}
        {loadData.overloadedMentors > 0 && (
          <Grid item xs={12}>
            <Alert severity="warning">
              <Typography variant="h6">Load Balancing Recommended</Typography>
              <Typography variant="body2">
                {loadData.overloadedMentors} mentor(s) are overloaded. Consider redistributing mentorships or recruiting additional mentors.
              </Typography>
            </Alert>
          </Grid>
        )}

        {/* Mentor Load Distribution Table */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mentor Load Distribution
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Mentor</TableCell>
                      <TableCell>Industry</TableCell>
                      <TableCell>Experience</TableCell>
                      <TableCell>Current Load</TableCell>
                      <TableCell>Load Visualization</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(loadData.mentorLoads || []).map((mentor, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {mentor.mentorName}
                          </Typography>
                        </TableCell>
                        <TableCell>{mentor.industry || 'N/A'}</TableCell>
                        <TableCell>{mentor.experience || 0} years</TableCell>
                        <TableCell>
                          <Typography variant="h6" color="primary.main">
                            {mentor.currentLoad}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box width={100}>
                            <LinearProgress 
                              variant="determinate" 
                              value={getLoadPercentage(mentor.currentLoad)}
                              color={
                                mentor.currentLoad === 0 ? 'success' :
                                mentor.currentLoad <= 2 ? 'primary' :
                                mentor.currentLoad <= 4 ? 'warning' : 'error'
                              }
                            />
                            <Typography variant="caption" color="text.secondary">
                              {Math.round(getLoadPercentage(mentor.currentLoad))}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={mentor.loadStatus}
                            color={getLoadStatusColor(mentor.loadStatus)}
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

        {/* Load Balancing Strategies */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Load Balancing Strategies
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        🎯 Smart Matching
                      </Typography>
                      <Typography variant="body2">
                        Automatically match mentees with available mentors based on industry and experience
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="secondary" gutterBottom>
                        📊 Capacity Planning
                      </Typography>
                      <Typography variant="body2">
                        Monitor mentor capacity and proactively recruit new mentors when needed
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="warning.main" gutterBottom>
                        ⚖️ Load Redistribution
                      </Typography>
                      <Typography variant="body2">
                        Redistribute mentorships from overloaded mentors to available ones
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Auto-Balance Results Dialog */}
      <Dialog 
        open={balancingDialog} 
        onClose={() => setBalancingDialog(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <AutoFixHigh sx={{ mr: 1, verticalAlign: 'middle' }} />
          Auto-Balance Results
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {balancingResult.message}
          </Typography>
          <Box mb={2}>
            <Typography variant="body2" color="text.secondary">
              Rebalanced: {balancingResult.rebalancedCount} mentorships
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pending requests: {balancingResult.pendingRequests}
            </Typography>
          </Box>
          
          {(balancingResult.balancingActions || []).length > 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>Recommended Actions:</Typography>
              {balancingResult.balancingActions.map((action, index) => (
                <Alert key={index} severity="info" sx={{ mt: 1 }}>
                  {action}
                </Alert>
              ))}
            </Box>
          )}
          
          {(balancingResult.balancingActions || []).length === 0 && (
            <Alert severity="success">
              All mentors are optimally balanced. No redistribution needed at this time.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBalancingDialog(false)}>Close</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              setBalancingDialog(false);
              fetchLoadBalancingData(); // Refresh data
            }}
          >
            Apply Changes
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default MentorLoadBalancing;
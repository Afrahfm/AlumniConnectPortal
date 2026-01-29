import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  Alert,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Dashboard,
  TrendingUp,
  Warning,
  Balance,
  Insights,
  AutoFixHigh,
  Refresh,
  Assessment,
  Timeline,
  PieChart,
  BarChart
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { adminService } from '../../services/apiService';
import { DashboardStats } from '../../components/dashboard/DashboardComponents';

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [analytics, setAnalytics] = useState({});
  const [continuityMetrics, setContinuityMetrics] = useState({});
  const [effectivenessMetrics, setEffectivenessMetrics] = useState({});
  const [riskAssessment, setRiskAssessment] = useState({});
  const [mentorLoadData, setMentorLoadData] = useState({});
  const [programInsights, setProgramInsights] = useState({});
  const [loading, setLoading] = useState(true);
  const [balancingDialog, setBalancingDialog] = useState(false);
  const [balancingResult, setBalancingResult] = useState({});

  useEffect(() => {
    fetchAllAnalytics();
  }, []);

  const fetchAllAnalytics = async () => {
    setLoading(true);
    try {
      const [
        analyticsRes,
        continuityRes,
        effectivenessRes,
        riskRes,
        loadRes,
        insightsRes
      ] = await Promise.all([
        adminService.getAnalytics(),
        fetch('/api/admin/analytics/mentorship-continuity').then(r => r.json()),
        fetch('/api/admin/analytics/effectiveness').then(r => r.json()),
        fetch('/api/admin/analytics/risk-assessment').then(r => r.json()),
        fetch('/api/admin/analytics/mentor-load-balancing').then(r => r.json()),
        fetch('/api/admin/analytics/program-insights').then(r => r.json())
      ]);

      setAnalytics(analyticsRes);
      setContinuityMetrics(continuityRes);
      setEffectivenessMetrics(effectivenessRes);
      setRiskAssessment(riskRes);
      setMentorLoadData(loadRes);
      setProgramInsights(insightsRes);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoBalance = async () => {
    try {
      const result = await fetch('/api/admin/auto-balance-mentors', {
        method: 'POST'
      }).then(r => r.json());
      
      setBalancingResult(result);
      setBalancingDialog(true);
    } catch (error) {
      console.error('Error performing auto-balance:', error);
    }
  };

  const renderOverviewTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <DashboardStats stats={analytics} userRole="ADMIN" />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card elevation={3}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <Timeline color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Mentorship Continuity</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Completion Rate</Typography>
                <Typography variant="h4" color="success.main">
                  {continuityMetrics.completionRate || 0}%
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Dropout Rate</Typography>
                <Typography variant="h4" color="error.main">
                  {continuityMetrics.dropoutRate || 0}%
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Average Duration: {continuityMetrics.averageDurationDays || 0} days
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={continuityMetrics.completionRate || 0} 
                  sx={{ mt: 1 }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card elevation={3}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <Assessment color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Effectiveness Metrics</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Success Rate</Typography>
                <Typography variant="h4" color="primary.main">
                  {effectivenessMetrics.successRate || 0}%
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Avg Rating</Typography>
                <Typography variant="h4" color="warning.main">
                  {effectivenessMetrics.averageMentorRating || 0}/5 ⭐
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderRiskAssessmentTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Alert 
          severity={riskAssessment.totalAtRisk > 5 ? "error" : riskAssessment.totalAtRisk > 2 ? "warning" : "success"}
          sx={{ mb: 3 }}
        >
          <Typography variant="h6">
            Risk Assessment: {riskAssessment.totalAtRisk || 0} mentorships at risk ({riskAssessment.riskPercentage || 0}%)
          </Typography>
        </Alert>
      </Grid>

      <Grid item xs={12}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <Warning sx={{ mr: 1, verticalAlign: 'middle' }} />
              At-Risk Mentorships
            </Typography>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mentor</TableCell>
                    <TableCell>Mentee</TableCell>
                    <TableCell>Risk Level</TableCell>
                    <TableCell>Risk Score</TableCell>
                    <TableCell>Risk Factors</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(riskAssessment.atRiskMentorships || []).map((risk, index) => (
                    <TableRow key={index}>
                      <TableCell>{risk.mentorName}</TableCell>
                      <TableCell>{risk.menteeName}</TableCell>
                      <TableCell>
                        <Chip 
                          label={risk.riskLevel} 
                          color={risk.riskLevel === 'HIGH' ? 'error' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{risk.riskScore}</TableCell>
                      <TableCell>
                        {risk.riskReasons.map((reason, i) => (
                          <Chip key={i} label={reason} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderLoadBalancingTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5">Mentor Load Balancing</Typography>
          <Button
            variant="contained"
            startIcon={<AutoFixHigh />}
            onClick={handleAutoBalance}
            color="primary"
          >
            Auto-Balance Mentors
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" color="success.main">Available Mentors</Typography>
            <Typography variant="h3">{mentorLoadData.availableMentors || 0}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" color="primary.main">Total Mentors</Typography>
            <Typography variant="h3">{mentorLoadData.totalMentors || 0}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" color="error.main">Overloaded Mentors</Typography>
            <Typography variant="h3">{mentorLoadData.overloadedMentors || 0}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <Balance sx={{ mr: 1, verticalAlign: 'middle' }} />
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
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(mentorLoadData.mentorLoads || []).map((mentor, index) => (
                    <TableRow key={index}>
                      <TableCell>{mentor.mentorName}</TableCell>
                      <TableCell>{mentor.industry || 'N/A'}</TableCell>
                      <TableCell>{mentor.experience || 0} years</TableCell>
                      <TableCell>{mentor.currentLoad}</TableCell>
                      <TableCell>
                        <Chip 
                          label={mentor.loadStatus}
                          color={
                            mentor.loadStatus === 'AVAILABLE' ? 'success' :
                            mentor.loadStatus === 'OPTIMAL' ? 'primary' :
                            mentor.loadStatus === 'HIGH' ? 'warning' : 'error'
                          }
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
    </Grid>
  );

  const renderProgramInsightsTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          <Insights sx={{ mr: 1, verticalAlign: 'middle' }} />
          Program-Level Insights
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Growth Metrics</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Total Users</Typography>
                <Typography variant="h4">{programInsights.growthMetrics?.totalUsers || 0}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Engagement Rate</Typography>
                <Typography variant="h4" color="primary.main">
                  {programInsights.growthMetrics?.engagementRate || 0}%
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Program Health</Typography>
            <Chip 
              label={programInsights.programHealth || 'UNKNOWN'}
              color={programInsights.programHealth === 'HEALTHY' ? 'success' : 'warning'}
              size="large"
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Top Industries</Typography>
            {Object.entries(programInsights.industryDistribution || {})
              .slice(0, 5)
              .map(([industry, count]) => (
                <Box key={industry} display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">{industry}</Typography>
                  <Chip label={count} size="small" />
                </Box>
              ))}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Top Universities</Typography>
            {Object.entries(programInsights.universityDistribution || {})
              .slice(0, 5)
              .map(([university, count]) => (
                <Box key={university} display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">{university}</Typography>
                  <Chip label={count} size="small" />
                </Box>
              ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography variant="h6">Loading Advanced Analytics...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            <Dashboard sx={{ mr: 2, verticalAlign: 'middle' }} />
            Advanced Admin Analytics
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={fetchAllAnalytics}
          >
            Refresh Data
          </Button>
        </Box>

        <Paper elevation={3} sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Overview" icon={<Dashboard />} />
            <Tab label="Risk Assessment" icon={<Warning />} />
            <Tab label="Load Balancing" icon={<Balance />} />
            <Tab label="Program Insights" icon={<Insights />} />
          </Tabs>
        </Paper>

        <Box sx={{ mt: 3 }}>
          {tabValue === 0 && renderOverviewTab()}
          {tabValue === 1 && renderRiskAssessmentTab()}
          {tabValue === 2 && renderLoadBalancingTab()}
          {tabValue === 3 && renderProgramInsightsTab()}
        </Box>

        {/* Auto-Balance Results Dialog */}
        <Dialog open={balancingDialog} onClose={() => setBalancingDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Auto-Balance Results</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              {balancingResult.message}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Rebalanced: {balancingResult.rebalancedCount} mentorships
            </Typography>
            {(balancingResult.balancingActions || []).map((action, index) => (
              <Alert key={index} severity="info" sx={{ mt: 1 }}>
                {action}
              </Alert>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setBalancingDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default AdminDashboard;
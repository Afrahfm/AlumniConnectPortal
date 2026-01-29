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
  Tabs,
  Tab,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import {
  Dashboard,
  TrendingUp,
  Warning,
  Balance,
  Insights,
  Refresh,
  SwapHoriz,
  School,
  Business,
  Login,
  PersonAdd,
  ExitToApp,
  Analytics,
  People
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { adminService } from '../../services/apiService';
import { userAnalyticsService } from '../../services/userAnalyticsService';
import { DashboardStats } from '../../components/dashboard/DashboardComponents';
import MentorshipContinuity from './MentorshipContinuity';
import EffectivenessAnalytics from './EffectivenessAnalytics';
import RiskAssessment from './RiskAssessment';
import MentorLoadBalancing from './MentorLoadBalancing';
import ProgramInsights from './ProgramInsights';

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [authMenuAnchor, setAuthMenuAnchor] = useState(null);
  const [loggedUsers, setLoggedUsers] = useState({
    students: [
      { id: 1, name: 'John Smith', email: 'john@student.edu', loginTime: '2024-01-15 10:30 AM', status: 'online' },
      { id: 2, name: 'Sarah Johnson', email: 'sarah@student.edu', loginTime: '2024-01-15 09:15 AM', status: 'online' },
      { id: 3, name: 'Mike Chen', email: 'mike@student.edu', loginTime: '2024-01-15 08:45 AM', status: 'away' }
    ],
    alumni: [
      { id: 1, name: 'Dr. Emily Rodriguez', email: 'emily@company.com', loginTime: '2024-01-15 11:00 AM', status: 'online' },
      { id: 2, name: 'Prof. Michael Chang', email: 'michael@tech.com', loginTime: '2024-01-15 10:20 AM', status: 'online' }
    ]
  });
  const [userStats, setUserStats] = useState({
    alumni: {
      totalRegistered: 0,
      recentRegistrations: 0,
      totalLogins: 0,
      recentLogins: 0,
      activeUsers: 0
    },
    students: {
      totalRegistered: 0,
      recentRegistrations: 0,
      totalLogins: 0,
      recentLogins: 0,
      activeUsers: 0
    }
  });
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSwitchDashboard = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDashboardMenu = () => {
    setAnchorEl(null);
  };

  const switchToDashboard = (dashboardType) => {
    handleCloseDashboardMenu();
    switch (dashboardType) {
      case 'alumni':
        navigate('/alumni/dashboard');
        break;
      case 'student':
        navigate('/student/dashboard');
        break;
      default:
        break;
    }
  };

  const handleAuthMenu = (event) => {
    setAuthMenuAnchor(event.currentTarget);
  };

  const handleCloseAuthMenu = () => {
    setAuthMenuAnchor(null);
  };

  const navigateToAuth = (authType, userType) => {
    handleCloseAuthMenu();
    if (authType === 'login' && userType === 'student') {
      navigate('/admin/student-login-details');
    } else if (authType === 'register' && userType === 'student') {
      navigate('/admin/student-register-details');
    } else if (authType === 'login' && userType === 'alumni') {
      navigate('/admin/alumni-login-details');
    } else if (authType === 'register' && userType === 'alumni') {
      navigate('/admin/alumni-register-details');
    } else {
      navigate(`/${userType}/${authType}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  useEffect(() => {
    fetchAnalytics();
    fetchUserStats();
  }, []);

  const fetchUserStats = () => {
    const data = userAnalyticsService.getData();
    setUserStats(data);
    
    // Get currently logged users
    const logged = userAnalyticsService.getLoggedUsers();
    if (logged.students || logged.alumni) {
      setLoggedUsers({
        students: logged.students || [],
        alumni: logged.alumni || []
      });
    }
  };

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAnalytics();
      setAnalytics(data);
      // Refresh user stats when analytics are fetched
      fetchUserStats();
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (tabValue) {
      case 0: return <DashboardOverview analytics={analytics} />;
      case 1: return <MentorshipContinuity />;
      case 2: return <EffectivenessAnalytics />;
      case 3: return <RiskAssessment />;
      case 4: return <MentorLoadBalancing />;
      case 5: return <ProgramInsights />;
      default: return <DashboardOverview analytics={analytics} />;
    }
  };

  const DashboardOverview = ({ analytics }) => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <DashboardStats stats={analytics} userRole="ADMIN" />
      </Grid>
      
      {/* User Authentication Analytics */}
      <Grid item xs={12}>
        <Card elevation={3}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={3}>
              <Analytics sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h6">User Authentication Analytics</Typography>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Business sx={{ mr: 2, color: 'primary.main' }} />
                      <Typography variant="h6">Alumni Statistics</Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="h4" color="primary.main" fontWeight="bold">
                          {userStats.alumni.totalRegistered}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Registered
                        </Typography>
                        <Typography variant="caption" color="success.main">
                          +{userStats.alumni.recentRegistrations} this week
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h4" color="success.main" fontWeight="bold">
                          {userStats.alumni.totalLogins}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Logins
                        </Typography>
                        <Typography variant="caption" color="success.main">
                          +{userStats.alumni.recentLogins} this week
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                          Active Users: <strong>{userStats.alumni.activeUsers}</strong>
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <School sx={{ mr: 2, color: 'secondary.main' }} />
                      <Typography variant="h6">Student Statistics</Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="h4" color="secondary.main" fontWeight="bold">
                          {userStats.students.totalRegistered}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Registered
                        </Typography>
                        <Typography variant="caption" color="success.main">
                          +{userStats.students.recentRegistrations} this week
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h4" color="success.main" fontWeight="bold">
                          {userStats.students.totalLogins}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Logins
                        </Typography>
                        <Typography variant="caption" color="success.main">
                          +{userStats.students.recentLogins} this week
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                          Active Users: <strong>{userStats.students.activeUsers}</strong>
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Welcome to Advanced Admin Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Use the tabs above to access detailed analytics and management tools.
            </Typography>
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
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              startIcon={<Login />}
              onClick={handleAuthMenu}
            >
              User Auth
            </Button>
            <Button
              variant="outlined"
              startIcon={<SwapHoriz />}
              onClick={handleSwitchDashboard}
            >
              Switch Dashboard
            </Button>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => {
                fetchAnalytics();
                fetchUserStats();
              }}
            >
              Refresh Data
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<ExitToApp />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>

        <Menu
          anchorEl={authMenuAnchor}
          open={Boolean(authMenuAnchor)}
          onClose={handleCloseAuthMenu}
          PaperProps={{
            sx: { minWidth: 250 }
          }}
        >
          <MenuItem onClick={() => navigateToAuth('login', 'student')}>
            <School sx={{ mr: 2 }} />
            Student Login
          </MenuItem>
          
          <MenuItem onClick={() => navigateToAuth('register', 'student')}>
            <PersonAdd sx={{ mr: 2 }} />
            Student Register
          </MenuItem>
          
          <MenuItem onClick={() => navigateToAuth('login', 'alumni')}>
            <Business sx={{ mr: 2 }} />
            Alumni Login
          </MenuItem>
          
          <MenuItem onClick={() => navigateToAuth('register', 'alumni')}>
            <PersonAdd sx={{ mr: 2 }} />
            Alumni Register
          </MenuItem>
        </Menu>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseDashboardMenu}
        >
          <MenuItem onClick={() => switchToDashboard('alumni')}>
            <Business sx={{ mr: 2 }} />
            Alumni Dashboard
          </MenuItem>
          <MenuItem onClick={() => switchToDashboard('student')}>
            <School sx={{ mr: 2 }} />
            Student Dashboard
          </MenuItem>
        </Menu>

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
            <Tab label="Continuity Monitoring" icon={<TrendingUp />} />
            <Tab label="Effectiveness Analytics" icon={<Insights />} />
            <Tab label="Risk Assessment" icon={<Warning />} />
            <Tab label="Load Balancing" icon={<Balance />} />
            <Tab label="Program Insights" icon={<Insights />} />
          </Tabs>
        </Paper>

        <Box sx={{ mt: 3 }}>
          {renderTabContent()}
        </Box>
      </motion.div>
    </Container>
  );
};

export default AdminDashboard;
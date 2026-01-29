import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  TrendingUp,
  People,
  School,
  Business,
  CheckCircle
} from '@mui/icons-material';
import CountUp from 'react-countup';

const StatCard = ({ title, value, icon: Icon, color = 'primary', trend, subtitle }) => (
  <Card elevation={2} sx={{ height: '100%' }}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography color="text.secondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4" component="div" color={`${color}.main`}>
            <CountUp end={value} duration={2} />
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
          {trend && (
            <Box display="flex" alignItems="center" mt={1}>
              <TrendingUp color="success" fontSize="small" />
              <Typography variant="body2" color="success.main" sx={{ ml: 0.5 }}>
                +{trend}% this month
              </Typography>
            </Box>
          )}
        </Box>
        <Icon sx={{ fontSize: 40, color: `${color}.main`, opacity: 0.7 }} />
      </Box>
    </CardContent>
  </Card>
);

const ProgressCard = ({ title, current, total, color = 'primary' }) => (
  <Card elevation={2}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="h4" color={`${color}.main`}>
          {current}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
          / {total}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={(current / total) * 100}
        color={color}
        sx={{ height: 8, borderRadius: 4 }}
      />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {Math.round((current / total) * 100)}% Complete
      </Typography>
    </CardContent>
  </Card>
);

const ActivityCard = ({ title, activities }) => (
  <Card elevation={2} sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
        {activities.map((activity, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            py={1}
            borderBottom={index < activities.length - 1 ? 1 : 0}
            borderColor="divider"
          >
            <CheckCircle color="success" fontSize="small" sx={{ mr: 2 }} />
            <Box flexGrow={1}>
              <Typography variant="body2">
                {activity.description}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {activity.time}
              </Typography>
            </Box>
            {activity.status && (
              <Chip
                label={activity.status}
                size="small"
                color={activity.status === 'Completed' ? 'success' : 'warning'}
                variant="outlined"
              />
            )}
          </Box>
        ))}
      </Box>
    </CardContent>
  </Card>
);

const DashboardStats = ({ stats, userRole }) => {
  const getStatsForRole = () => {
    switch (userRole) {
      case 'ADMIN':
        return [
          {
            title: 'Total Users',
            value: stats.totalUsers || 0,
            icon: People,
            color: 'primary',
            trend: 12
          },
          {
            title: 'Active Students',
            value: stats.totalStudents || 0,
            icon: School,
            color: 'secondary',
            trend: 8
          },
          {
            title: 'Verified Alumni',
            value: stats.verifiedAlumni || 0,
            icon: Business,
            color: 'success',
            trend: 15
          },
          {
            title: 'Active Mentorships',
            value: stats.activeMentorships || 0,
            icon: TrendingUp,
            color: 'warning',
            trend: 20
          }
        ];
      case 'STUDENT':
        return [
          {
            title: 'My Mentorships',
            value: stats.myMentorships || 0,
            icon: People,
            color: 'primary'
          },
          {
            title: 'Active Connections',
            value: stats.activeConnections || 0,
            icon: TrendingUp,
            color: 'success'
          },
          {
            title: 'Completed Sessions',
            value: stats.completedSessions || 0,
            icon: CheckCircle,
            color: 'info'
          },
          {
            title: 'Available Alumni',
            value: stats.availableAlumni || 0,
            icon: Business,
            color: 'secondary'
          }
        ];
      case 'ALUMNI':
        return [
          {
            title: 'Mentoring Students',
            value: stats.mentoringStudents || 0,
            icon: School,
            color: 'primary'
          },
          {
            title: 'Pending Requests',
            value: stats.pendingRequests || 0,
            icon: TrendingUp,
            color: 'warning'
          },
          {
            title: 'Completed Mentorships',
            value: stats.completedMentorships || 0,
            icon: CheckCircle,
            color: 'success'
          },
          {
            title: 'Average Rating',
            value: stats.averageRating || 0,
            icon: TrendingUp,
            color: 'info',
            subtitle: '⭐ out of 5'
          }
        ];
      default:
        return [];
    }
  };

  return (
    <Grid container spacing={3}>
      {getStatsForRole().map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export { StatCard, ProgressCard, ActivityCard, DashboardStats };
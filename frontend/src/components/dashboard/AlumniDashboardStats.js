import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  People,
  Business,
  Assessment,
  TrendingUp,
  Psychology,
  EmojiEvents
} from '@mui/icons-material';

const AlumniDashboardStats = ({ stats, onStatClick }) => {
  const StatCard = ({ title, value, icon, color, subtitle, progress, onClick }) => (
    <Card 
      sx={{ 
        '&:hover': { 
          transform: 'translateY(-4px)', 
          transition: 'all 0.3s ease',
          boxShadow: 3
        },
        cursor: onClick ? 'pointer' : 'default',
        border: `1px solid ${color}20`,
        borderTop: `4px solid ${color}`
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
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
        {progress !== undefined && (
          <Box mt={2}>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                height: 6, 
                borderRadius: 3,
                backgroundColor: `${color}20`,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: color
                }
              }} 
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              {progress}% of target
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total Mentees"
          value={stats.totalMentees}
          icon={<People sx={{ fontSize: 40 }} />}
          color="#2563eb"
          subtitle="All time"
          progress={Math.min((stats.totalMentees / 15) * 100, 100)}
          onClick={() => onStatClick?.('mentees')}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Active Mentorships"
          value={stats.activeMentorships}
          icon={<Business sx={{ fontSize: 40 }} />}
          color="#059669"
          subtitle="Currently ongoing"
          progress={Math.min((stats.activeMentorships / 10) * 100, 100)}
          onClick={() => onStatClick?.('active')}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Completed Sessions"
          value={stats.completedSessions}
          icon={<Assessment sx={{ fontSize: 40 }} />}
          color="#dc2626"
          subtitle="This month: +12"
          progress={Math.min((stats.completedSessions / 60) * 100, 100)}
          onClick={() => onStatClick?.('sessions')}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Average Rating"
          value={stats.averageRating}
          icon={<TrendingUp sx={{ fontSize: 40 }} />}
          color="#7c3aed"
          subtitle="out of 5.0"
          progress={(stats.averageRating / 5) * 100}
          onClick={() => onStatClick?.('rating')}
        />
      </Grid>
      
      {/* Additional AI-Enhanced Stats */}
      <Grid item xs={12} sm={6} md={4}>
        <StatCard
          title="AI Impact Score"
          value={stats.aiImpactScore || 94}
          icon={<Psychology sx={{ fontSize: 40 }} />}
          color="#f59e0b"
          subtitle="AI calculated"
          progress={stats.aiImpactScore || 94}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatCard
          title="Career Placements"
          value={stats.careerPlacements || 5}
          icon={<EmojiEvents sx={{ fontSize: 40 }} />}
          color="#10b981"
          subtitle="Successful placements"
          progress={Math.min(((stats.careerPlacements || 5) / 8) * 100, 100)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ border: '1px solid #e5e7eb' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Response Rate</Typography>
                <Chip label="98%" color="success" size="small" />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Session Completion</Typography>
                <Chip label="96%" color="success" size="small" />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Mentee Satisfaction</Typography>
                <Chip label="4.8/5" color="primary" size="small" />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AlumniDashboardStats;
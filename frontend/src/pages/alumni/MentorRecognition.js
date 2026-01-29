import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Alert,
  LinearProgress,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Divider
} from '@mui/material';
import {
  EmojiEvents,
  Star,
  TrendingUp,
  Share,
  Download,
  Psychology,
  Celebration,
  WorkspacePremium,
  Military,
  School,
  Business
} from '@mui/icons-material';

const MentorRecognition = () => {
  const [achievements, setAchievements] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [shareDialog, setShareDialog] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  useEffect(() => {
    fetchRecognitionData();
  }, []);

  const fetchRecognitionData = () => {
    setAchievements([
      {
        id: 1,
        title: 'Mentor of the Month',
        description: 'Outstanding mentorship performance in January 2024',
        date: '2024-01-31',
        type: 'monthly',
        icon: <Star />,
        color: '#ffd700',
        points: 500,
        criteria: 'Highest mentee satisfaction score (4.9/5.0)',
        badge: 'gold'
      },
      {
        id: 2,
        title: 'Career Catalyst',
        description: '5 mentees successfully placed in their dream jobs',
        date: '2024-01-15',
        type: 'milestone',
        icon: <TrendingUp />,
        color: '#4caf50',
        points: 1000,
        criteria: 'Achieved 5+ successful job placements',
        badge: 'platinum'
      },
      {
        id: 3,
        title: 'Innovation Leader',
        description: 'Introduced AI-powered mentoring techniques',
        date: '2024-01-10',
        type: 'innovation',
        icon: <Psychology />,
        color: '#9c27b0',
        points: 300,
        criteria: 'First to adopt new mentoring methodologies',
        badge: 'silver'
      },
      {
        id: 4,
        title: 'Consistency Champion',
        description: '50 consecutive mentoring sessions completed',
        date: '2024-01-05',
        type: 'consistency',
        icon: <WorkspacePremium />,
        color: '#ff9800',
        points: 750,
        criteria: 'Maintained perfect attendance record',
        badge: 'gold'
      }
    ]);

    setLeaderboard([
      {
        rank: 1,
        name: 'You',
        points: 2550,
        achievements: 12,
        mentees: 8,
        rating: 4.9,
        trend: 'up'
      },
      {
        rank: 2,
        name: 'Dr. Emily Rodriguez',
        points: 2340,
        achievements: 10,
        mentees: 6,
        rating: 4.8,
        trend: 'up'
      },
      {
        rank: 3,
        name: 'Prof. Michael Chang',
        points: 2180,
        achievements: 9,
        mentees: 7,
        rating: 4.7,
        trend: 'stable'
      },
      {
        rank: 4,
        name: 'Sarah Williams',
        points: 1950,
        achievements: 8,
        mentees: 5,
        rating: 4.6,
        trend: 'down'
      }
    ]);
  };

  const shareAchievement = (achievement) => {
    setSelectedAchievement(achievement);
    setShareDialog(true);
  };

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'platinum': return <Military sx={{ color: '#e5e4e2' }} />;
      case 'gold': return <EmojiEvents sx={{ color: '#ffd700' }} />;
      case 'silver': return <WorkspacePremium sx={{ color: '#c0c0c0' }} />;
      default: return <Star sx={{ color: '#cd7f32' }} />;
    }
  };

  const AchievementCard = ({ achievement }) => (
    <Card sx={{ mb: 2, border: `2px solid ${achievement.color}` }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: achievement.color, mr: 2 }}>
              {achievement.icon}
            </Avatar>
            <Box>
              <Typography variant="h6">{achievement.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {achievement.description}
              </Typography>
            </Box>
          </Box>
          <Box textAlign="center">
            {getBadgeIcon(achievement.badge)}
            <Typography variant="caption" display="block">
              {achievement.badge.toUpperCase()}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Chip
            label={`${achievement.points} points`}
            color="primary"
            size="small"
          />
          <Typography variant="caption" color="text.secondary">
            Earned on {achievement.date}
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Criteria:</strong> {achievement.criteria}
          </Typography>
        </Alert>

        <Box display="flex" gap={1}>
          <Button
            size="small"
            startIcon={<Share />}
            onClick={() => shareAchievement(achievement)}
          >
            Share
          </Button>
          <Button size="small" startIcon={<Download />}>
            Download Certificate
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  const LeaderboardCard = ({ mentor, index }) => (
    <ListItem
      sx={{
        bgcolor: mentor.rank === 1 ? 'gold.light' : 'transparent',
        borderRadius: 1,
        mb: 1,
        border: mentor.name === 'You' ? '2px solid #1976d2' : '1px solid #e0e0e0'
      }}
    >
      <ListItemAvatar>
        <Badge
          badgeContent={mentor.rank}
          color={mentor.rank === 1 ? 'primary' : 'default'}
        >
          <Avatar sx={{ bgcolor: mentor.rank <= 3 ? '#ffd700' : '#gray' }}>
            {mentor.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="subtitle1" fontWeight={mentor.name === 'You' ? 'bold' : 'normal'}>
              {mentor.name}
            </Typography>
            {mentor.name === 'You' && <Chip label="You" color="primary" size="small" />}
          </Box>
        }
        secondary={
          <Box>
            <Typography variant="body2">
              {mentor.points} points • {mentor.achievements} achievements • {mentor.mentees} mentees
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={0.5}>
              <Rating value={mentor.rating} precision={0.1} size="small" readOnly />
              <Typography variant="caption">({mentor.rating})</Typography>
              <TrendingUp
                fontSize="small"
                color={mentor.trend === 'up' ? 'success' : mentor.trend === 'down' ? 'error' : 'disabled'}
              />
            </Box>
          </Box>
        }
      />
    </ListItem>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <EmojiEvents sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Mentor Recognition & Achievements
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Celebrate your mentoring excellence and track your impact
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Achievement Summary */}
        <Grid item xs={12}>
          <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Your Recognition Summary
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Outstanding performance in mentorship excellence
                  </Typography>
                </Box>
                <Celebration sx={{ fontSize: 60, opacity: 0.7 }} />
              </Box>
              
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h3" fontWeight="bold">2,550</Typography>
                    <Typography variant="body2">Total Points</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h3" fontWeight="bold">12</Typography>
                    <Typography variant="body2">Achievements</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h3" fontWeight="bold">#1</Typography>
                    <Typography variant="body2">Leaderboard Rank</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h3" fontWeight="bold">4.9</Typography>
                    <Typography variant="body2">Avg Rating</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Achievements */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Achievements
              </Typography>
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Leaderboard */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mentor Leaderboard
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Top mentors this month
              </Typography>
              
              <List>
                {leaderboard.map((mentor, index) => (
                  <LeaderboardCard key={index} mentor={mentor} index={index} />
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Progress to Next Achievement */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Next Achievement
              </Typography>
              <Box mb={2}>
                <Typography variant="body2" gutterBottom>
                  Master Mentor (10 successful placements)
                </Typography>
                <LinearProgress variant="determinate" value={50} sx={{ height: 8, borderRadius: 4 }} />
                <Typography variant="caption" color="text.secondary">
                  5 of 10 placements completed
                </Typography>
              </Box>
              
              <Alert severity="info">
                <Typography variant="body2">
                  Help 5 more mentees secure their dream jobs to unlock the Master Mentor badge!
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Share Achievement Dialog */}
      <Dialog open={shareDialog} onClose={() => setShareDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Share Your Achievement</DialogTitle>
        <DialogContent>
          {selectedAchievement && (
            <Box textAlign="center" py={2}>
              <Avatar sx={{ bgcolor: selectedAchievement.color, width: 80, height: 80, mx: 'auto', mb: 2 }}>
                {selectedAchievement.icon}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {selectedAchievement.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {selectedAchievement.description}
              </Typography>
              
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Add a message (optional)"
                sx={{ mt: 2 }}
                placeholder="I'm proud to share this achievement..."
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialog(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<Share />}>
            Share on LinkedIn
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MentorRecognition;
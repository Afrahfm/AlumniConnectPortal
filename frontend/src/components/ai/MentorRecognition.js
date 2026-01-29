import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
  Chip,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
  Badge
} from '@mui/material';
import {
  EmojiEvents,
  Star,
  TrendingUp,
  Share,
  ThumbUp,
  WorkspacePremium
} from '@mui/icons-material';
import ShareAchievementDialog from './ShareAchievementDialog';

const MentorRecognition = () => {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [recognition] = useState({
    currentLevel: 'Gold Mentor',
    points: 2450,
    nextLevel: 'Platinum Mentor',
    pointsToNext: 550,
    badges: [
      { name: 'Session Master', icon: '📚', earned: true, description: '50+ sessions completed' },
      { name: 'Career Catalyst', icon: '🚀', earned: true, description: 'Helped 5+ mentees get jobs' },
      { name: 'Top Rated', icon: '⭐', earned: true, description: '4.8+ average rating' },
      { name: 'Consistency King', icon: '👑', earned: false, description: '6 months active mentoring' }
    ],
    leaderboard: [
      { rank: 1, name: 'Sarah Wilson', points: 3200, level: 'Platinum' },
      { rank: 2, name: 'John Doe', points: 2450, level: 'Gold', isCurrentUser: true },
      { rank: 3, name: 'Mike Johnson', points: 2100, level: 'Gold' },
      { rank: 4, name: 'Emily Chen', points: 1850, level: 'Silver' }
    ],
    recentAchievements: [
      { title: 'Reached 50 Sessions!', date: '2024-01-25', points: 100 },
      { title: 'Perfect Week Rating', date: '2024-01-20', points: 50 }
    ]
  });

  const progressToNext = (recognition.points / (recognition.points + recognition.pointsToNext)) * 100;

  const handleShareAchievement = () => {
    setSelectedAchievement({
      id: 'gold-mentor-2024',
      level: recognition.currentLevel,
      points: recognition.points,
      badge: '🏆',
      title: `${recognition.currentLevel} Achievement`,
      description: `Reached ${recognition.currentLevel} status with ${recognition.points} points!`
    });
    setShareDialogOpen(true);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <WorkspacePremium color="warning" />
                <Typography variant="h6">Recognition Status</Typography>
              </Box>

              <Box textAlign="center" mb={3}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'warning.main',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <EmojiEvents sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h5" color="warning.main">
                  {recognition.currentLevel}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {recognition.points} points earned
                </Typography>
              </Box>

              <Box mb={3}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Progress to {recognition.nextLevel}</Typography>
                  <Typography variant="body2" color="primary">
                    {recognition.pointsToNext} points to go
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={progressToNext}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Button
                variant="contained"
                startIcon={<Share />}
                fullWidth
                sx={{ mb: 2 }}
                onClick={handleShareAchievement}
              >
                Share Achievement
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Achievement Badges
              </Typography>
              <Grid container spacing={2}>
                {recognition.badges.map((badge, index) => (
                  <Grid item xs={6} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        border: 1,
                        borderColor: badge.earned ? 'success.main' : 'grey.300',
                        borderRadius: 2,
                        textAlign: 'center',
                        opacity: badge.earned ? 1 : 0.5
                      }}
                    >
                      <Typography variant="h4" sx={{ mb: 1 }}>
                        {badge.icon}
                      </Typography>
                      <Typography variant="subtitle2" gutterBottom>
                        {badge.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {badge.description}
                      </Typography>
                      {badge.earned && (
                        <Chip
                          label="Earned"
                          color="success"
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Leaderboard
              </Typography>
              <List>
                {recognition.leaderboard.map((mentor, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      bgcolor: mentor.isCurrentUser ? 'primary.light' : 'transparent',
                      borderRadius: 1,
                      mb: 1
                    }}
                  >
                    <ListItemAvatar>
                      <Badge
                        badgeContent={mentor.rank}
                        color="primary"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      >
                        <Avatar>{mentor.name[0]}</Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="subtitle2">
                            {mentor.name}
                            {mentor.isCurrentUser && ' (You)'}
                          </Typography>
                          <Chip label={mentor.level} size="small" />
                        </Box>
                      }
                      secondary={`${mentor.points} points`}
                    />
                    {mentor.rank === 1 && <EmojiEvents color="warning" />}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Achievements
              </Typography>
              <List>
                {recognition.recentAchievements.map((achievement, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'success.main' }}>
                        <Star />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={achievement.title}
                      secondary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="caption">
                            {achievement.date}
                          </Typography>
                          <Chip
                            label={`+${achievement.points} pts`}
                            size="small"
                            color="success"
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <ShareAchievementDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        achievement={selectedAchievement}
      />
    </>
  );
};

export default MentorRecognition;
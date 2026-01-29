import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Share,
  Facebook,
  Twitter,
  LinkedIn,
  Link,
  ContentCopy,
  EmojiEvents
} from '@mui/icons-material';

const ShareAchievementDialog = ({ open, onClose, achievement }) => {
  const [message, setMessage] = useState('');
  const [shareUrl] = useState(`https://alumniconnect.com/achievement/${achievement?.id || 'demo'}`);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const defaultAchievement = {
    level: 'Gold Mentor',
    points: 2450,
    badge: '🏆',
    title: 'Top Mentor Achievement',
    description: 'Reached Gold Mentor status with 2450 points!'
  };

  const currentAchievement = achievement || defaultAchievement;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setSnackbarOpen(true);
  };

  const handleSocialShare = (platform) => {
    const text = `🎉 Just achieved ${currentAchievement.level} status on Alumni Connect! ${currentAchievement.description} #Mentoring #Achievement`;
    const url = shareUrl;
    
    let shareLink = '';
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`;
        break;
      default:
        return;
    }
    
    window.open(shareLink, '_blank', 'width=600,height=400');
  };

  const handleCustomShare = () => {
    const customText = message || `Check out my ${currentAchievement.level} achievement on Alumni Connect!`;
    console.log('Custom share:', customText);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={2}>
            <Share color="primary" />
            Share Your Achievement
          </Box>
        </DialogTitle>
        
        <DialogContent>
          {/* Achievement Preview */}
          <Card sx={{ mb: 3, bgcolor: 'primary.light', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'warning.main',
                  mx: 'auto',
                  mb: 2,
                  fontSize: '2rem'
                }}
              >
                {currentAchievement.badge}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {currentAchievement.level}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {currentAchievement.description}
              </Typography>
              <Chip
                label={`${currentAchievement.points} Points`}
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
            </CardContent>
          </Card>

          {/* Custom Message */}
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Add a personal message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your thoughts about this achievement..."
            sx={{ mb: 3 }}
          />

          {/* Share Options */}
          <Typography variant="h6" gutterBottom>
            Share on Social Media
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                onClick={() => handleSocialShare('facebook')}
                sx={{ 
                  color: '#1877F2', 
                  borderColor: '#1877F2',
                  '&:hover': { bgcolor: '#1877F2', color: 'white' }
                }}
              >
                Facebook
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Twitter />}
                onClick={() => handleSocialShare('twitter')}
                sx={{ 
                  color: '#1DA1F2', 
                  borderColor: '#1DA1F2',
                  '&:hover': { bgcolor: '#1DA1F2', color: 'white' }
                }}
              >
                Twitter
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<LinkedIn />}
                onClick={() => handleSocialShare('linkedin')}
                sx={{ 
                  color: '#0A66C2', 
                  borderColor: '#0A66C2',
                  '&:hover': { bgcolor: '#0A66C2', color: 'white' }
                }}
              >
                LinkedIn
              </Button>
            </Grid>
          </Grid>

          {/* Copy Link */}
          <Typography variant="h6" gutterBottom>
            Share Link
          </Typography>
          <Box display="flex" gap={1}>
            <TextField
              fullWidth
              value={shareUrl}
              InputProps={{ readOnly: true }}
              size="small"
            />
            <IconButton onClick={handleCopyLink} color="primary">
              <ContentCopy />
            </IconButton>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleCustomShare} variant="contained">
            Share Achievement
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShareAchievementDialog;
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import {
  VideoCall,
  Chat,
  MoreVert,
  TrendingUp,
  Schedule,
  Star
} from '@mui/icons-material';
import ChatBox from '../../components/chat/ChatBox';
import VideoCallDialog from '../../components/meetings/VideoCallDialog';

const MyMentees = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [videoCallOpen, setVideoCallOpen] = useState(false);
  const [selectedMentee, setSelectedMentee] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const mentees = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      university: 'MIT',
      major: 'Computer Science',
      year: 'Senior',
      goals: ['Software Engineer Role', 'Technical Skills'],
      progress: 85,
      sessions: 12,
      rating: 5,
      status: 'Active',
      nextSession: '2024-01-30 2:00 PM',
      recentActivity: 'Completed React certification'
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      university: 'Stanford',
      major: 'Data Science',
      year: 'Junior',
      goals: ['Data Analyst Role', 'Python Skills'],
      progress: 72,
      sessions: 8,
      rating: 4,
      status: 'Active',
      nextSession: '2024-02-01 10:00 AM',
      recentActivity: 'Working on portfolio project'
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol@example.com',
      university: 'UC Berkeley',
      major: 'Business',
      year: 'Graduate',
      goals: ['Product Manager Role', 'Leadership'],
      progress: 90,
      sessions: 15,
      rating: 5,
      status: 'Active',
      nextSession: '2024-01-29 4:00 PM',
      recentActivity: 'Landed PM internship'
    }
  ];

  const handleVideoCall = (mentee) => {
    setSelectedMentee(mentee);
    setVideoCallOpen(true);
  };

  const handleChat = (mentee) => {
    setSelectedMentee(mentee);
    setChatOpen(true);
  };

  const MenteeCard = ({ mentee }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ width: 56, height: 56 }}>
              {mentee.name.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <Box>
              <Typography variant="h6">{mentee.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {mentee.university} • {mentee.major}
              </Typography>
              <Chip label={mentee.status} color="success" size="small" />
            </Box>
          </Box>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVert />
          </IconButton>
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle2" gutterBottom>
            Progress: {mentee.progress}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={mentee.progress}
            sx={{ height: 8, borderRadius: 4 }}
            color={mentee.progress > 80 ? 'success' : 'primary'}
          />
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle2" gutterBottom>Goals:</Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            {mentee.goals.map((goal, index) => (
              <Chip key={index} label={goal} size="small" variant="outlined" />
            ))}
          </Box>
        </Box>

        <Box mb={2}>
          <Typography variant="body2" color="text.secondary">
            Sessions: {mentee.sessions} • Rating: {mentee.rating}/5 ⭐
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Next: {mentee.nextSession}
          </Typography>
        </Box>

        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            size="small"
            startIcon={<VideoCall />}
            onClick={() => handleVideoCall(mentee)}
          >
            Call
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Chat />}
            onClick={() => handleChat(mentee)}
          >
            Chat
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Mentees
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Manage and track your mentee relationships
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {mentees.map((mentee) => (
          <Grid item xs={12} md={6} lg={4} key={mentee.id}>
            <MenteeCard mentee={mentee} />
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <List>
          {mentees.map((mentee) => (
            <ListItem key={mentee.id}>
              <ListItemAvatar>
                <Avatar>{mentee.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={mentee.name}
                secondary={mentee.recentActivity}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <ChatBox
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        recipientName={selectedMentee?.name}
      />

      <VideoCallDialog
        open={videoCallOpen}
        onClose={() => setVideoCallOpen(false)}
        recipientName={selectedMentee?.name}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem>View Profile</MenuItem>
        <MenuItem>Schedule Session</MenuItem>
        <MenuItem>View Progress</MenuItem>
      </Menu>
    </Container>
  );
};

export default MyMentees;
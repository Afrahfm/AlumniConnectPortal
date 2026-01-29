import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tabs,
  Tab,
  IconButton,
  Fab
} from '@mui/material';
import {
  VideoCall,
  Schedule,
  History,
  Add,
  AccessTime,
  Person
} from '@mui/icons-material';
import VideoCallDialog from '../../components/meetings/VideoCallDialog';

const MeetingsPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [videoCallOpen, setVideoCallOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const upcomingMeetings = [
    {
      id: 1,
      title: 'Mock Interview Session',
      mentor: 'John Doe',
      date: '2024-01-28',
      time: '2:00 PM',
      duration: '60 min',
      type: 'Video Call',
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Project Review',
      mentor: 'Sarah Wilson',
      date: '2024-01-30',
      time: '10:00 AM',
      duration: '45 min',
      type: 'Video Call',
      status: 'scheduled'
    }
  ];

  const pastMeetings = [
    {
      id: 4,
      title: 'Resume Review',
      mentor: 'John Doe',
      date: '2024-01-20',
      time: '2:00 PM',
      duration: '45 min',
      type: 'Video Call',
      status: 'completed',
      rating: 5
    }
  ];

  const handleJoinMeeting = (meeting) => {
    setSelectedMeeting(meeting);
    setVideoCallOpen(true);
  };

  const MeetingCard = ({ meeting, showJoinButton = false }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              {meeting.title}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Person fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                with {meeting.mentor}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Schedule fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <AccessTime fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                Duration: {meeting.duration}
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Chip label={meeting.type} color="primary" size="small" />
              <Chip 
                label={meeting.status} 
                color={meeting.status === 'completed' ? 'success' : 'warning'} 
                size="small" 
              />
              {meeting.rating && (
                <Chip label={`${meeting.rating}/5 stars`} color="success" size="small" />
              )}
            </Box>
          </Box>
          {showJoinButton && (
            <Button
              variant="contained"
              startIcon={<VideoCall />}
              onClick={() => handleJoinMeeting(meeting)}
              sx={{ ml: 2 }}
            >
              Join
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" gutterBottom>
          My Meetings
        </Typography>
        <Button variant="contained" startIcon={<Add />} color="primary">
          Schedule Meeting
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Upcoming" />
          <Tab label="Past Meetings" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Upcoming Meetings ({upcomingMeetings.length})
          </Typography>
          {upcomingMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} showJoinButton={true} />
          ))}
        </Box>
      )}

      {tabValue === 1 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Past Meetings ({pastMeetings.length})
          </Typography>
          {pastMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} showJoinButton={false} />
          ))}
        </Box>
      )}

      <VideoCallDialog
        open={videoCallOpen}
        onClose={() => setVideoCallOpen(false)}
        recipientName={selectedMeeting?.mentor}
      />
    </Container>
  );
};

export default MeetingsPage;
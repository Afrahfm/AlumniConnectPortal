import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Avatar,
  IconButton,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  VideoCall,
  Schedule,
  Person,
  Add,
  ArrowBack,
  AccessTime,
  CalendarToday
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Meetings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [meetings, setMeetings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    mentorName: ''
  });

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = () => {
    // Mock data - replace with actual API call
    setMeetings([
      {
        id: 1,
        title: 'Career Guidance Session',
        date: '2026-01-30',
        time: '10:00 AM',
        mentor: { name: 'John Doe', avatar: 'JD' },
        status: 'scheduled'
      },
      {
        id: 2,
        title: 'Technical Interview Prep',
        date: '2026-02-02',
        time: '2:00 PM',
        mentor: { name: 'Jane Smith', avatar: 'JS' },
        status: 'scheduled'
      },
      {
        id: 3,
        title: 'Resume Review',
        date: '2026-01-25',
        time: '11:00 AM',
        mentor: { name: 'Mike Johnson', avatar: 'MJ' },
        status: 'completed'
      }
    ]);
  };

  const handleScheduleMeeting = () => {
    if (!newMeeting.title || !newMeeting.date || !newMeeting.time) {
      toast.error('Please fill all required fields');
      return;
    }

    const meeting = {
      id: meetings.length + 1,
      title: newMeeting.title,
      date: newMeeting.date,
      time: newMeeting.time,
      mentor: { name: newMeeting.mentorName || 'TBD', avatar: 'T' },
      status: 'scheduled'
    };

    setMeetings([...meetings, meeting]);
    setOpenDialog(false);
    setNewMeeting({ title: '', date: '', time: '', mentorName: '' });
    toast.success('Meeting scheduled successfully!');
  };

  const joinMeeting = (meetingId) => {
    navigate(`/video-call/${meetingId}`);
  };

  const cancelMeeting = (meetingId) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === meetingId 
        ? { ...meeting, status: 'cancelled' }
        : meeting
    ));
    toast.success('Meeting cancelled successfully!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'primary';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const upcomingMeetings = meetings.filter(m => m.status === 'scheduled');
  const pastMeetings = meetings.filter(m => m.status === 'completed');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate('/student/dashboard')}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            My Meetings
          </Typography>
          <Button
            color="inherit"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
          >
            Schedule Meeting
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Upcoming Meetings */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Upcoming Meetings ({upcomingMeetings.length})
                </Typography>
                <List>
                  {upcomingMeetings.map((meeting) => (
                    <React.Fragment key={meeting.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>{meeting.mentor.avatar}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={meeting.title}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                with {meeting.mentor.name}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                <CalendarToday sx={{ fontSize: 14 }} />
                                <Typography variant="caption">{meeting.date}</Typography>
                                <AccessTime sx={{ fontSize: 14, ml: 1 }} />
                                <Typography variant="caption">{meeting.time}</Typography>
                              </Box>
                            </Box>
                          }
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Chip
                            label={meeting.status}
                            color={getStatusColor(meeting.status)}
                            size="small"
                          />
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<VideoCall />}
                            onClick={() => joinMeeting(meeting.id)}
                          >
                            Join
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => cancelMeeting(meeting.id)}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                  {upcomingMeetings.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                      No upcoming meetings
                    </Typography>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Past Meetings */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Past Meetings ({pastMeetings.length})
                </Typography>
                <List>
                  {pastMeetings.map((meeting) => (
                    <React.Fragment key={meeting.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>{meeting.mentor.avatar}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={meeting.title}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                with {meeting.mentor.name}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                <CalendarToday sx={{ fontSize: 14 }} />
                                <Typography variant="caption">{meeting.date}</Typography>
                                <AccessTime sx={{ fontSize: 14, ml: 1 }} />
                                <Typography variant="caption">{meeting.time}</Typography>
                              </Box>
                            </Box>
                          }
                        />
                        <Chip
                          label={meeting.status}
                          color={getStatusColor(meeting.status)}
                          size="small"
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Schedule Meeting Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule New Meeting</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Meeting Title"
            value={newMeeting.title}
            onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Mentor Name"
            value={newMeeting.mentorName}
            onChange={(e) => setNewMeeting({ ...newMeeting, mentorName: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={newMeeting.date}
            onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Time"
            type="time"
            value={newMeeting.time}
            onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleScheduleMeeting} variant="contained">
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Meetings;
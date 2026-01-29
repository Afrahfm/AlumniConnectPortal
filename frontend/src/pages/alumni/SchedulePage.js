import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton,
  Fab
} from '@mui/material';
import {
  Add,
  VideoCall,
  Schedule,
  AccessTime,
  Person,
  Today
} from '@mui/icons-material';
import ScheduleMeetingDialog from '../../components/meetings/ScheduleMeetingDialog';
import SmartScheduling from '../../components/ai/SmartScheduling';

const SchedulePage = () => {
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const upcomingSessions = [
    {
      id: 1,
      title: 'Career Planning with Alice',
      mentee: 'Alice Johnson',
      date: '2024-01-30',
      time: '2:00 PM',
      duration: '60 min',
      type: 'Video Call',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Technical Interview Prep',
      mentee: 'Bob Smith',
      date: '2024-02-01',
      time: '10:00 AM',
      duration: '45 min',
      type: 'Video Call',
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'Portfolio Review',
      mentee: 'Carol Davis',
      date: '2024-02-02',
      time: '4:00 PM',
      duration: '30 min',
      type: 'Video Call',
      status: 'pending'
    }
  ];

  const weeklySchedule = [
    { day: 'Monday', date: '29', sessions: 1, available: true },
    { day: 'Tuesday', date: '30', sessions: 2, available: true },
    { day: 'Wednesday', date: '31', sessions: 0, available: true },
    { day: 'Thursday', date: '1', sessions: 1, available: true },
    { day: 'Friday', date: '2', sessions: 1, available: true },
    { day: 'Saturday', date: '3', sessions: 0, available: false },
    { day: 'Sunday', date: '4', sessions: 0, available: false }
  ];

  const handleScheduleMeeting = (meetingData) => {
    console.log('New meeting scheduled:', meetingData);
  };

  const SessionCard = ({ session }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              {session.title}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Person fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                with {session.mentee}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Schedule fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {session.date} at {session.time}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <AccessTime fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                Duration: {session.duration}
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Chip 
                label={session.type} 
                color="primary" 
                size="small" 
              />
              <Chip 
                label={session.status} 
                color={session.status === 'confirmed' ? 'success' : 'warning'} 
                size="small" 
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<VideoCall />}
            size="small"
          >
            Join
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  const DayCard = ({ day }) => (
    <Card 
      sx={{ 
        height: 120,
        bgcolor: day.available ? 'background.paper' : 'grey.100',
        cursor: day.available ? 'pointer' : 'default',
        '&:hover': day.available ? { bgcolor: 'primary.light', color: 'white' } : {}
      }}
    >
      <CardContent sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="h6">{day.day}</Typography>
        <Typography variant="h4" sx={{ my: 1 }}>{day.date}</Typography>
        <Typography variant="body2">
          {day.sessions} session{day.sessions !== 1 ? 's' : ''}
        </Typography>
        {!day.available && (
          <Chip label="Unavailable" size="small" sx={{ mt: 1 }} />
        )}
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" gutterBottom>
            My Schedule
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your mentoring sessions and availability
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setScheduleDialogOpen(true)}
        >
          Schedule Session
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Weekly Calendar View */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            This Week
          </Typography>
          <Grid container spacing={2}>
            {weeklySchedule.map((day, index) => (
              <Grid item xs={12/7} key={index}>
                <DayCard day={day} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Upcoming Sessions */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Upcoming Sessions
          </Typography>
          {upcomingSessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </Grid>

        {/* Smart Scheduling */}
        <Grid item xs={12} md={4}>
          <SmartScheduling />
        </Grid>

        {/* Availability Settings */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Availability Settings
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Monday - Friday"
                    secondary="9:00 AM - 6:00 PM"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Weekend"
                    secondary="Unavailable"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Buffer Time"
                    secondary="15 minutes between sessions"
                  />
                </ListItem>
              </List>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                Update Availability
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setScheduleDialogOpen(true)}
      >
        <Add />
      </Fab>

      <ScheduleMeetingDialog
        open={scheduleDialogOpen}
        onClose={() => setScheduleDialogOpen(false)}
        onSchedule={handleScheduleMeeting}
      />
    </Container>
  );
};

export default SchedulePage;
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Chip,
  Box,
  Divider
} from '@mui/material';
import { Business, VideoCall, Event, Chat, Person } from '@mui/icons-material';

export const MentorshipsDialog = ({ open, onClose }) => {
  const mentorships = [
    {
      id: 1,
      mentorName: 'John Doe',
      company: 'Google',
      field: 'Software Engineering',
      startDate: '2024-01-15',
      status: 'Active',
      sessions: 5
    },
    {
      id: 2,
      mentorName: 'Sarah Wilson',
      company: 'Microsoft',
      field: 'Product Management',
      startDate: '2024-02-01',
      status: 'Active',
      sessions: 3
    }
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          <Business color="primary" />
          Active Mentorships
        </Box>
      </DialogTitle>
      <DialogContent>
        <List>
          {mentorships.map((mentorship, index) => (
            <React.Fragment key={mentorship.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={mentorship.mentorName}
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {mentorship.company} • {mentorship.field}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Started: {new Date(mentorship.startDate).toLocaleDateString()}
                      </Typography>
                      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                        <Chip label={mentorship.status} color="success" size="small" />
                        <Chip label={`${mentorship.sessions} sessions`} size="small" />
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
              {index < mentorships.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export const SessionsDialog = ({ open, onClose }) => {
  const sessions = [
    {
      id: 1,
      title: 'Career Planning Discussion',
      mentor: 'John Doe',
      date: '2024-01-20',
      duration: '45 min',
      rating: 5
    },
    {
      id: 2,
      title: 'Technical Interview Prep',
      mentor: 'Sarah Wilson',
      date: '2024-01-18',
      duration: '60 min',
      rating: 4
    },
    {
      id: 3,
      title: 'Resume Review',
      mentor: 'John Doe',
      date: '2024-01-15',
      duration: '30 min',
      rating: 5
    }
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          <VideoCall color="success" />
          Completed Sessions
        </Box>
      </DialogTitle>
      <DialogContent>
        <List>
          {sessions.map((session, index) => (
            <React.Fragment key={session.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <VideoCall />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={session.title}
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        with {session.mentor}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(session.date).toLocaleDateString()} • {session.duration}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Chip 
                          label={`${session.rating}/5 stars`} 
                          color="success" 
                          size="small" 
                        />
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
              {index < sessions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export const MeetingsDialog = ({ open, onClose }) => {
  const meetings = [
    {
      id: 1,
      title: 'Mock Interview Session',
      mentor: 'John Doe',
      date: '2024-01-28',
      time: '2:00 PM',
      type: 'Video Call'
    },
    {
      id: 2,
      title: 'Project Review',
      mentor: 'Sarah Wilson',
      date: '2024-01-30',
      time: '10:00 AM',
      type: 'Video Call'
    },
    {
      id: 3,
      title: 'Career Guidance',
      mentor: 'Mike Johnson',
      date: '2024-02-02',
      time: '3:30 PM',
      type: 'Video Call'
    }
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          <Event color="error" />
          Upcoming Meetings
        </Box>
      </DialogTitle>
      <DialogContent>
        <List>
          {meetings.map((meeting, index) => (
            <React.Fragment key={meeting.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'error.main' }}>
                    <Event />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={meeting.title}
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        with {meeting.mentor}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Chip label={meeting.type} color="primary" size="small" />
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
              {index < meetings.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export const MessagesDialog = ({ open, onClose }) => {
  const messages = [
    {
      id: 1,
      sender: 'John Doe',
      preview: 'Great job on the mock interview! Here are some feedback points...',
      timestamp: '2024-01-27 10:30 AM',
      unread: true
    },
    {
      id: 2,
      sender: 'Sarah Wilson',
      preview: 'I reviewed your resume. Let\'s schedule a call to discuss...',
      timestamp: '2024-01-27 9:15 AM',
      unread: true
    },
    {
      id: 3,
      sender: 'Mike Johnson',
      preview: 'Thanks for sharing your project. I have some suggestions...',
      timestamp: '2024-01-26 4:45 PM',
      unread: true
    },
    {
      id: 4,
      sender: 'Emily Chen',
      preview: 'Looking forward to our session tomorrow!',
      timestamp: '2024-01-26 2:20 PM',
      unread: true
    },
    {
      id: 5,
      sender: 'David Brown',
      preview: 'Here are the resources I mentioned during our call...',
      timestamp: '2024-01-25 11:00 AM',
      unread: true
    }
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          <Chat sx={{ color: '#7c3aed' }} />
          Unread Messages
        </Box>
      </DialogTitle>
      <DialogContent>
        <List>
          {messages.map((message, index) => (
            <React.Fragment key={message.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    {message.sender.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle2">
                        {message.sender}
                      </Typography>
                      {message.unread && (
                        <Chip label="New" color="primary" size="small" />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {message.preview}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {message.timestamp}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < messages.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
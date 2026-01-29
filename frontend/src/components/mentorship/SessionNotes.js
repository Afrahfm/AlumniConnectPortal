import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton
} from '@mui/material';
import { 
  Notes, 
  AutoAwesome, 
  Save, 
  Add,
  Edit,
  Visibility
} from '@mui/icons-material';

const SessionNotes = () => {
  const [notesOpen, setNotesOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const sessionNotes = [
    {
      id: 1,
      date: '2024-01-20',
      mentor: 'Sarah Chen',
      duration: '45 min',
      summary: 'Discussed career transition from frontend to full-stack development',
      keyTakeaways: [
        'Focus on backend technologies like Node.js and databases',
        'Build 2-3 full-stack projects for portfolio',
        'Consider system design fundamentals'
      ],
      actionItems: [
        'Complete Node.js course by end of month',
        'Start building a full-stack e-commerce project',
        'Schedule follow-up in 2 weeks'
      ],
      aiInsights: 'Strong progress on frontend skills. Ready to expand to backend development.',
      rating: 5
    },
    {
      id: 2,
      date: '2024-02-05',
      mentor: 'Sarah Chen',
      duration: '50 min',
      summary: 'Review of Node.js progress and project planning',
      keyTakeaways: [
        'Good understanding of Express.js fundamentals',
        'Need to focus more on database design',
        'API development skills improving'
      ],
      actionItems: [
        'Complete database design course',
        'Add authentication to current project',
        'Practice API testing with Postman'
      ],
      aiInsights: 'Consistent improvement. Database knowledge gap identified.',
      rating: 4
    }
  ];

  const handleViewNotes = (session) => {
    setSelectedSession(session);
    setNotesOpen(true);
    setEditMode(false);
  };

  const handleEditNotes = (session) => {
    setSelectedSession(session);
    setNotesOpen(true);
    setEditMode(true);
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Notes color="primary" />
            <Typography variant="h6">Session Notes</Typography>
            <Chip 
              label="Auto-Saved" 
              color="success" 
              size="small" 
              icon={<AutoAwesome />}
            />
          </Box>

          <Typography variant="body2" color="text.secondary" mb={3}>
            All your mentoring sessions are automatically summarized with key takeaways
          </Typography>

          <List>
            {sessionNotes.map((session, index) => (
              <Box key={session.id}>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1">
                          Session with {session.mentor}
                        </Typography>
                        <Box display="flex" gap={1}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleViewNotes(session)}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleEditNotes(session)}
                          >
                            <Edit />
                          </IconButton>
                        </Box>
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {session.date} • {session.duration}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {session.summary}
                        </Typography>
                        <Box display="flex" gap={0.5} mt={1}>
                          {Array.from({ length: session.rating }, (_, i) => (
                            <Typography key={i} color="primary">⭐</Typography>
                          ))}
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < sessionNotes.length - 1 && <Divider />}
              </Box>
            ))}
          </List>

          <Button
            variant="outlined"
            startIcon={<Add />}
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Manual Notes
          </Button>
        </CardContent>
      </Card>

      <Dialog open={notesOpen} onClose={() => setNotesOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Session Notes - {selectedSession?.mentor} ({selectedSession?.date})
        </DialogTitle>
        <DialogContent>
          {selectedSession && (
            <Box>
              <Box mb={3}>
                <Typography variant="h6" gutterBottom>Session Summary</Typography>
                {editMode ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    defaultValue={selectedSession.summary}
                  />
                ) : (
                  <Typography variant="body1">{selectedSession.summary}</Typography>
                )}
              </Box>

              <Box mb={3}>
                <Typography variant="h6" gutterBottom>Key Takeaways</Typography>
                {editMode ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    defaultValue={selectedSession.keyTakeaways.join('\n')}
                    placeholder="Enter each takeaway on a new line"
                  />
                ) : (
                  <List dense>
                    {selectedSession.keyTakeaways.map((takeaway, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemText primary={`• ${takeaway}`} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>

              <Box mb={3}>
                <Typography variant="h6" gutterBottom>Action Items</Typography>
                {editMode ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    defaultValue={selectedSession.actionItems.join('\n')}
                    placeholder="Enter each action item on a new line"
                  />
                ) : (
                  <List dense>
                    {selectedSession.actionItems.map((item, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemText primary={`□ ${item}`} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>

              <Box mb={3}>
                <Typography variant="h6" gutterBottom>AI Insights</Typography>
                <Card sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <AutoAwesome />
                      <Typography variant="subtitle2">AI Analysis</Typography>
                    </Box>
                    <Typography variant="body2">
                      {selectedSession.aiInsights}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNotesOpen(false)}>Close</Button>
          {editMode && (
            <Button variant="contained" startIcon={<Save />}>
              Save Changes
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SessionNotes;
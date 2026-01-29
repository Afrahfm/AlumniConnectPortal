import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  TextField,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  AutoAwesome,
  Assignment,
  CheckCircle,
  Schedule,
  Person,
  Add,
  Edit,
  ExpandMore,
  Download,
  Share
} from '@mui/icons-material';

const SessionSummary = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newActionItem, setNewActionItem] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = () => {
    // Simulate API call
    setSessions([
      {
        id: 1,
        mentee: 'Sarah Chen',
        date: '2024-01-15',
        duration: '60 minutes',
        topics: ['Career Planning', 'Technical Skills', 'Interview Prep'],
        aiSummary: 'Productive session focused on career advancement. Sarah showed strong technical understanding but needs confidence building for interviews.',
        actionItems: [
          { id: 1, task: 'Practice mock interviews', assignee: 'Sarah', deadline: '2024-01-22', status: 'pending' },
          { id: 2, task: 'Review system design concepts', assignee: 'Sarah', deadline: '2024-01-20', status: 'completed' },
          { id: 3, task: 'Send LinkedIn optimization tips', assignee: 'Mentor', deadline: '2024-01-16', status: 'completed' }
        ],
        keyInsights: [
          'Strong problem-solving skills demonstrated',
          'Needs more confidence in technical interviews',
          'Ready for senior-level positions'
        ],
        nextSteps: 'Focus on interview preparation and portfolio enhancement'
      },
      {
        id: 2,
        mentee: 'Mike Johnson',
        date: '2024-01-12',
        duration: '45 minutes',
        topics: ['Leadership', 'Team Management', 'Project Planning'],
        aiSummary: 'Discussion centered on leadership challenges. Mike is transitioning well into management role but needs guidance on team dynamics.',
        actionItems: [
          { id: 4, task: 'Read "The Manager\'s Path" book', assignee: 'Mike', deadline: '2024-01-26', status: 'pending' },
          { id: 5, task: 'Schedule 1:1s with team members', assignee: 'Mike', deadline: '2024-01-19', status: 'pending' },
          { id: 6, task: 'Share team building resources', assignee: 'Mentor', deadline: '2024-01-13', status: 'completed' }
        ],
        keyInsights: [
          'Natural leadership qualities emerging',
          'Needs structured approach to team management',
          'Good strategic thinking abilities'
        ],
        nextSteps: 'Develop systematic approach to team leadership and communication'
      }
    ]);
  };

  const generateAISummary = async (sessionId) => {
    setLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      const updatedSessions = sessions.map(session => {
        if (session.id === sessionId) {
          return {
            ...session,
            aiSummary: 'AI has analyzed the session and generated new insights based on conversation patterns and outcomes.',
            keyInsights: [
              'Updated insight based on latest AI analysis',
              'New pattern detected in mentee progress',
              'Recommendation updated based on industry trends'
            ]
          };
        }
        return session;
      });
      setSessions(updatedSessions);
      setLoading(false);
    }, 2000);
  };

  const addActionItem = () => {
    if (newActionItem.trim() && selectedSession) {
      const newItem = {
        id: Date.now(),
        task: newActionItem,
        assignee: 'Mentee',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'pending'
      };
      
      const updatedSessions = sessions.map(session => {
        if (session.id === selectedSession.id) {
          return {
            ...session,
            actionItems: [...session.actionItems, newItem]
          };
        }
        return session;
      });
      
      setSessions(updatedSessions);
      setNewActionItem('');
      setOpenDialog(false);
    }
  };

  const toggleActionStatus = (sessionId, actionId) => {
    const updatedSessions = sessions.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          actionItems: session.actionItems.map(item => {
            if (item.id === actionId) {
              return {
                ...item,
                status: item.status === 'completed' ? 'pending' : 'completed'
              };
            }
            return item;
          })
        };
      }
      return session;
    });
    setSessions(updatedSessions);
  };

  const SessionCard = ({ session }) => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center">
            <Person sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">{session.mentee}</Typography>
          </Box>
          <Box display="flex" gap={1}>
            <Button
              size="small"
              startIcon={<AutoAwesome />}
              onClick={() => generateAISummary(session.id)}
              disabled={loading}
            >
              Regenerate AI Summary
            </Button>
            <IconButton size="small">
              <Download />
            </IconButton>
            <IconButton size="small">
              <Share />
            </IconButton>
          </Box>
        </Box>

        <Box display="flex" gap={2} mb={2}>
          <Chip icon={<Schedule />} label={session.date} size="small" />
          <Chip label={session.duration} size="small" />
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle2" gutterBottom>Topics Discussed</Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {session.topics.map((topic, index) => (
              <Chip key={index} label={topic} variant="outlined" size="small" />
            ))}
          </Box>
        </Box>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box display="flex" alignItems="center">
              <AutoAwesome sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle1">AI-Generated Summary</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Alert severity="info" sx={{ mb: 2 }}>
              This summary was automatically generated using AI analysis
            </Alert>
            <Typography variant="body2" paragraph>
              {session.aiSummary}
            </Typography>
            
            <Typography variant="subtitle2" gutterBottom>Key Insights</Typography>
            <List dense>
              {session.keyInsights.map((insight, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircle color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={insight} />
                </ListItem>
              ))}
            </List>

            <Typography variant="subtitle2" gutterBottom>Next Steps</Typography>
            <Typography variant="body2" color="primary.main">
              {session.nextSteps}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle1">Action Items</Typography>
          <Button
            size="small"
            startIcon={<Add />}
            onClick={() => {
              setSelectedSession(session);
              setOpenDialog(true);
            }}
          >
            Add Action Item
          </Button>
        </Box>

        <List>
          {session.actionItems.map((item) => (
            <ListItem key={item.id} sx={{ pl: 0 }}>
              <ListItemIcon>
                <IconButton
                  size="small"
                  onClick={() => toggleActionStatus(session.id, item.id)}
                >
                  <CheckCircle
                    color={item.status === 'completed' ? 'success' : 'disabled'}
                  />
                </IconButton>
              </ListItemIcon>
              <ListItemText
                primary={item.task}
                secondary={`Assigned to: ${item.assignee} | Due: ${item.deadline}`}
                sx={{
                  textDecoration: item.status === 'completed' ? 'line-through' : 'none',
                  opacity: item.status === 'completed' ? 0.7 : 1
                }}
              />
              <Chip
                label={item.status}
                color={item.status === 'completed' ? 'success' : 'warning'}
                size="small"
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Assignment sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Session Summary & Action Items
          </Typography>
          <Typography variant="body1" color="text.secondary">
            AI-powered session summaries and automated action item tracking
          </Typography>
        </Box>
      </Box>

      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Action Item</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Action Item Description"
            value={newActionItem}
            onChange={(e) => setNewActionItem(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={addActionItem} variant="contained">
            Add Action Item
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SessionSummary;
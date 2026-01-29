import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  AutoAwesome,
  CheckCircle,
  Assignment,
  Schedule
} from '@mui/icons-material';

const SessionSummaryDialog = ({ open, onClose, sessionData }) => {
  const [generating, setGenerating] = useState(false);
  const [summary] = useState({
    duration: '45 minutes',
    topics: ['Career Planning', 'Technical Skills', 'Interview Preparation'],
    keyPoints: [
      'Discussed current project challenges and solutions',
      'Reviewed resume and provided feedback',
      'Identified areas for skill development'
    ],
    actionItems: [
      { task: 'Complete React certification course', deadline: '2024-02-15', priority: 'High' },
      { task: 'Update LinkedIn profile with new skills', deadline: '2024-02-10', priority: 'Medium' },
      { task: 'Practice coding interview questions', deadline: '2024-02-20', priority: 'High' }
    ],
    nextSession: '2024-02-05 at 2:00 PM'
  });

  const generateSummary = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          <AutoAwesome color="primary" />
          AI Session Summary
        </Box>
      </DialogTitle>
      <DialogContent>
        {generating ? (
          <Box display="flex" flexDirection="column" alignItems="center" py={4}>
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 2 }}>
              AI is analyzing your session...
            </Typography>
          </Box>
        ) : (
          <Box>
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Session Overview
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Duration: {summary.duration}
              </Typography>
              <Box display="flex" gap={1} mt={1}>
                {summary.topics.map((topic, index) => (
                  <Chip key={index} label={topic} size="small" />
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Key Discussion Points
              </Typography>
              <List dense>
                {summary.keyPoints.map((point, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={point} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Action Items
              </Typography>
              <List dense>
                {summary.actionItems.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Assignment color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.task}
                      secondary={
                        <Box display="flex" gap={1} alignItems="center">
                          <Schedule fontSize="small" />
                          <Typography variant="caption">
                            Due: {item.deadline}
                          </Typography>
                          <Chip 
                            label={item.priority} 
                            size="small" 
                            color={item.priority === 'High' ? 'error' : 'warning'}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="primary">
                Next Session: {summary.nextSession}
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={generateSummary} variant="contained" startIcon={<AutoAwesome />}>
          Regenerate Summary
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionSummaryDialog;
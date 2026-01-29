import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Grid
} from '@mui/material';
import {
  Schedule,
  AutoAwesome,
  AccessTime,
  CalendarToday,
  Lightbulb
} from '@mui/icons-material';
import ScheduleOptimizationDialog from './ScheduleOptimizationDialog';

const SmartScheduling = () => {
  const [optimizationDialogOpen, setOptimizationDialogOpen] = useState(false);
  const [suggestions] = useState({
    optimalTimes: [
      { day: 'Tuesday', time: '2:00 PM', reason: 'Both participants most active' },
      { day: 'Thursday', time: '10:00 AM', reason: 'Peak productivity hours' },
      { day: 'Friday', time: '3:00 PM', reason: 'End-of-week reflection time' }
    ],
    conflicts: [
      { meeting: 'Team Standup', time: 'Monday 9:00 AM', suggestion: 'Reschedule to 10:00 AM' }
    ],
    recommendations: [
      'Schedule technical sessions in the morning for better focus',
      'Career discussions work best in afternoon slots',
      'Avoid Friday evenings - low engagement rates'
    ],
    aiScore: 88
  });

  const [optimizing, setOptimizing] = useState(false);

  const handleOptimize = () => {
    setOptimizationDialogOpen(true);
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Schedule color="primary" />
          <Typography variant="h6">Smart Scheduling</Typography>
          <Chip label={`AI Optimization: ${suggestions.aiScore}%`} color="primary" size="small" />
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          AI has analyzed your scheduling patterns and participant availability
        </Alert>

        <Box mb={3}>
          <Typography variant="subtitle2" gutterBottom>
            Optimal Meeting Times
          </Typography>
          <List dense>
            {suggestions.optimalTimes.map((time, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemIcon>
                  <AccessTime color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={`${time.day} at ${time.time}`}
                  secondary={time.reason}
                />
                <Button size="small" variant="outlined">
                  Schedule
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box mb={3}>
          <Typography variant="subtitle2" gutterBottom>
            AI Recommendations
          </Typography>
          <List dense>
            {suggestions.recommendations.map((rec, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemIcon>
                  <Lightbulb color="warning" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={rec}
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {suggestions.conflicts.length > 0 && (
          <Box mb={3}>
            <Typography variant="subtitle2" gutterBottom color="error">
              Scheduling Conflicts
            </Typography>
            <List dense>
              {suggestions.conflicts.map((conflict, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CalendarToday color="error" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={conflict.meeting}
                    secondary={conflict.suggestion}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        <Button
          variant="contained"
          startIcon={<AutoAwesome />}
          onClick={handleOptimize}
          disabled={optimizing}
          fullWidth
        >
          {optimizing ? 'Optimizing...' : 'Optimize My Schedule'}
        </Button>
      </CardContent>

      <ScheduleOptimizationDialog
        open={optimizationDialogOpen}
        onClose={() => setOptimizationDialogOpen(false)}
      />
    </Card>
  );
};

export default SmartScheduling;
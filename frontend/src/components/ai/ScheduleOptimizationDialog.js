import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
  CircularProgress,
  Switch,
  FormControlLabel,
  Divider
} from '@mui/material';
import {
  AutoAwesome,
  Schedule,
  CheckCircle,
  Warning,
  AccessTime,
  CalendarToday,
  TrendingUp
} from '@mui/icons-material';

const ScheduleOptimizationDialog = ({ open, onClose }) => {
  const [optimizing, setOptimizing] = useState(false);
  const [optimized, setOptimized] = useState(false);
  const [preferences, setPreferences] = useState({
    morningPreferred: true,
    weekendsAvailable: false,
    bufferTime: true,
    autoReschedule: false
  });

  const [optimizationResults] = useState({
    currentEfficiency: 72,
    optimizedEfficiency: 89,
    timesSaved: 4.5,
    conflictsResolved: 3,
    suggestions: [
      {
        type: 'reschedule',
        title: 'Move "Technical Review" to Tuesday 10:00 AM',
        reason: 'Better focus time for both participants',
        impact: 'High',
        timeSaved: '30 min'
      },
      {
        type: 'consolidate',
        title: 'Group career sessions on Thursdays',
        reason: 'Reduces context switching',
        impact: 'Medium',
        timeSaved: '45 min'
      },
      {
        type: 'buffer',
        title: 'Add 15-min buffer between sessions',
        reason: 'Prevents back-to-back fatigue',
        impact: 'High',
        timeSaved: '0 min'
      }
    ],
    weeklySchedule: [
      { day: 'Monday', sessions: 2, optimal: true, conflicts: 0 },
      { day: 'Tuesday', sessions: 3, optimal: true, conflicts: 0 },
      { day: 'Wednesday', sessions: 1, optimal: false, conflicts: 1 },
      { day: 'Thursday', sessions: 2, optimal: true, conflicts: 0 },
      { day: 'Friday', sessions: 1, optimal: true, conflicts: 0 }
    ]
  });

  const handleOptimize = () => {
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      setOptimized(true);
    }, 3000);
  };

  const handleApplyOptimization = () => {
    // Apply optimization logic here
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          <AutoAwesome color="primary" />
          AI Schedule Optimization
        </Box>
      </DialogTitle>
      <DialogContent>
        {optimizing ? (
          <Box display="flex" flexDirection="column" alignItems="center" py={4}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Analyzing Your Schedule...
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              AI is finding the best optimization opportunities
            </Typography>
          </Box>
        ) : (
          <Box>
            {!optimized ? (
              <Box>
                <Alert severity="info" sx={{ mb: 3 }}>
                  Configure your preferences to get personalized schedule optimization
                </Alert>

                <Typography variant="h6" gutterBottom>
                  Optimization Preferences
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={preferences.morningPreferred}
                          onChange={(e) => setPreferences({
                            ...preferences,
                            morningPreferred: e.target.checked
                          })}
                        />
                      }
                      label="Prefer morning sessions"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={preferences.weekendsAvailable}
                          onChange={(e) => setPreferences({
                            ...preferences,
                            weekendsAvailable: e.target.checked
                          })}
                        />
                      }
                      label="Available on weekends"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={preferences.bufferTime}
                          onChange={(e) => setPreferences({
                            ...preferences,
                            bufferTime: e.target.checked
                          })}
                        />
                      }
                      label="Add buffer time between sessions"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={preferences.autoReschedule}
                          onChange={(e) => setPreferences({
                            ...preferences,
                            autoReschedule: e.target.checked
                          })}
                        />
                      }
                      label="Allow automatic rescheduling"
                    />
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Box>
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={4}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="success.main">
                          {optimizationResults.optimizedEfficiency}%
                        </Typography>
                        <Typography variant="caption">
                          Optimized Efficiency
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="primary.main">
                          {optimizationResults.timesSaved}h
                        </Typography>
                        <Typography variant="caption">
                          Time Saved Weekly
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="warning.main">
                          {optimizationResults.conflictsResolved}
                        </Typography>
                        <Typography variant="caption">
                          Conflicts Resolved
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Typography variant="h6" gutterBottom>
                  Optimization Suggestions
                </Typography>
                <List>
                  {optimizationResults.suggestions.map((suggestion, index) => (
                    <ListItem key={index} sx={{ mb: 1, bgcolor: 'background.paper', borderRadius: 2 }}>
                      <ListItemIcon>
                        {suggestion.type === 'reschedule' && <Schedule color="primary" />}
                        {suggestion.type === 'consolidate' && <CalendarToday color="success" />}
                        {suggestion.type === 'buffer' && <AccessTime color="warning" />}
                      </ListItemIcon>
                      <ListItemText
                        primary={suggestion.title}
                        secondary={suggestion.reason}
                      />
                      <Box display="flex" gap={1}>
                        <Chip
                          label={`${suggestion.impact} Impact`}
                          color={suggestion.impact === 'High' ? 'error' : 'warning'}
                          size="small"
                        />
                        <Chip
                          label={`Saves ${suggestion.timeSaved}`}
                          color="success"
                          size="small"
                        />
                      </Box>
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Weekly Schedule Overview
                </Typography>
                <Grid container spacing={2}>
                  {optimizationResults.weeklySchedule.map((day, index) => (
                    <Grid item xs={12} sm={6} md={2.4} key={index}>
                      <Card sx={{ bgcolor: day.optimal ? 'success.light' : 'warning.light' }}>
                        <CardContent sx={{ textAlign: 'center', py: 2 }}>
                          <Typography variant="subtitle2">{day.day}</Typography>
                          <Typography variant="h6">{day.sessions}</Typography>
                          <Typography variant="caption">sessions</Typography>
                          {day.conflicts > 0 && (
                            <Chip
                              label={`${day.conflicts} conflict`}
                              color="error"
                              size="small"
                              sx={{ mt: 1 }}
                            />
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {!optimized ? (
          <Button
            onClick={handleOptimize}
            variant="contained"
            startIcon={<AutoAwesome />}
            disabled={optimizing}
          >
            {optimizing ? 'Optimizing...' : 'Optimize Schedule'}
          </Button>
        ) : (
          <Button
            onClick={handleApplyOptimization}
            variant="contained"
            startIcon={<CheckCircle />}
            color="success"
          >
            Apply Optimization
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleOptimizationDialog;
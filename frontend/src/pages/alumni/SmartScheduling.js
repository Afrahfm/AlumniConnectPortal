import React, { useState, useEffect } from 'react';
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
  ListItemIcon,
  Alert,
  Calendar,
  Switch,
  FormControlLabel,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Avatar
} from '@mui/material';
import {
  Schedule,
  AutoAwesome,
  TrendingUp,
  AccessTime,
  CalendarToday,
  Psychology,
  Notifications,
  Settings
} from '@mui/icons-material';

const SmartScheduling = () => {
  const [preferences, setPreferences] = useState({
    autoScheduling: true,
    bufferTime: 15,
    maxSessionsPerDay: 3,
    preferredDuration: 60,
    timezone: 'EST'
  });
  
  const [aiRecommendations, setAiRecommendations] = useState({});
  const [optimizedSlots, setOptimizedSlots] = useState([]);

  useEffect(() => {
    fetchAIRecommendations();
  }, []);

  const fetchAIRecommendations = () => {
    // Simulate AI analysis
    setAiRecommendations({
      optimalTimes: [
        { day: 'Tuesday', time: '2:00 PM - 4:00 PM', efficiency: 94 },
        { day: 'Thursday', time: '10:00 AM - 12:00 PM', efficiency: 91 },
        { day: 'Wednesday', time: '3:00 PM - 5:00 PM', efficiency: 88 }
      ],
      menteePreferences: {
        'Sarah Chen': { preferredTimes: ['Evening'], timezone: 'PST', availability: 85 },
        'Mike Johnson': { preferredTimes: ['Morning', 'Afternoon'], timezone: 'EST', availability: 92 }
      },
      conflictPrediction: {
        riskLevel: 'Low',
        upcomingConflicts: 2,
        suggestions: [
          'Consider rescheduling Thursday 3 PM session due to predicted high workload',
          'Optimal window for Sarah Chen: Tuesday 6-8 PM PST'
        ]
      }
    });

    setOptimizedSlots([
      {
        id: 1,
        mentee: 'Sarah Chen',
        originalTime: 'Monday 3:00 PM',
        optimizedTime: 'Tuesday 6:00 PM',
        reason: 'Better alignment with mentee timezone and energy levels',
        improvement: '+23% engagement predicted'
      },
      {
        id: 2,
        mentee: 'Mike Johnson',
        originalTime: 'Friday 4:00 PM',
        optimizedTime: 'Thursday 10:00 AM',
        reason: 'Avoids end-of-week fatigue, matches peak productivity hours',
        improvement: '+18% effectiveness predicted'
      }
    ]);
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyOptimization = (slotId) => {
    setOptimizedSlots(prev => 
      prev.map(slot => 
        slot.id === slotId 
          ? { ...slot, applied: true }
          : slot
      )
    );
  };

  const OptimalTimeCard = ({ timeSlot }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" color="primary.main">
              {timeSlot.day}
            </Typography>
            <Typography variant="body1">
              {timeSlot.time}
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {timeSlot.efficiency}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Efficiency Score
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const OptimizationSuggestion = ({ slot }) => (
    <Card sx={{ mb: 2, border: slot.applied ? '2px solid #4caf50' : '1px solid #e0e0e0' }}>
      <CardContent>
        <Box display="flex" justifyContent="between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              {slot.mentee.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <Box>
              <Typography variant="h6">{slot.mentee}</Typography>
              <Chip 
                label={slot.applied ? 'Applied' : 'Suggested'} 
                color={slot.applied ? 'success' : 'primary'} 
                size="small" 
              />
            </Box>
          </Box>
        </Box>
        
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">Current</Typography>
            <Typography variant="body1">{slot.originalTime}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="success.main">Optimized</Typography>
            <Typography variant="body1" color="success.main">{slot.optimizedTime}</Typography>
          </Grid>
        </Grid>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">{slot.reason}</Typography>
        </Alert>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="success.main" fontWeight="bold">
            {slot.improvement}
          </Typography>
          {!slot.applied && (
            <Button 
              variant="contained" 
              size="small"
              onClick={() => applyOptimization(slot.id)}
            >
              Apply Optimization
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Schedule sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Smart Scheduling Optimization
          </Typography>
          <Typography variant="body1" color="text.secondary">
            AI-powered scheduling for maximum mentorship effectiveness
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Preferences Panel */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Settings sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Scheduling Preferences</Typography>
              </Box>

              <Box mb={3}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.autoScheduling}
                      onChange={(e) => handlePreferenceChange('autoScheduling', e.target.checked)}
                    />
                  }
                  label="Enable Auto-Scheduling"
                />
              </Box>

              <Box mb={3}>
                <Typography gutterBottom>Buffer Time (minutes)</Typography>
                <Slider
                  value={preferences.bufferTime}
                  onChange={(e, value) => handlePreferenceChange('bufferTime', value)}
                  min={5}
                  max={30}
                  step={5}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box mb={3}>
                <Typography gutterBottom>Max Sessions Per Day</Typography>
                <Slider
                  value={preferences.maxSessionsPerDay}
                  onChange={(e, value) => handlePreferenceChange('maxSessionsPerDay', value)}
                  min={1}
                  max={5}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box mb={3}>
                <FormControl fullWidth>
                  <InputLabel>Preferred Session Duration</InputLabel>
                  <Select
                    value={preferences.preferredDuration}
                    onChange={(e) => handlePreferenceChange('preferredDuration', e.target.value)}
                  >
                    <MenuItem value={30}>30 minutes</MenuItem>
                    <MenuItem value={45}>45 minutes</MenuItem>
                    <MenuItem value={60}>60 minutes</MenuItem>
                    <MenuItem value={90}>90 minutes</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button variant="contained" fullWidth startIcon={<AutoAwesome />}>
                Apply AI Optimization
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* AI Recommendations */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Psychology sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">AI-Recommended Optimal Times</Typography>
              </Box>
              
              <Alert severity="success" sx={{ mb: 2 }}>
                Based on your historical data and mentee engagement patterns
              </Alert>

              {aiRecommendations.optimalTimes?.map((timeSlot, index) => (
                <OptimalTimeCard key={index} timeSlot={timeSlot} />
              ))}
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Scheduling Optimizations</Typography>
              </Box>

              {optimizedSlots.map((slot) => (
                <OptimizationSuggestion key={slot.id} slot={slot} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Notifications sx={{ mr: 1, color: 'warning.main' }} />
                <Typography variant="h6">Conflict Predictions</Typography>
              </Box>

              <Alert severity={aiRecommendations.conflictPrediction?.riskLevel === 'Low' ? 'success' : 'warning'} sx={{ mb: 2 }}>
                Risk Level: {aiRecommendations.conflictPrediction?.riskLevel} | 
                Upcoming Conflicts: {aiRecommendations.conflictPrediction?.upcomingConflicts}
              </Alert>

              <List>
                {aiRecommendations.conflictPrediction?.suggestions?.map((suggestion, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <AutoAwesome color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={suggestion} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SmartScheduling;
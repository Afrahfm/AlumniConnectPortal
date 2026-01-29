import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { VideoCall, Schedule } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { meetingService } from '../../services/apiService';
import { toast } from 'react-toastify';
import moment from 'moment';

const MeetingScheduler = () => {
  const { mentorshipId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scheduledDate: moment().add(1, 'day'),
    duration: 60,
    meetingType: 'VIDEO',
    location: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      scheduledDate: newDate
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const meetingData = {
        ...formData,
        mentorshipId: parseInt(mentorshipId),
        scheduledDate: formData.scheduledDate.toISOString()
      };

      await meetingService.scheduleMeeting(meetingData);
      toast.success('Meeting scheduled successfully!');
      navigate('/mentorship-requests');
    } catch (error) {
      toast.error('Failed to schedule meeting');
      console.error('Schedule meeting error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <Schedule sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h4" component="h1">
              Schedule Meeting
            </Typography>
          </Box>

          <Alert severity="info" sx={{ mb: 3 }}>
            Schedule a meeting with your mentor/mentee. Both parties will receive notifications about the scheduled meeting.
          </Alert>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Meeting Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Career Guidance Session"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  placeholder="Describe the agenda or topics to discuss..."
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <DateTimePicker
                  label="Meeting Date & Time"
                  value={formData.scheduledDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                  minDateTime={moment()}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Duration (minutes)"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  inputProps={{ min: 15, max: 180, step: 15 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Meeting Type</InputLabel>
                  <Select
                    name="meetingType"
                    value={formData.meetingType}
                    onChange={handleInputChange}
                    label="Meeting Type"
                  >
                    <MenuItem value="VIDEO">Video Call</MenuItem>
                    <MenuItem value="AUDIO">Audio Call</MenuItem>
                    <MenuItem value="IN_PERSON">In Person</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {formData.meetingType === 'IN_PERSON' && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="Meeting location or address"
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <Box display="flex" gap={2} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/mentorship-requests')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<VideoCall />}
                    disabled={loading}
                  >
                    {loading ? 'Scheduling...' : 'Schedule Meeting'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>

          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Meeting Guidelines
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              • Please be punctual and join the meeting on time
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              • Test your audio/video before the meeting starts
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              • Prepare an agenda or list of topics to discuss
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              • Both parties will receive email reminders 24 hours and 1 hour before the meeting
            </Typography>
          </Box>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default MeetingScheduler;
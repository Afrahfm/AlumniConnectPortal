import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  Divider,
  Tab,
  Tabs
} from '@mui/material';
import { Check, Close, Message, VideoCall, Star } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { mentorshipService } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MentorshipRequests = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mentorships, setMentorships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMentorship, setSelectedMentorship] = useState(null);
  const [responseDialog, setResponseDialog] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [actionType, setActionType] = useState('');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchMentorships();
  }, []);

  const fetchMentorships = async () => {
    try {
      const data = await mentorshipService.getMyMentorships();
      setMentorships(data);
    } catch (error) {
      toast.error('Failed to fetch mentorships');
      console.error('Fetch mentorships error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (mentorship, action) => {
    setSelectedMentorship(mentorship);
    setActionType(action);
    setResponseDialog(true);
  };

  const handleResponse = async () => {
    try {
      await mentorshipService.updateMentorshipStatus(
        selectedMentorship.id,
        actionType.toUpperCase(),
        responseMessage
      );
      toast.success(`Mentorship ${actionType}ed successfully!`);
      fetchMentorships();
      setResponseDialog(false);
      setResponseMessage('');
    } catch (error) {
      toast.error(`Failed to ${actionType} mentorship`);
      console.error('Update mentorship error:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'ACCEPTED': return 'success';
      case 'REJECTED': return 'error';
      case 'ACTIVE': return 'primary';
      case 'COMPLETED': return 'info';
      default: return 'default';
    }
  };

  const filterMentorships = (status) => {
    if (status === 'all') return mentorships;
    return mentorships.filter(m => m.status === status);
  };

  const getFilteredMentorships = () => {
    switch (tabValue) {
      case 0: return filterMentorships('all');
      case 1: return filterMentorships('PENDING');
      case 2: return filterMentorships('ACTIVE');
      case 3: return filterMentorships('COMPLETED');
      default: return mentorships;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Mentorships
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="All" />
          <Tab label="Pending" />
          <Tab label="Active" />
          <Tab label="Completed" />
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        {getFilteredMentorships().map((mentorship) => {
          const otherUser = user.role === 'STUDENT' ? mentorship.mentor : mentorship.mentee;
          
          return (
            <Grid item xs={12} md={6} key={mentorship.id}>
              <Card elevation={2}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ mr: 2 }}>
                      {otherUser.firstName?.[0]}{otherUser.lastName?.[0]}
                    </Avatar>
                    <Box flexGrow={1}>
                      <Typography variant="h6">
                        {otherUser.firstName} {otherUser.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {otherUser.currentCompany} • {otherUser.position}
                      </Typography>
                    </Box>
                    <Chip
                      label={mentorship.status}
                      color={getStatusColor(mentorship.status)}
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" paragraph>
                    <strong>Domain:</strong> {mentorship.domain}
                  </Typography>

                  <Typography variant="body2" paragraph>
                    <strong>Duration:</strong> {mentorship.duration}
                  </Typography>

                  {mentorship.requestMessage && (
                    <Typography variant="body2" paragraph>
                      <strong>Request:</strong> {mentorship.requestMessage}
                    </Typography>
                  )}

                  {mentorship.responseMessage && (
                    <Typography variant="body2" paragraph>
                      <strong>Response:</strong> {mentorship.responseMessage}
                    </Typography>
                  )}

                  <Divider sx={{ my: 2 }} />

                  <Box display="flex" gap={1} flexWrap="wrap">
                    {mentorship.status === 'PENDING' && user.role === 'ALUMNI' && (
                      <>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          startIcon={<Check />}
                          onClick={() => handleAction(mentorship, 'accept')}
                        >
                          Accept
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          startIcon={<Close />}
                          onClick={() => handleAction(mentorship, 'reject')}
                        >
                          Reject
                        </Button>
                      </>
                    )}

                    {mentorship.status === 'ACTIVE' && (
                      <>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Message />}
                          onClick={() => navigate(`/chat/${mentorship.id}`)}
                        >
                          Chat
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<VideoCall />}
                          onClick={() => navigate(`/schedule-meeting/${mentorship.id}`)}
                        >
                          Schedule Meeting
                        </Button>
                      </>
                    )}

                    {mentorship.status === 'COMPLETED' && !mentorship.rating && (
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Star />}
                        onClick={() => {/* Handle rating */}}
                      >
                        Rate Mentorship
                      </Button>
                    )}
                  </Box>

                  {mentorship.rating && (
                    <Box mt={2}>
                      <Typography variant="body2">
                        <strong>Rating:</strong> {mentorship.rating}/5 ⭐
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {getFilteredMentorships().length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No mentorships found
          </Typography>
        </Paper>
      )}

      <Dialog open={responseDialog} onClose={() => setResponseDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {actionType === 'accept' ? 'Accept' : 'Reject'} Mentorship Request
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Response Message"
            value={responseMessage}
            onChange={(e) => setResponseMessage(e.target.value)}
            placeholder={`Write a ${actionType === 'accept' ? 'welcome' : 'polite rejection'} message...`}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResponseDialog(false)}>Cancel</Button>
          <Button
            onClick={handleResponse}
            variant="contained"
            color={actionType === 'accept' ? 'success' : 'error'}
          >
            {actionType === 'accept' ? 'Accept' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MentorshipRequests;
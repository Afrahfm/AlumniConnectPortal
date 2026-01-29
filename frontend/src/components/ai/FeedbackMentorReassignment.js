import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Rating,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Psychology,
  SwapHoriz,
  Star,
  TrendingUp,
  Person,
  Feedback
} from '@mui/icons-material';

const FeedbackMentorReassignment = () => {
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [reassignDialogOpen, setReassignDialogOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const [mentorshipData] = useState({
    currentMentor: {
      name: 'John Doe',
      company: 'Google',
      expertise: ['React.js', 'System Design'],
      rating: 4.2,
      sessions: 8,
      compatibility: 72,
      feedback: [
        { session: 8, rating: 3, comment: 'Good technical knowledge but communication could be better' },
        { session: 7, rating: 4, comment: 'Helpful session on React hooks' },
        { session: 6, rating: 3, comment: 'Sometimes hard to follow explanations' }
      ]
    },
    aiAnalysis: {
      compatibilityScore: 72,
      issues: [
        'Communication style mismatch',
        'Different learning pace preferences',
        'Limited availability alignment'
      ],
      recommendations: [
        'Consider mentor with better communication style match',
        'Look for mentors with more flexible scheduling',
        'Find mentors who specialize in your learning style'
      ]
    },
    suggestedMentors: [
      {
        name: 'Sarah Wilson',
        company: 'Microsoft',
        expertise: ['React.js', 'Frontend Architecture'],
        rating: 4.8,
        sessions: 45,
        compatibility: 94,
        matchReasons: ['Excellent communication', 'Similar learning style', 'Flexible schedule'],
        availability: 'High'
      },
      {
        name: 'Mike Johnson',
        company: 'Amazon',
        expertise: ['System Design', 'Full Stack'],
        rating: 4.7,
        sessions: 38,
        compatibility: 89,
        matchReasons: ['Patient teaching style', 'Good availability', 'Strong technical skills'],
        availability: 'Medium'
      }
    ]
  });

  const handleProvideFeedback = () => {
    setFeedbackDialogOpen(true);
  };

  const handleSubmitFeedback = () => {
    console.log('Feedback submitted:', { rating, feedback });
    setFeedbackDialogOpen(false);
    setFeedback('');
    setRating(0);
  };

  const handleRequestReassignment = (mentor) => {
    setSelectedMentor(mentor);
    setReassignDialogOpen(true);
  };

  const handleConfirmReassignment = () => {
    console.log('Reassignment requested for:', selectedMentor);
    setReassignDialogOpen(false);
    setSelectedMentor(null);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Current Mentor Analysis */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Mentorship Analysis
              </Typography>
              
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar sx={{ width: 56, height: 56 }}>
                  {mentorshipData.currentMentor.name[0]}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">
                    {mentorshipData.currentMentor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {mentorshipData.currentMentor.company}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Rating value={mentorshipData.currentMentor.rating} readOnly size="small" />
                    <Typography variant="caption">
                      ({mentorshipData.currentMentor.sessions} sessions)
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box mb={2}>
                <Typography variant="body2" gutterBottom>
                  Compatibility Score: {mentorshipData.aiAnalysis.compatibilityScore}%
                </Typography>
                <Chip 
                  label={mentorshipData.aiAnalysis.compatibilityScore > 80 ? 'Good Match' : 'Needs Improvement'} 
                  color={mentorshipData.aiAnalysis.compatibilityScore > 80 ? 'success' : 'warning'} 
                  size="small" 
                />
              </Box>

              <Typography variant="subtitle2" gutterBottom>
                Identified Issues:
              </Typography>
              <List dense>
                {mentorshipData.aiAnalysis.issues.map((issue, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemText 
                      primary={issue}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>

              <Box mt={2}>
                <Button
                  variant="outlined"
                  startIcon={<Feedback />}
                  onClick={handleProvideFeedback}
                  sx={{ mr: 1 }}
                >
                  Provide Feedback
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SwapHoriz />}
                  color="warning"
                  onClick={() => setReassignDialogOpen(true)}
                >
                  Request Reassignment
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* AI Recommendations */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                AI-Recommended Mentors
              </Typography>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                Based on your feedback and learning patterns, here are better matches:
              </Alert>

              {mentorshipData.suggestedMentors.map((mentor, index) => (
                <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                  <CardContent sx={{ py: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ width: 40, height: 40 }}>
                          {mentor.name[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">{mentor.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {mentor.company}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip 
                        label={`${mentor.compatibility}% match`} 
                        color="success" 
                        size="small" 
                      />
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Rating value={mentor.rating} readOnly size="small" />
                      <Typography variant="caption">
                        ({mentor.sessions} sessions)
                      </Typography>
                      <Chip 
                        label={mentor.availability} 
                        color={mentor.availability === 'High' ? 'success' : 'warning'} 
                        size="small" 
                      />
                    </Box>

                    <Typography variant="caption" color="text.secondary" gutterBottom>
                      Why this is a better match:
                    </Typography>
                    <Box display="flex" gap={0.5} flexWrap="wrap" mb={2}>
                      {mentor.matchReasons.map((reason, i) => (
                        <Chip key={i} label={reason} size="small" variant="outlined" />
                      ))}
                    </Box>

                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleRequestReassignment(mentor)}
                    >
                      Request This Mentor
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Feedback Dialog */}
      <Dialog open={feedbackDialogOpen} onClose={() => setFeedbackDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Provide Mentor Feedback</DialogTitle>
        <DialogContent>
          <Box mb={3}>
            <Typography variant="body2" gutterBottom>
              Rate your recent session:
            </Typography>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              size="large"
            />
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Additional feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts about the mentoring sessions..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeedbackDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmitFeedback} variant="contained">
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reassignment Dialog */}
      <Dialog open={reassignDialogOpen} onClose={() => setReassignDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Request Mentor Reassignment</DialogTitle>
        <DialogContent>
          {selectedMentor ? (
            <Box>
              <Typography variant="body1" gutterBottom>
                Request reassignment to <strong>{selectedMentor.name}</strong>?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This will notify both mentors and schedule a transition meeting to ensure continuity.
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1">
              Are you sure you want to request a mentor reassignment? Our AI will find the best alternative matches for you.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReassignDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmReassignment} variant="contained" color="warning">
            Confirm Reassignment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FeedbackMentorReassignment;
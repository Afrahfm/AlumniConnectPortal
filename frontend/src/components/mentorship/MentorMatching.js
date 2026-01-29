import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import { Psychology, Star, TrendingUp } from '@mui/icons-material';

const MentorMatching = () => {
  const [matchingOpen, setMatchingOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    careerGoal: '',
    industry: '',
    experience: '',
    availability: ''
  });
  const [suggestedMentors, setSuggestedMentors] = useState([]);
  const [matching, setMatching] = useState(false);

  const handleStartMatching = async () => {
    setMatching(true);
    setTimeout(() => {
      setSuggestedMentors([
        {
          id: 1,
          name: 'Sarah Chen',
          role: 'Senior Software Engineer',
          company: 'Google',
          experience: '8 years',
          matchScore: 95,
          expertise: ['React', 'System Design', 'Career Growth'],
          availability: 'Weekends'
        },
        {
          id: 2,
          name: 'Michael Rodriguez',
          role: 'Product Manager',
          company: 'Microsoft',
          experience: '6 years',
          matchScore: 88,
          expertise: ['Product Strategy', 'Leadership'],
          availability: 'Evenings'
        }
      ]);
      setMatching(false);
    }, 3000);
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Psychology color="primary" />
            <Typography variant="h6">AI Mentor Matching</Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" mb={3}>
            Get matched with the perfect mentor based on your career goals
          </Typography>

          <Button
            variant="contained"
            onClick={() => setMatchingOpen(true)}
            startIcon={<TrendingUp />}
            fullWidth
          >
            Find My Perfect Mentor
          </Button>
        </CardContent>
      </Card>

      <Dialog open={matchingOpen} onClose={() => setMatchingOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Find Your Perfect Mentor</DialogTitle>
        <DialogContent>
          {!suggestedMentors.length ? (
            <Box>
              <Typography variant="h6" gutterBottom>Tell us about your goals</Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Career Goal"
                    value={preferences.careerGoal}
                    onChange={(e) => setPreferences({...preferences, careerGoal: e.target.value})}
                    placeholder="e.g., Become a Senior Developer"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Industry</InputLabel>
                    <Select
                      value={preferences.industry}
                      onChange={(e) => setPreferences({...preferences, industry: e.target.value})}
                    >
                      <MenuItem value="tech">Technology</MenuItem>
                      <MenuItem value="finance">Finance</MenuItem>
                      <MenuItem value="healthcare">Healthcare</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {matching && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" gutterBottom>Finding your perfect mentor...</Typography>
                  <LinearProgress />
                </Box>
              )}
            </Box>
          ) : (
            <Box>
              <Typography variant="h6" gutterBottom>Your AI-Matched Mentors</Typography>
              
              {suggestedMentors.map((mentor) => (
                <Card key={mentor.id} sx={{ mb: 2, border: 1, borderColor: 'primary.light' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Avatar>{mentor.name[0]}</Avatar>
                      <Box flex={1}>
                        <Typography variant="h6">{mentor.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {mentor.role} at {mentor.company}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1} mt={1}>
                          <Star color="primary" fontSize="small" />
                          <Typography variant="body2" color="primary" fontWeight="bold">
                            {mentor.matchScore}% Match
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box display="flex" gap={1} mb={2} flexWrap="wrap">
                      {mentor.expertise.map((skill) => (
                        <Chip key={skill} label={skill} size="small" />
                      ))}
                    </Box>

                    <Button variant="contained" fullWidth>
                      Request as My Mentor
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMatchingOpen(false)}>Cancel</Button>
          {!suggestedMentors.length && (
            <Button onClick={handleStartMatching} variant="contained" disabled={matching}>
              Find Mentors
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MentorMatching;
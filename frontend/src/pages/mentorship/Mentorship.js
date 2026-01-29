import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Alert,
  Paper
} from '@mui/material';
import {
  ArrowBack,
  Person,
  TrendingUp,
  EmojiEvents,
  Schedule,
  VideoCall,
  Psychology,
  AutoFixHigh,
  Timeline
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import AIMentorshipService from '../../services/AIMentorshipService';

const Mentorship = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mentorship, setMentorship] = useState(null);
  const [matchingOpen, setMatchingOpen] = useState(false);
  const [suggestedMentors, setSuggestedMentors] = useState([]);
  const [aiInsights, setAiInsights] = useState(null);
  const [careerRoadmap, setCareerRoadmap] = useState(null);
  const [chatAssistant, setChatAssistant] = useState(null);

  useEffect(() => {
    fetchMentorship();
    fetchSuggestedMentors();
    loadAIInsights();
  }, []);

  const fetchMentorship = () => {
    // Mock active mentorship
    setMentorship({
      id: 1,
      mentor: {
        name: 'John Doe',
        avatar: 'JD',
        company: 'Google',
        role: 'Senior Software Engineer',
        experience: 8
      },
      progress: 65,
      sessionsCompleted: 8,
      nextMeeting: '2026-01-30 10:00 AM',
      goals: ['Career Guidance', 'Technical Skills', 'Interview Prep'],
      achievements: ['First Session', 'Resume Updated', 'Mock Interview'],
      status: 'active'
    });
  };

  const fetchSuggestedMentors = () => {
    const matches = AIMentorshipService.generateMentorMatches(user);
    setSuggestedMentors(matches);
  };

  const loadAIInsights = () => {
    // Load AI-generated insights
    const riskAnalysis = AIMentorshipService.monitorMentorshipContinuity(1);
    const roadmap = AIMentorshipService.generateCareerRoadmap(user);
    const chatHelp = AIMentorshipService.generateChatSuggestions({});
    
    setAiInsights(riskAnalysis);
    setCareerRoadmap(roadmap);
    setChatAssistant(chatHelp);
  };

  const requestMentor = (mentorId) => {
    toast.success('Mentorship request sent! You\'ll hear back within 24 hours.');
    setMatchingOpen(false);
  };

  const startVideoCall = () => {
    navigate('/video-call/1');
  };

  const scheduleMeeting = () => {
    navigate('/schedule-meeting/1');
  };

  if (!mentorship) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" onClick={() => navigate('/student/dashboard')}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
              Find Your Mentor
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Get Your Dedicated Mentor
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            AI will match you with the perfect long-term mentor for your goals
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => setMatchingOpen(true)}
          >
            Find My Mentor
          </Button>
        </Box>

        <Dialog open={matchingOpen} onClose={() => setMatchingOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>AI-Matched Mentors for You</DialogTitle>
          <DialogContent>
            <List>
              {suggestedMentors.map((mentor) => (
                <React.Fragment key={mentor.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{mentor.mentorAvatar}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1">{mentor.name}</Typography>
                          <Chip label={`${mentor.compatibilityScore}% Match`} color="primary" size="small" />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2">{mentor.role} at {mentor.company}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Skills: {mentor.skillMatch * 100}% • Goals: {mentor.goalAlignment * 100}% • Personality: {mentor.personalityFit * 100}%
                          </Typography>
                          <Box sx={{ mt: 0.5 }}>
                            {mentor.matchReasons.slice(0, 2).map((reason) => (
                              <Chip key={reason} label={reason} size="small" sx={{ mr: 0.5 }} />
                            ))}
                          </Box>
                        </Box>
                      }
                    />
                    <Button
                      variant="contained"
                      onClick={() => requestMentor(mentor.mentorId)}
                    >
                      Request Mentor
                    </Button>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setMatchingOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate('/student/dashboard')}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            My Mentorship
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Mentor Info */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ width: 60, height: 60, mr: 2 }}>
                    {mentorship.mentor.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{mentorship.mentor.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {mentorship.mentor.role} at {mentorship.mentor.company}
                    </Typography>
                    <Typography variant="caption">
                      {mentorship.mentor.experience} years experience
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<VideoCall />}
                    onClick={startVideoCall}
                    fullWidth
                  >
                    Start Video Call
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Schedule />}
                    onClick={scheduleMeeting}
                    fullWidth
                  >
                    Schedule
                  </Button>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  Next Meeting: {mentorship.nextMeeting}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Progress Tracker */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Progress Tracker
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Overall Progress: {mentorship.progress}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={mentorship.progress}
                    sx={{ mt: 1, height: 8, borderRadius: 4 }}
                  />
                </Box>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  Sessions Completed: {mentorship.sessionsCompleted}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>Goals:</Typography>
                <Box sx={{ mb: 2 }}>
                  {mentorship.goals.map((goal) => (
                    <Chip key={goal} label={goal} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* AI Career Roadmap */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
                  AI-Generated Career Roadmap
                </Typography>
                {careerRoadmap && (
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Path to {careerRoadmap.targetRole} • {careerRoadmap.estimatedTimeline}
                    </Typography>
                    {careerRoadmap.milestones.slice(0, 2).map((milestone) => (
                      <Paper key={milestone.id} sx={{ p: 2, mb: 1, bgcolor: 'background.default' }}>
                        <Typography variant="subtitle2">{milestone.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {milestone.duration} • {milestone.skills.join(', ')}
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={milestone.id === 1 ? 60 : 20} 
                          sx={{ mt: 1 }} 
                        />
                      </Paper>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* AI Insights & Alerts */}
          {aiInsights && aiInsights.status === 'at_risk' && (
            <Grid item xs={12}>
              <Alert 
                severity="warning" 
                action={
                  <Button size="small" startIcon={<AutoFixHigh />}>
                    Get AI Help
                  </Button>
                }
              >
                <Typography variant="subtitle2">Mentorship Health Alert</Typography>
                <Typography variant="body2">
                  {aiInsights.recommendation}
                </Typography>
              </Alert>
            </Grid>
          )}

          {/* AI Chat Assistant */}
          {chatAssistant && (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Psychology sx={{ mr: 1, verticalAlign: 'middle' }} />
                    AI Mentorship Assistant
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Suggested conversation topics:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {chatAssistant.topicSuggestions.map((topic, index) => (
                      <Chip key={index} label={topic} size="small" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Mentorship;
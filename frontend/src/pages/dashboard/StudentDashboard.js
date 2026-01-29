import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Alert,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Paper,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Dashboard,
  Search,
  Chat,
  Event,
  Person,
  Notifications,
  ExitToApp,
  TrendingUp,
  School,
  Business,
  VideoCall,
  Psychology,
  AutoAwesome,
  Assessment,
  Timeline,
  Upload,
  Description,
  CheckCircle,
  Warning,
  Star,
  Route,
  Send,
  Close
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import CountUp from 'react-countup';
import { SkillGapAnalysis, CareerRoadmap, ResumeATSAnalyzer } from '../student';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('overview');
  const [uploadDialog, setUploadDialog] = useState(false);
  const [scheduleDialog, setScheduleDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [meetingForm, setMeetingForm] = useState({
    date: '',
    time: '',
    duration: '60',
    topic: '',
    type: 'video'
  });
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'ai',
      message: '👋 Hi there! I\'m your AI Mentorship Companion. I\'m here to help you with career guidance, skill development, interview prep, and resume tips. What would you like to discuss today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [stats, setStats] = useState({
    activeMentorships: 2,
    completedSessions: 8,
    upcomingMeetings: 3,
    messagesUnread: 5,
    skillProgress: 75,
    careerReadiness: 68
  });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [activeNotificationFilter, setActiveNotificationFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'meeting',
      title: 'Upcoming Meeting',
      message: 'Career guidance session with John Doe in 30 minutes',
      time: '30 min ago',
      read: false
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message from John Doe',
      message: 'Hi! How are you doing with the React project?',
      time: '1 hour ago',
      read: false,
      chatId: 1
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message from Jane Smith',
      message: 'Let me know if you need any help with the project',
      time: '2 hours ago',
      read: false,
      chatId: 2
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Achievement Unlocked',
      message: 'You completed your first mentorship session!',
      time: '3 hours ago',
      read: true
    }
  ]);
  const [scheduledMeetings, setScheduledMeetings] = useState([]);
  const [aiData, setAiData] = useState({
    skillGaps: ['Machine Learning', 'System Design', 'Leadership'],
    recommendedMentors: [
      { name: 'Dr. Sarah Johnson', expertise: 'AI/ML', match: 95 },
      { name: 'Mike Chen', expertise: 'System Design', match: 88 }
    ],
    careerRoadmap: {
      currentLevel: 'Junior Developer',
      nextMilestone: 'Mid-level Developer',
      timeframe: '8-12 months',
      progress: 65
    },
    resumeScore: 0,
    atsScore: 0
  });

  const sections = [
    { id: 'overview', title: 'Dashboard Overview', icon: <Dashboard /> },
    { id: 'browse-alumni', title: 'Browse Alumni', icon: <Search /> },
    { id: 'my-mentorships', title: 'My Mentorships', icon: <Person /> },
    { id: 'meetings', title: 'Meetings & Schedule', icon: <Event /> },
    { id: 'my-chats', title: 'My Chats', icon: <Chat /> },
    { id: 'skill-gap', title: 'Skill-Gap Analysis', icon: <Assessment /> },
    { id: 'career-roadmap', title: 'Career Roadmap', icon: <Route /> },
    { id: 'ai-companion', title: 'AI Mentorship Companion', icon: <Psychology /> },
    { id: 'progress-tracker', title: 'Progress & Outcome Tracker', icon: <Timeline /> },
    { id: 'mentor-match', title: 'Mentor Recommendation', icon: <Person /> },
    { id: 'resume-analyzer', title: 'Resume ATS Analyzer', icon: <Description /> },
    { id: 'profile', title: 'My Profile', icon: <Person /> }
  ];

  useEffect(() => {
    // Check if we need to set active section from navigation state
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
    }
  }, [location]);

  const filteredNotifications = notifications.filter(notification => {
    if (activeNotificationFilter === 'all') return true;
    if (activeNotificationFilter === 'unread') return !notification.read;
    return notification.type === activeNotificationFilter;
  });

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setChatMessages(prev => [...prev, userMessage]);
      setChatMessage('');
      
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          message: '💡 That\'s an interesting question! I\'m here to help with career guidance, skill development, interview preparation, and resume optimization. Could you tell me more about what specific area you\'d like assistance with?',
          timestamp: new Date().toLocaleTimeString()
        };
        setChatMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleScheduleMeeting = (mentor) => {
    setSelectedMentor(mentor);
    setScheduleDialog(true);
  };

  const handleMeetingSubmit = () => {
    const newMeeting = {
      id: Date.now(),
      mentor: selectedMentor.name,
      topic: meetingForm.topic,
      date: meetingForm.date,
      time: meetingForm.time,
      duration: meetingForm.duration,
      status: 'pending'
    };
    
    setScheduledMeetings(prev => [...prev, newMeeting]);
    setScheduleDialog(false);
    setSuccessDialog(true);
    setMeetingForm({ date: '', time: '', duration: '60', topic: '', type: 'video' });
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTimeout(() => {
        setAiData(prev => ({
          ...prev,
          resumeScore: 78,
          atsScore: 65
        }));
        setUploadDialog(false);
      }, 2000);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box display="flex" alignItems="center" gap={3}>
                    <Avatar sx={{ width: 80, height: 80, bgcolor: 'rgba(255,255,255,0.2)' }}>
                      <School sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        Welcome back, {user?.firstName}!
                      </Typography>
                      <Typography variant="h6" sx={{ opacity: 0.9, mt: 1 }}>
                        Ready to continue your mentorship journey?
                      </Typography>
                      <Chip label={user?.major ? `${user.major} Student` : 'Student'} sx={{ mt: 2, bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Active Mentorships" 
                value={stats.activeMentorships} 
                icon={<Business sx={{ fontSize: 40 }} />} 
                color="#2563eb" 
                onClick={() => setActiveSection('my-mentorships')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Completed Sessions" 
                value={stats.completedSessions} 
                icon={<VideoCall sx={{ fontSize: 40 }} />} 
                color="#059669" 
                onClick={() => setActiveSection('meetings')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Upcoming Meetings" 
                value={stats.upcomingMeetings} 
                icon={<Event sx={{ fontSize: 40 }} />} 
                color="#dc2626" 
                onClick={() => setActiveSection('meetings')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Unread Messages" 
                value={stats.messagesUnread} 
                icon={<Chat sx={{ fontSize: 40 }} />} 
                color="#7c3aed" 
                onClick={() => setActiveSection('my-chats')}
              />
            </Grid>
            
            {/* Quick Actions */}
            <Grid item xs={12}>
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Quick Actions</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button 
                        fullWidth 
                        variant="contained" 
                        startIcon={<Search />}
                        onClick={() => navigate('/mentorship/browse')}
                      >
                        Browse Alumni
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button 
                        fullWidth 
                        variant="outlined" 
                        startIcon={<Event />}
                        onClick={() => navigate('/meetings')}
                      >
                        Schedule Meeting
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button 
                        fullWidth 
                        variant="outlined" 
                        startIcon={<Upload />}
                        onClick={() => setUploadDialog(true)}
                      >
                        Upload Resume
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Recent Activity */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Recent Activity</Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText 
                        primary="Completed session with John Doe" 
                        secondary="2 hours ago" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Star color="warning" /></ListItemIcon>
                      <ListItemText 
                        primary="Received 5-star rating from mentor" 
                        secondary="1 day ago" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Upload color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Updated resume and got 85% ATS score" 
                        secondary="3 days ago" 
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Upcoming Events */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Upcoming Events</Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><Event color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Career Guidance Session" 
                        secondary="Today, 2:00 PM with John Doe" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><VideoCall color="success" /></ListItemIcon>
                      <ListItemText 
                        primary="Mock Interview" 
                        secondary="Tomorrow, 10:00 AM with Jane Smith" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Assessment color="info" /></ListItemIcon>
                      <ListItemText 
                        primary="Skill Assessment Review" 
                        secondary="Friday, 3:00 PM" 
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
      
      case 'skill-gap':
        return <SkillGapAnalysis />;
      
      case 'career-roadmap':
        return <CareerRoadmap />;
      
      case 'ai-companion':
        return (
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={3}>
                <Psychology sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">AI Mentorship Companion</Typography>
                <Chip label="Powered by AI" color="primary" size="small" sx={{ ml: 2 }} />
              </Box>
              
              <Alert severity="success" sx={{ mb: 3 }}>
                <AutoAwesome sx={{ mr: 1 }} />
                Your intelligent AI companion is ready to help with career guidance, skill development, and mentorship advice!
              </Alert>

              <Box sx={{ 
                height: 500, 
                border: '2px solid #e3f2fd', 
                borderRadius: 3, 
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#fafafa'
              }}>
                {/* Chat Header */}
                <Box sx={{ 
                  p: 2, 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  borderRadius: '12px 12px 0 0',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Avatar sx={{ bgcolor: 'white', color: 'primary.main', mr: 2 }}>
                    <Psychology />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">AI Mentor Assistant</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      Online • Ready to help
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                    <Chip label="Smart" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                    <Chip label="24/7" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                  </Box>
                </Box>

                {/* Chat Messages */}
                <Box sx={{ 
                  flexGrow: 1, 
                  overflowY: 'auto', 
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}>
                  {chatMessages.map((msg) => (
                    <Box key={msg.id} sx={{ 
                      display: 'flex', 
                      justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                      alignItems: 'flex-start',
                      gap: 2
                    }}>
                      {msg.type === 'ai' && (
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <Psychology />
                        </Avatar>
                      )}
                      <Paper sx={{ 
                        p: 2, 
                        maxWidth: '80%', 
                        bgcolor: msg.type === 'user' ? 'primary.main' : 'white',
                        color: msg.type === 'user' ? 'white' : 'inherit',
                        borderRadius: msg.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px'
                      }}>
                        <Typography variant="body1">
                          {msg.message}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7, mt: 1, display: 'block' }}>
                          {msg.timestamp}
                        </Typography>
                      </Paper>
                    </Box>
                  ))}
                </Box>

                {/* Chat Input */}
                <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField 
                      fullWidth 
                      placeholder="Ask me anything about your career, skills, or mentorship..."
                      variant="outlined" 
                      size="small"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 25,
                          bgcolor: 'white'
                        }
                      }}
                      InputProps={{
                        startAdornment: (
                          <Box sx={{ mr: 1 }}>
                            <AutoAwesome color="primary" fontSize="small" />
                          </Box>
                        )
                      }}
                    />
                    <IconButton 
                      color="primary" 
                      onClick={handleSendMessage}
                      sx={{ 
                        bgcolor: 'primary.main', 
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' }
                      }}
                    >
                      <Send />
                    </IconButton>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                    AI responses are generated based on your profile and mentorship data
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        );
      
      case 'progress-tracker':
        return (
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={3}>
                <Timeline sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">Progress & Outcome Tracker</Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Skill Development Progress</Typography>
                  {['JavaScript/React', 'Python', 'System Design', 'Communication'].map((skill, index) => (
                    <Box key={index} mb={2}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2">{skill}</Typography>
                        <Typography variant="body2">{70 + index * 5}%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={70 + index * 5} sx={{ height: 8, borderRadius: 4 }} />
                    </Box>
                  ))}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Recent Achievements</Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><Star color="warning" /></ListItemIcon>
                      <ListItemText primary="Completed React Advanced Course" secondary="2 days ago" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Star color="warning" /></ListItemIcon>
                      <ListItemText primary="Successful Mock Interview" secondary="1 week ago" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Star color="warning" /></ListItemIcon>
                      <ListItemText primary="Project Demo Presentation" secondary="2 weeks ago" />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      
      case 'mentor-match':
        return (
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={3}>
                <Person sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">AI-Powered Mentor Recommendations</Typography>
              </Box>
              <Alert severity="info" sx={{ mb: 3 }}>
                Based on your skill gaps and career goals, here are the best mentor matches:
              </Alert>
              <Grid container spacing={2}>
                {aiData.recommendedMentors.map((mentor, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                            {mentor.name.split(' ').map(n => n[0]).join('')}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">{mentor.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{mentor.expertise}</Typography>
                          </Box>
                          <Box textAlign="center" ml="auto">
                            <Typography variant="h6" color="success.main">{mentor.match}%</Typography>
                            <Typography variant="caption">Match</Typography>
                          </Box>
                        </Box>
                        <Button variant="contained" fullWidth>Connect with Mentor</Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        );
      
      case 'browse-alumni':
        return (
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={3}>
                <Search sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">Browse Alumni</Typography>
              </Box>
              <Grid container spacing={2}>
                {[1,2,3,4].map((i) => (
                  <Grid item xs={12} md={6} key={i}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>A{i}</Avatar>
                          <Box>
                            <Typography variant="subtitle1">Alumni {i}</Typography>
                            <Typography variant="body2" color="text.secondary">Senior Engineer at Tech Corp</Typography>
                          </Box>
                        </Box>
                        <Button variant="contained" size="small" fullWidth>View Profile</Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={() => navigate('/mentorship/browse')}>View All Alumni</Button>
            </CardContent>
          </Card>
        );
      
      case 'my-mentorships':
        return (
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Box display="flex" alignItems="center">
                  <Person sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h6">My Mentorships</Typography>
                </Box>
                <Button 
                  variant="contained" 
                  startIcon={<Search />}
                  onClick={() => setActiveSection('browse-alumni')}
                >
                  Find New Mentor
                </Button>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Active Mentorships</Typography>
                  <List>
                    <ListItem sx={{ bgcolor: 'background.paper', borderRadius: 1, mb: 1, border: '1px solid #e0e0e0' }}>
                      <ListItemIcon><Avatar sx={{ bgcolor: 'primary.main' }}>JD</Avatar></ListItemIcon>
                      <ListItemText 
                        primary="John Doe" 
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">Software Engineering Mentor</Typography>
                            <Typography variant="caption" color="text.secondary">Google • Started 2 months ago</Typography>
                          </Box>
                        }
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button 
                          size="small" 
                          variant="contained" 
                          startIcon={<Chat />}
                          onClick={() => navigate('/chat/1', { state: { returnTo: 'my-mentorships' } })}
                        >
                          Message
                        </Button>
                        <Button 
                          size="small" 
                          variant="outlined" 
                          startIcon={<VideoCall />} 
                          onClick={() => handleScheduleMeeting({ name: 'John Doe', id: 1 })}
                        >
                          Schedule
                        </Button>
                      </Box>
                    </ListItem>
                    <ListItem sx={{ bgcolor: 'background.paper', borderRadius: 1, mb: 1, border: '1px solid #e0e0e0' }}>
                      <ListItemIcon><Avatar sx={{ bgcolor: 'secondary.main' }}>JS</Avatar></ListItemIcon>
                      <ListItemText 
                        primary="Jane Smith" 
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">Product Management Mentor</Typography>
                            <Typography variant="caption" color="text.secondary">Microsoft • Started 1 month ago</Typography>
                          </Box>
                        }
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button 
                          size="small" 
                          variant="contained" 
                          startIcon={<Chat />}
                          onClick={() => navigate('/chat/2', { state: { returnTo: 'my-mentorships' } })}
                        >
                          Message
                        </Button>
                        <Button 
                          size="small" 
                          variant="outlined" 
                          startIcon={<VideoCall />} 
                          onClick={() => handleScheduleMeeting({ name: 'Jane Smith', id: 2 })}
                        >
                          Schedule
                        </Button>
                      </Box>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Pending Requests</Typography>
                  <List>
                    <ListItem sx={{ bgcolor: 'warning.light', borderRadius: 1, mb: 1, border: '2px solid #ff9800' }}>
                      <ListItemIcon><Avatar sx={{ bgcolor: 'warning.main' }}>MJ</Avatar></ListItemIcon>
                      <ListItemText 
                        primary="Mike Johnson" 
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">Data Science Mentor</Typography>
                            <Typography variant="caption" color="text.secondary">Amazon • Requested 3 days ago</Typography>
                          </Box>
                        }
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Chip label="Pending" color="warning" size="small" />
                        <Button size="small" variant="text" color="error">Cancel Request</Button>
                      </Box>
                    </ListItem>
                  </List>
                  
                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>Completed Mentorships</Typography>
                  <List>
                    <ListItem sx={{ bgcolor: 'success.light', borderRadius: 1, mb: 1, border: '2px solid #4caf50' }}>
                      <ListItemIcon><Avatar sx={{ bgcolor: 'success.main' }}>AB</Avatar></ListItemIcon>
                      <ListItemText 
                        primary="Alice Brown" 
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">Career Guidance Mentor</Typography>
                            <Typography variant="caption" color="text.secondary">Meta • Completed 6 months ago</Typography>
                          </Box>
                        }
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Chip label="Completed" color="success" size="small" />
                        <Button size="small" variant="outlined">View History</Button>
                      </Box>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      
      case 'meetings':
        return (
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={3}>
                <Event sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">Meetings & Schedule</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Upcoming Meetings</Typography>
                  <List>
                    {scheduledMeetings.map((meeting) => (
                      <ListItem key={meeting.id}>
                        <ListItemIcon><VideoCall color="primary" /></ListItemIcon>
                        <ListItemText 
                          primary={meeting.topic} 
                          secondary={`${meeting.date} at ${meeting.time} with ${meeting.mentor} • Duration: ${meeting.duration} min`} 
                        />
                        <Button 
                          size="small" 
                          variant="contained"
                          disabled={meeting.status === 'pending'}
                          sx={{
                            bgcolor: meeting.status === 'pending' ? 'error.main' : 'success.main',
                            '&:hover': {
                              bgcolor: meeting.status === 'pending' ? 'error.main' : 'success.dark'
                            },
                            '&.Mui-disabled': {
                              bgcolor: 'error.main',
                              color: 'white'
                            }
                          }}
                          onClick={() => meeting.status === 'accepted' && window.open(`/video-call/meeting_${meeting.id}`, '_blank')}
                        >
                          Join
                        </Button>
                      </ListItem>
                    ))}
                    <ListItem>
                      <ListItemIcon><VideoCall color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Career Guidance Session" 
                        secondary="Today, 2:00 PM with John Doe • Duration: 60 min" 
                      />
                      <Button 
                        size="small" 
                        variant="contained"
                        sx={{ bgcolor: 'success.main', '&:hover': { bgcolor: 'success.dark' } }}
                        onClick={() => window.open('/video-call/meeting_accepted', '_blank')}
                      >
                        Join
                      </Button>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><VideoCall color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Technical Interview Prep" 
                        secondary="Tomorrow, 10:00 AM with Jane Smith • Duration: 45 min" 
                      />
                      <Button 
                        size="small" 
                        variant="contained"
                        disabled
                        sx={{
                          bgcolor: 'error.main',
                          '&.Mui-disabled': {
                            bgcolor: 'error.main',
                            color: 'white'
                          }
                        }}
                      >
                        Join
                      </Button>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Quick Actions</Typography>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Button variant="contained" startIcon={<Event />}>Schedule New Meeting</Button>
                    <Button variant="outlined" startIcon={<VideoCall />}>Join Video Call</Button>
                  </Box>
                </Grid>
              </Grid>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={() => navigate('/meetings')}>View All Meetings</Button>
            </CardContent>
          </Card>
        );
      
      case 'my-chats':
        return (
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={3}>
                <Chat sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">My Chats</Typography>
                <Badge badgeContent={notifications.filter(n => n.type === 'message' && !n.read).length} color="error" sx={{ ml: 2 }} />
              </Box>
              <List>
                {notifications.filter(n => n.type === 'message').map((notification) => (
                  <ListItem 
                    key={notification.id}
                    button
                    onClick={() => {
                      setNotifications(notifications.map(n => 
                        n.id === notification.id ? { ...n, read: true } : n
                      ));
                      navigate(`/chat/${notification.chatId}`, { state: { returnTo: 'my-chats' } });
                    }}
                    sx={{
                      bgcolor: notification.read ? 'transparent' : 'action.hover',
                      borderRadius: 1,
                      mb: 1,
                      border: notification.read ? '1px solid transparent' : '1px solid primary.main'
                    }}
                  >
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {notification.title.includes('John') ? 'JD' : 'JS'}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}
                          >
                            {notification.title.replace('New Message from ', '')}
                          </Typography>
                          {!notification.read && (
                            <Box sx={{ width: 8, height: 8, bgcolor: 'primary.main', borderRadius: '50%' }} />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ 
                              fontWeight: notification.read ? 'normal' : 'medium',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: '300px'
                            }}
                          >
                            {notification.message}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {notification.time}
                          </Typography>
                        </Box>
                      }
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <IconButton 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setNotifications(notifications.filter(n => n.id !== notification.id));
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                      {!notification.read && (
                        <Button 
                          size="small" 
                          variant="text"
                          onClick={(e) => {
                            e.stopPropagation();
                            setNotifications(notifications.map(n => 
                              n.id === notification.id ? { ...n, read: true } : n
                            ));
                          }}
                        >
                          Mark Read
                        </Button>
                      )}
                    </Box>
                  </ListItem>
                ))}
              </List>
              
              {notifications.filter(n => n.type === 'message').length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Chat sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No messages yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Start a conversation with your mentors!
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        );
      
      case 'resume-analyzer':
        return <ResumeATSAnalyzer />;
      
      default:
        return null;
    }
  };

  const StatCard = ({ title, value, icon, color, suffix = '', onClick }) => (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
        border: `1px solid ${color}30`,
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        },
        transition: 'all 0.3s ease',
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h3" fontWeight="bold" color={color}>
              <CountUp end={value} duration={2} suffix={suffix} />
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
          <Box sx={{ color: color, opacity: 0.7 }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Alumni Connect - Welcome, {user?.firstName}!
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              label={user?.role || 'Student'} 
              color="primary" 
              size="small" 
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
            <IconButton 
              color="inherit" 
              onClick={(e) => {
                setNotificationAnchor(e.currentTarget);
                setNotificationOpen(!notificationOpen);
              }}
            >
              <Badge badgeContent={notifications.filter(n => !n.read).length} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={logout}>
              <ExitToApp />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            mt: 8,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" color="primary.main" gutterBottom>
            Student Features
          </Typography>
        </Box>
        <List>
          {sections.map((section) => (
            <ListItem
              button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              sx={{
                backgroundColor: activeSection === section.id ? 'primary.light' : 'transparent',
                color: activeSection === section.id ? 'white' : 'inherit',
                '&:hover': {
                  backgroundColor: activeSection === section.id ? 'primary.main' : 'primary.light',
                  color: 'white',
                },
                mx: 1,
                borderRadius: 1,
                mb: 0.5
              }}
            >
              <ListItemIcon sx={{ color: activeSection === section.id ? 'white' : 'inherit' }}>
                {section.icon}
              </ListItemIcon>
              <ListItemText primary={section.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          {sections.find(s => s.id === activeSection)?.title || 'Dashboard'}
        </Typography>
        
        {renderContent()}
      </Box>

      {/* Notification Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={notificationOpen}
        onClose={() => {
          setNotificationOpen(false);
          setNotificationAnchor(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { width: 350, maxHeight: 400, mt: 1 }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6">Notifications</Typography>
          <Typography variant="caption" color="text.secondary">
            {notifications.filter(n => !n.read).length} unread
          </Typography>
        </Box>
        {notifications.map((notification) => (
          <MenuItem 
            key={notification.id} 
            sx={{ py: 2, borderBottom: '1px solid #f0f0f0' }}
            onClick={() => {
              setNotifications(notifications.map(n => 
                n.id === notification.id ? { ...n, read: true } : n
              ));
              
              if (notification.type === 'message' && notification.chatId) {
                navigate(`/chat/${notification.chatId}`);
              } else if (notification.type === 'meeting') {
                setActiveSection('meetings');
              } else if (notification.type === 'achievement') {
                setActiveSection('progress-tracker');
              }
              
              setNotificationOpen(false);
              setNotificationAnchor(null);
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                  {notification.title}
                </Typography>
                {!notification.read && (
                  <Box sx={{ width: 8, height: 8, bgcolor: 'primary.main', borderRadius: '50%' }} />
                )}
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {notification.message}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {notification.time}
              </Typography>
            </Box>
          </MenuItem>
        ))}
        <Box sx={{ p: 2, textAlign: 'center', borderTop: '1px solid #e0e0e0' }}>
          <Button size="small" onClick={() => {
            setNotificationOpen(false);
            setNotificationAnchor(null);
          }}>
            Close
          </Button>
        </Box>
      </Menu>

      {/* Success Dialog */}
      <Dialog open={successDialog} onClose={() => setSuccessDialog(false)} maxWidth="sm" fullWidth>
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Meeting Scheduled Successfully!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your meeting request with {selectedMentor?.name} has been sent successfully.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button onClick={() => setSuccessDialog(false)} variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Schedule Meeting Dialog */}
      <Dialog open={scheduleDialog} onClose={() => setScheduleDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule Meeting with {selectedMentor?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Meeting Topic"
              fullWidth
              value={meetingForm.topic}
              onChange={(e) => setMeetingForm({...meetingForm, topic: e.target.value})}
            />
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={meetingForm.date}
              onChange={(e) => setMeetingForm({...meetingForm, date: e.target.value})}
            />
            <TextField
              label="Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={meetingForm.time}
              onChange={(e) => setMeetingForm({...meetingForm, time: e.target.value})}
            />
            <TextField
              label="Duration (minutes)"
              type="number"
              fullWidth
              value={meetingForm.duration}
              onChange={(e) => setMeetingForm({...meetingForm, duration: e.target.value})}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScheduleDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleMeetingSubmit} 
            variant="contained" 
            startIcon={<Event />}
            disabled={!meetingForm.date || !meetingForm.time || !meetingForm.topic}
          >
            Schedule Meeting
          </Button>
        </DialogActions>
      </Dialog>

      {/* Resume Upload Dialog */}
      <Dialog open={uploadDialog} onClose={() => setUploadDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Resume for AI Analysis</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Upload your resume to get instant AI-powered analysis and ATS compatibility score.
          </Typography>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            style={{ marginTop: 16 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentDashboard;
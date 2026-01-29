import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  Alert,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Divider,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Dashboard,
  People,
  Assessment,
  Schedule,
  EmojiEvents,
  ExitToApp,
  Business,
  TrendingUp,
  Description,
  Psychology,
  AutoAwesome,
  CheckCircle,
  Warning
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AlumniDashboardStats from '../../components/dashboard/AlumniDashboardStats';
import MentorImpactView from '../../components/ai/MentorImpactView';
import MentorRecognition from '../../components/ai/MentorRecognition';
import SmartScheduling from '../../components/ai/SmartScheduling';
import SessionSummaryDialog from '../../components/ai/SessionSummaryDialog';
import AlumniAIInsights from '../../components/ai/AlumniAIInsights';
import NotificationCenter from '../../components/common/NotificationCenter';

const AlumniDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);
  const [resumeDialogOpen, setResumeDialogOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [stats, setStats] = useState({
    totalMentees: 12,
    activeMentorships: 8,
    completedSessions: 48,
    averageRating: 4.8,
    aiImpactScore: 94,
    careerPlacements: 5
  });
  const [resumeInsights, setResumeInsights] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setStats({
      totalMentees: 12,
      activeMentorships: 8,
      completedSessions: 48,
      averageRating: 4.8,
      aiImpactScore: 94,
      careerPlacements: 5
    });
    
    setResumeInsights([
      {
        id: 1,
        menteeName: 'Sarah Chen',
        resumeScore: 85,
        lastUpdated: '2024-01-15',
        aiInsights: {
          strengths: ['Strong technical skills', 'Quantified achievements'],
          improvements: ['Add leadership examples', 'Include soft skills'],
          keywords: { missing: ['Docker', 'Kubernetes', 'CI/CD'] }
        },
        needsReview: true
      },
      {
        id: 2,
        menteeName: 'Mike Johnson',
        resumeScore: 78,
        lastUpdated: '2024-01-12',
        aiInsights: {
          strengths: ['Leadership experience', 'Clear progression'],
          improvements: ['Add technical certifications', 'More metrics'],
          keywords: { missing: ['Digital Transformation', 'Data Analytics'] }
        },
        needsReview: true
      }
    ]);
  };

  const sections = [
    { id: 'overview', title: 'Dashboard Overview', icon: <Dashboard /> },
    { id: 'my-mentees', title: 'My Mentees', icon: <People /> },
    { id: 'schedule', title: 'Schedule & Meetings', icon: <Schedule /> },
    { id: 'resume-insights', title: 'AI Resume Insights', icon: <Psychology /> },
    { id: 'ai-tools', title: 'AI-Powered Tools', icon: <AutoAwesome /> },
    { id: 'impact', title: 'Mentoring Impact', icon: <TrendingUp /> },
    { id: 'recognition', title: 'Recognition & Achievements', icon: <EmojiEvents /> },
    { id: 'profile', title: 'My Profile', icon: <Business /> }
  ];

  const handleStatClick = (statType) => {
    switch (statType) {
      case 'mentees':
        navigate('/mentees');
        break;
      case 'sessions':
        setSummaryDialogOpen(true);
        break;
      case 'active':
        navigate('/mentees');
        break;
      case 'rating':
        navigate('/impact');
        break;
      default:
        break;
    }
  };

  const handleResumeReview = (resume) => {
    setSelectedResume(resume);
    setResumeDialogOpen(true);
  };

  const submitFeedback = () => {
    setResumeDialogOpen(false);
    setFeedback('');
    setSelectedResume(null);
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
                      <Business sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        Welcome back, {user?.name}!
                      </Typography>
                      <Typography variant="h6" sx={{ opacity: 0.9, mt: 1 }}>
                        Ready to inspire the next generation?
                      </Typography>
                      <Chip label="Mentor" sx={{ mt: 2, bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <AlumniDashboardStats stats={stats} onStatClick={handleStatClick} />
            </Grid>
            
            {/* Quick Actions */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Quick Actions</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button 
                        fullWidth 
                        variant="contained" 
                        startIcon={<People />}
                        onClick={() => setActiveSection('my-mentees')}
                      >
                        View Mentees
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button 
                        fullWidth 
                        variant="outlined" 
                        startIcon={<Schedule />}
                        onClick={() => setActiveSection('schedule')}
                      >
                        Schedule Meeting
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button 
                        fullWidth 
                        variant="outlined" 
                        startIcon={<Psychology />}
                        onClick={() => setActiveSection('resume-insights')}
                      >
                        Review Resumes
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button 
                        fullWidth 
                        variant="outlined" 
                        startIcon={<Assessment />}
                        onClick={() => setActiveSection('impact')}
                      >
                        View Impact
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
                        primary="Completed session with Sarah Chen" 
                        secondary="2 hours ago" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Description color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Reviewed resume for Mike Johnson" 
                        secondary="1 day ago" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><EmojiEvents color="warning" /></ListItemIcon>
                      <ListItemText 
                        primary="Received 5-star rating from mentee" 
                        secondary="3 days ago" 
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Upcoming Sessions */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Upcoming Sessions</Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><Schedule color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Career Guidance - Sarah Chen" 
                        secondary="Today, 2:00 PM" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Assessment color="info" /></ListItemIcon>
                      <ListItemText 
                        primary="Resume Review - Mike Johnson" 
                        secondary="Tomorrow, 4:00 PM" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><People color="success" /></ListItemIcon>
                      <ListItemText 
                        primary="Mock Interview - Lisa Wang" 
                        secondary="Friday, 10:00 AM" 
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
      
      case 'resume-insights':
        return (
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Psychology sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">AI-Generated Resume Insights</Typography>
                <Chip label={`${resumeInsights.filter(r => r.needsReview).length} Pending`} color="warning" size="small" sx={{ ml: 2 }} />
              </Box>
              
              <Alert severity="info" sx={{ mb: 3 }}>
                <Box display="flex" alignItems="center">
                  <AutoAwesome sx={{ mr: 1 }} />
                  Review AI-generated resume insights and provide expert mentoring feedback to help students refine resumes for real-world roles.
                </Box>
              </Alert>

              <Grid container spacing={2}>
                {resumeInsights.map((resume) => (
                  <Grid item xs={12} md={6} key={resume.id}>
                    <Card variant="outlined" sx={{ border: resume.needsReview ? '2px solid #ff9800' : '1px solid #e0e0e0' }}>
                      <CardContent>
                        <Box display="flex" justifyContent="between" alignItems="center" mb={2}>
                          <Box display="flex" alignItems="center">
                            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                              {resume.menteeName.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {resume.menteeName}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Updated: {resume.lastUpdated}
                              </Typography>
                            </Box>
                          </Box>
                          <Box textAlign="center">
                            <Typography variant="h6" color="primary.main" fontWeight="bold">
                              {resume.resumeScore}
                            </Typography>
                            <Typography variant="caption">AI Score</Typography>
                          </Box>
                        </Box>

                        <Box mb={2}>
                          <Typography variant="subtitle2" gutterBottom>Resume Strength</Typography>
                          <LinearProgress variant="determinate" value={resume.resumeScore} sx={{ height: 6, borderRadius: 3 }} />
                        </Box>

                        <Box mb={2}>
                          <Typography variant="subtitle2" color="success.main" gutterBottom>AI-Identified Strengths</Typography>
                          <Box display="flex" flexWrap="wrap" gap={0.5}>
                            {resume.aiInsights.strengths.slice(0, 2).map((strength, index) => (
                              <Chip key={index} label={strength} color="success" size="small" />
                            ))}
                          </Box>
                        </Box>

                        <Box mb={2}>
                          <Typography variant="subtitle2" color="warning.main" gutterBottom>Improvement Areas</Typography>
                          <Box display="flex" flexWrap="wrap" gap={0.5}>
                            {resume.aiInsights.improvements.slice(0, 2).map((improvement, index) => (
                              <Chip key={index} label={improvement} color="warning" size="small" />
                            ))}
                          </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />
                        
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          {resume.needsReview && <Chip label="Needs Review" color="warning" size="small" />}
                          <Button variant="contained" size="small" startIcon={<Description />} onClick={() => handleResumeReview(resume)}>
                            Review & Provide Feedback
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        );
      
      case 'ai-tools':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <AlumniAIInsights />
            </Grid>
            <Grid item xs={12}>
              <SmartScheduling />
            </Grid>
          </Grid>
        );
      
      case 'impact':
        return <MentorImpactView />;
      
      case 'recognition':
        return <MentorRecognition />;
      
      case 'my-mentees':
        return (
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={3}>
                <People sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">My Mentees</Typography>
                <Chip label={`${stats.activeMentorships} Active`} color="primary" size="small" sx={{ ml: 2 }} />
              </Box>
              <Grid container spacing={2}>
                {[1,2,3,4].map((i) => (
                  <Grid item xs={12} md={6} key={i}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>S{i}</Avatar>
                          <Box>
                            <Typography variant="subtitle1">Student {i}</Typography>
                            <Typography variant="body2" color="text.secondary">Computer Science • Senior</Typography>
                          </Box>
                          <Box ml="auto">
                            <Rating value={4.5} size="small" readOnly />
                          </Box>
                        </Box>
                        <Box display="flex" gap={1} mb={2}>
                          <Chip label="Active" color="success" size="small" />
                          <Chip label="8 Sessions" size="small" />
                        </Box>
                        <Box display="flex" gap={1}>
                          <Button size="small" variant="contained">Message</Button>
                          <Button size="small" variant="outlined">Schedule</Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={() => navigate('/mentees')}>View All Mentees</Button>
            </CardContent>
          </Card>
        );
      
      case 'schedule':
        return (
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={3}>
                <Schedule sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">Schedule & Meetings</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Today's Schedule</Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><Schedule color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Career Guidance - Sarah Chen" 
                        secondary="2:00 PM - 3:00 PM" 
                      />
                      <Button size="small" variant="contained">Join</Button>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Schedule color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Resume Review - Mike Johnson" 
                        secondary="4:00 PM - 4:30 PM" 
                      />
                      <Button size="small" variant="outlined">Prepare</Button>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>This Week</Typography>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Alert severity="info">5 sessions scheduled</Alert>
                    <Alert severity="success">3 sessions completed</Alert>
                    <Button variant="contained" startIcon={<Schedule />}>Smart Schedule</Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      
      case 'profile':
        return (
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={3}>
                <Business sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">My Profile</Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center">
                    <Avatar sx={{ width: 120, height: 120, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
                      <Business sx={{ fontSize: 60 }} />
                    </Avatar>
                    <Typography variant="h6">{user?.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{user?.company} • {user?.position}</Typography>
                    <Button variant="outlined" sx={{ mt: 2 }}>Edit Profile</Button>
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="subtitle1" gutterBottom>Professional Information</Typography>
                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary">Company</Typography>
                    <Typography variant="body1">{user?.company || 'Tech Corp'}</Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary">Position</Typography>
                    <Typography variant="body1">{user?.position || 'Senior Engineer'}</Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary">Experience</Typography>
                    <Typography variant="body1">8+ years</Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary">Expertise</Typography>
                    <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                      {['Software Engineering', 'System Design', 'Leadership', 'Mentoring'].map((skill) => (
                        <Chip key={skill} label={skill} size="small" color="primary" variant="outlined" />
                      ))}
                    </Box>
                  </Box>
                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary">Mentoring Stats</Typography>
                    <Box display="flex" gap={2} mt={1}>
                      <Chip label={`${stats.totalMentees} Total Mentees`} color="success" />
                      <Chip label={`${stats.averageRating}★ Rating`} color="warning" />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      
      case 'quick-actions':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth variant="contained" onClick={() => setSummaryDialogOpen(true)} sx={{ mb: 1 }}>
                    Generate Session Summary
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth variant="outlined" onClick={() => navigate('/impact')}>
                    View Impact Analytics
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Alumni Connect - Mentor Dashboard
          </Typography>
          <NotificationCenter />
          <IconButton color="inherit" onClick={logout}>
            <ExitToApp />
          </IconButton>
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
            Dashboard Sections
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

      {/* Session Summary Dialog */}
      <SessionSummaryDialog
        open={summaryDialogOpen}
        onClose={() => setSummaryDialogOpen(false)}
        sessionData={null}
      />

      {/* Resume Review Dialog */}
      <Dialog open={resumeDialogOpen} onClose={() => setResumeDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Description sx={{ mr: 1 }} />
            Resume Review for {selectedResume?.menteeName}
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedResume && (
            <Box>
              <Alert severity="info" sx={{ mb: 2 }}>
                <Box display="flex" alignItems="center">
                  <AutoAwesome sx={{ mr: 1 }} />
                  AI Analysis Complete - Provide your expert mentoring feedback
                </Box>
              </Alert>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="success.main" gutterBottom>
                    AI-Identified Strengths
                  </Typography>
                  <List dense>
                    {selectedResume.aiInsights.strengths.map((strength, index) => (
                      <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                        <ListItemIcon>
                          <CheckCircle color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={strength} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="warning.main" gutterBottom>
                    Areas for Improvement
                  </Typography>
                  <List dense>
                    {selectedResume.aiInsights.improvements.map((improvement, index) => (
                      <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                        <ListItemIcon>
                          <Warning color="warning" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={improvement} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>

              <Box mb={2}>
                <Typography variant="subtitle2" gutterBottom>
                  Missing Keywords (AI Detected)
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {selectedResume.aiInsights.keywords.missing.map((keyword, index) => (
                    <Chip key={index} label={keyword} variant="outlined" size="small" />
                  ))}
                </Box>
              </Box>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Your Expert Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide detailed feedback based on AI insights and your industry experience..."
                sx={{ mb: 2 }}
              />

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Overall Rating
                </Typography>
                <Rating size="large" />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResumeDialogOpen(false)}>Cancel</Button>
          <Button onClick={submitFeedback} variant="contained" disabled={!feedback.trim()}>
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlumniDashboard;
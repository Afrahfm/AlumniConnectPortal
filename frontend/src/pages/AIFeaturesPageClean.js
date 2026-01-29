import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  useMediaQuery,
  useTheme,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Button,
  Avatar,
  Alert,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  ArrowBack,
  TableOfContents,
  Menu,
  Assessment,
  Psychology,
  TrendingUp,
  Star,
  Schedule,
  SmartToy,
  Analytics,
  School,
  VideoCall
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AIFeaturesPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tocOpen, setTocOpen] = useState(false);
  const [aiCompanionOpen, setAiCompanionOpen] = useState(false);

  const sections = [
    { id: 'skill-gap', title: 'Skill Gap Analysis', icon: <Assessment /> },
    { id: 'mentor-matching', title: 'AI Mentor Matching', icon: <Psychology /> },
    { id: 'career-roadmap', title: 'Career Roadmap', icon: <TrendingUp /> },
    { id: 'smart-scheduling', title: 'Smart Scheduling', icon: <Schedule /> },
    { id: 'progress-tracking', title: 'Progress Tracking', icon: <Analytics /> },
    { id: 'session-insights', title: 'Session Insights', icon: <School /> }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTocOpen(false);
    }
  };

  const TableOfContentsComponent = () => (
    <Paper sx={{ p: 2, mb: 4, bgcolor: 'background.paper' }}>
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <TableOfContents color="primary" />
        Quick Navigation
      </Typography>
      <List dense>
        {sections.map((section, index) => (
          <ListItem key={section.id} disablePadding>
            <ListItemButton 
              onClick={() => scrollToSection(section.id)}
              sx={{ 
                borderRadius: 1,
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <Box sx={{ mr: 2, color: 'primary.main' }}>
                {section.icon}
              </Box>
              <ListItemText 
                primary={`${index + 1}. ${section.title}`}
                sx={{ '& .MuiListItemText-primary': { fontWeight: 500 } }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/student/dashboard')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            AI-Powered Features
          </Typography>
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={() => setTocOpen(true)}
            >
              <Menu />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          Intelligent Learning Assistant
        </Typography>
        
        {!isMobile && <TableOfContentsComponent />}
        
        {/* Skill Gap Analysis Section */}
        <Box id="skill-gap" sx={{ mb: 6, scrollMarginTop: '80px' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 4, height: 24, bgcolor: 'primary.main', borderRadius: 1 }} />
            Skill Gap Analysis
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 2 }}>
                AI analyzed your profile for Software Engineer role - 72% match
              </Alert>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <Assessment color="primary" />
                    <Typography variant="h6">Skill Gap Analysis</Typography>
                  </Box>
                  {[
                    { skill: 'React.js', current: 60, required: 85, gap: 25, priority: 'High' },
                    { skill: 'System Design', current: 40, required: 80, gap: 40, priority: 'High' },
                    { skill: 'Data Structures', current: 75, required: 90, gap: 15, priority: 'Medium' }
                  ].map((skill, index) => (
                    <Box key={index} mb={3}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="subtitle2">{skill.skill}</Typography>
                        <Chip label={`${skill.gap}% gap`} color={skill.priority === 'High' ? 'error' : 'warning'} size="small" />
                      </Box>
                      <LinearProgress variant="determinate" value={skill.current} sx={{ height: 6, borderRadius: 3 }} />
                      <Typography variant="caption" color="text.secondary">
                        Current: {skill.current}% | Required: {skill.required}%
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Recommended Actions</Typography>
                  <Button variant="contained" fullWidth sx={{ mb: 1 }}>Find React.js Mentor</Button>
                  <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Take System Design Course</Button>
                  <Button variant="outlined" fullWidth>Practice Data Structures</Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* AI Mentor Matching Section */}
        <Box id="mentor-matching" sx={{ mb: 6, scrollMarginTop: '80px' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 4, height: 24, bgcolor: 'primary.main', borderRadius: 1 }} />
            AI Mentor Matching
          </Typography>
          <Grid container spacing={3}>
            {[
              { name: 'John Doe', company: 'Google', expertise: ['React.js', 'System Design'], rating: 4.9, match: 95 },
              { name: 'Sarah Wilson', company: 'Microsoft', expertise: ['Leadership', 'Career Growth'], rating: 4.8, match: 88 },
              { name: 'Mike Johnson', company: 'Amazon', expertise: ['Data Structures', 'Algorithms'], rating: 4.7, match: 82 }
            ].map((mentor, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Avatar>{mentor.name[0]}</Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">{mentor.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{mentor.company}</Typography>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Star fontSize="small" color="warning" />
                      <Typography variant="body2">{mentor.rating}</Typography>
                    </Box>
                    <Box display="flex" gap={0.5} mb={2} flexWrap="wrap">
                      {mentor.expertise.map((skill, i) => (
                        <Chip key={i} label={skill} size="small" variant="outlined" />
                      ))}
                    </Box>
                    <Chip label={`${mentor.match}% match`} color="success" size="small" sx={{ mb: 2 }} />
                    <Button variant="contained" fullWidth size="small">Connect</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Career Roadmap Section */}
        <Box id="career-roadmap" sx={{ mb: 6, scrollMarginTop: '80px' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 4, height: 24, bgcolor: 'primary.main', borderRadius: 1 }} />
            Career Roadmap
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Your Personalized Path to Software Engineer</Typography>
              <Grid container spacing={2}>
                {[
                  { phase: 'Foundation', duration: '3 months', status: 'completed', skills: ['HTML/CSS', 'JavaScript Basics'] },
                  { phase: 'Frontend Development', duration: '4 months', status: 'current', skills: ['React.js', 'State Management'] },
                  { phase: 'Backend & APIs', duration: '3 months', status: 'upcoming', skills: ['Node.js', 'Databases'] },
                  { phase: 'System Design', duration: '2 months', status: 'upcoming', skills: ['Scalability', 'Architecture'] }
                ].map((phase, index) => (
                  <Grid item xs={12} md={3} key={index}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold">{phase.phase}</Typography>
                        <Typography variant="caption" color="text.secondary">{phase.duration}</Typography>
                        <Chip 
                          label={phase.status} 
                          color={phase.status === 'completed' ? 'success' : phase.status === 'current' ? 'primary' : 'default'} 
                          size="small" 
                          sx={{ mt: 1, mb: 1 }}
                        />
                        <Box>
                          {phase.skills.map((skill, i) => (
                            <Chip key={i} label={skill} size="small" variant="outlined" sx={{ mr: 0.5, mb: 0.5 }} />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Box>

        {/* Smart Scheduling Section */}
        <Box id="smart-scheduling" sx={{ mb: 6, scrollMarginTop: '80px' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 4, height: 24, bgcolor: 'primary.main', borderRadius: 1 }} />
            Smart Scheduling
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Optimal Meeting Times</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    AI suggests the best times based on your and mentor's availability
                  </Typography>
                  {[
                    { time: 'Today 3:00 PM', mentor: 'John Doe', topic: 'React.js Review' },
                    { time: 'Tomorrow 10:00 AM', mentor: 'Sarah Wilson', topic: 'Career Planning' },
                    { time: 'Friday 2:00 PM', mentor: 'Mike Johnson', topic: 'Algorithm Practice' }
                  ].map((meeting, index) => (
                    <Box key={index} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 1 }}>
                      <Typography variant="subtitle2">{meeting.time}</Typography>
                      <Typography variant="body2" color="text.secondary">{meeting.mentor} - {meeting.topic}</Typography>
                      <Button size="small" variant="outlined" sx={{ mt: 1 }}>Schedule</Button>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Meeting Insights</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2">Average session duration: 45 minutes</Typography>
                    <LinearProgress variant="determinate" value={75} sx={{ mt: 1 }} />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2">Preferred time slots: Afternoons</Typography>
                    <LinearProgress variant="determinate" value={85} sx={{ mt: 1 }} />
                  </Box>
                  <Box>
                    <Typography variant="body2">Success rate: 92%</Typography>
                    <LinearProgress variant="determinate" value={92} color="success" sx={{ mt: 1 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Progress Tracking Section */}
        <Box id="progress-tracking" sx={{ mb: 6, scrollMarginTop: '80px' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 4, height: 24, bgcolor: 'primary.main', borderRadius: 1 }} />
            Progress Tracking
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Learning Progress</Typography>
                  {[
                    { skill: 'React.js', progress: 75, trend: '+15%' },
                    { skill: 'System Design', progress: 45, trend: '+25%' },
                    { skill: 'Communication', progress: 85, trend: '+5%' }
                  ].map((item, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="subtitle2">{item.skill}</Typography>
                        <Chip label={item.trend} color="success" size="small" />
                      </Box>
                      <LinearProgress variant="determinate" value={item.progress} sx={{ height: 8, borderRadius: 4 }} />
                      <Typography variant="caption" color="text.secondary">{item.progress}% Complete</Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Achievements</Typography>
                  {[
                    { title: 'First Mentor Session', icon: <VideoCall />, date: '2 weeks ago' },
                    { title: 'React.js Milestone', icon: <School />, date: '1 week ago' },
                    { title: 'Active Learner', icon: <TrendingUp />, date: 'Yesterday' }
                  ].map((achievement, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={2} mb={2}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                        {achievement.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">{achievement.title}</Typography>
                        <Typography variant="caption" color="text.secondary">{achievement.date}</Typography>
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Session Insights Section */}
        <Box id="session-insights" sx={{ mb: 6, scrollMarginTop: '80px' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 4, height: 24, bgcolor: 'primary.main', borderRadius: 1 }} />
            Session Insights
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Recent Session Summary</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Last session with John Doe - React.js Deep Dive
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2">Key Topics Covered:</Typography>
                    <Box display="flex" gap={0.5} mt={1} flexWrap="wrap">
                      {['Hooks', 'State Management', 'Component Lifecycle'].map((topic, i) => (
                        <Chip key={i} label={topic} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2">Action Items:</Typography>
                    <Typography variant="body2">• Practice useEffect hook</Typography>
                    <Typography variant="body2">• Build a todo app</Typography>
                    <Typography variant="body2">• Review Redux concepts</Typography>
                  </Box>
                  <Button variant="contained" size="small">View Full Summary</Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>AI Recommendations</Typography>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Based on your recent sessions, focus on practical projects
                  </Alert>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2">Suggested Next Steps:</Typography>
                    <Typography variant="body2">1. Schedule follow-up with John Doe</Typography>
                    <Typography variant="body2">2. Connect with Sarah Wilson for career advice</Typography>
                    <Typography variant="body2">3. Join the React.js study group</Typography>
                  </Box>
                  <Button variant="outlined" size="small" fullWidth>Get More Recommendations</Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
      
      {/* AI Companion Floating Button */}
      <Fab
        color="primary"
        onClick={() => setAiCompanionOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)'
        }}
      >
        <SmartToy sx={{ color: 'white' }} />
      </Fab>
      
      {/* AI Companion Dialog */}
      <Dialog
        open={aiCompanionOpen}
        onClose={() => setAiCompanionOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SmartToy color="primary" />
          AI Mentorship Companion
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Hi! I'm your AI companion. I can help you with:
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">• Finding the right mentor for your goals</Typography>
            <Typography variant="body2">• Scheduling optimal meeting times</Typography>
            <Typography variant="body2">• Tracking your learning progress</Typography>
            <Typography variant="body2">• Providing personalized recommendations</Typography>
          </Box>
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="body2" fontStyle="italic">
              "What would you like to work on today?"
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAiCompanionOpen(false)}>Close</Button>
          <Button variant="contained">Start Chat</Button>
        </DialogActions>
      </Dialog>
      
      {/* Mobile Table of Contents Drawer */}
      <Drawer
        anchor="right"
        open={tocOpen}
        onClose={() => setTocOpen(false)}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <TableOfContents color="primary" />
            Quick Navigation
          </Typography>
          <List>
            {sections.map((section, index) => (
              <ListItem key={section.id} disablePadding>
                <ListItemButton 
                  onClick={() => scrollToSection(section.id)}
                  sx={{ 
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                >
                  <Box sx={{ mr: 2, color: 'primary.main' }}>
                    {section.icon}
                  </Box>
                  <ListItemText 
                    primary={`${index + 1}. ${section.title}`}
                    sx={{ '& .MuiListItemText-primary': { fontWeight: 500 } }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default AIFeaturesPage;
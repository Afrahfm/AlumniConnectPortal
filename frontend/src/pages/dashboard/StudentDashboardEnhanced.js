import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Badge,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Drawer,
  useTheme,
  useMediaQuery,
  Switch,
  FormControlLabel,
  Slide,
  Fade,
  Zoom,
  AppBar,
  Toolbar,
  Divider,
  Stack,
  Fab,
  InputAdornment,
  ListItemIcon,
  Collapse,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip
} from '@mui/material';

import {
  VideoCall,
  Chat,
  Notifications,
  TrendingUp,
  School,
  Work,
  Star,
  Person,
  Event,
  Assessment,
  Psychology,
  EmojiEvents,
  Close,
  Menu,
  Brightness4,
  Brightness7,
  Dashboard,
  Groups,
  CalendarToday,
  Analytics,
  Settings,
  BookmarkBorder,
  Timeline,
  Explore,
  Search,
  ExitToApp,
  Business,
  ExpandLess,
  ExpandMore,
  AutoAwesome,
  Palette,
  SchoolOutlined,
  WorkOutline
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useThemeMode } from '../../context/ThemeContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import StudentChatInterface from '../../components/chat/StudentChatInterface';
import SimpleChatInterface from '../../components/chat/SimpleChatInterface';
import StudentChatSidebar from '../../components/chat/StudentChatSidebar';
import MentorMatching from '../../components/mentorship/MentorMatching';
import ProgressTracker from '../../components/mentorship/ProgressTracker';
import SessionNotes from '../../components/mentorship/SessionNotes';
import NotificationCenter from '../../components/common/NotificationCenter';
import VideoCallDialog from '../../components/meetings/VideoCallDialog';
import {
  MentorshipsDialog,
  SessionsDialog,
  MeetingsDialog,
  MessagesDialog
} from '../../components/dashboard/DetailDialogs';
import AIInsights from '../../components/ai/AIInsights';
import SmartScheduling from '../../components/ai/SmartScheduling';
import SkillGapAnalysis from '../../components/ai/SkillGapAnalysis';
import CareerRoadmap from '../../components/ai/CareerRoadmap';
import AIMentorshipCompanion from '../../components/ai/AIMentorshipCompanion';
import ProgressOutcomeTracker from '../../components/ai/ProgressOutcomeTracker';
import FeedbackMentorReassignment from '../../components/ai/FeedbackMentorReassignment';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State management
  const [darkMode, setDarkMode] = useState(false);
  const [themeMode, setThemeMode] = useState('academic');
  const { darkMode: globalDarkMode, setDarkMode: setGlobalDarkMode, themeMode: globalThemeMode, setThemeMode: setGlobalThemeMode } = useThemeMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);
  const [videoCallOpen, setVideoCallOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({
    mentorship: true,
    ai: true,
    progress: true
  });
  
  // Dialog states
  const [mentorshipsDialogOpen, setMentorshipsDialogOpen] = useState(false);
  const [sessionsDialogOpen, setSessionsDialogOpen] = useState(false);
  const [meetingsDialogOpen, setMeetingsDialogOpen] = useState(false);
  const [messagesDialogOpen, setMessagesDialogOpen] = useState(false);

  const [stats] = useState({
    activeMentorships: 2,
    completedSessions: 8,
    upcomingMeetings: 3,
    messagesUnread: 5,
  });

  // Theme configurations
  const themes = {
    academic: {
      primary: '#1976d2',
      secondary: '#dc004e',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: <SchoolOutlined />
    },
    professional: {
      primary: '#2e7d32',
      secondary: '#ed6c02',
      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      icon: <WorkOutline />
    }
  };

  const currentTheme = themes[globalThemeMode];

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/student/dashboard' },
    { text: 'Browse Alumni', icon: <Search />, path: '/browse-alumni' },
    { text: 'AI Features', icon: <Psychology />, path: '/ai-features' },
    { text: 'My Chats', icon: <Chat />, path: '/chats' },
    { text: 'Meetings', icon: <Event />, path: '/meetings' },
    { text: 'Profile', icon: <Person />, path: '/profile' },
    { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
    { text: 'Settings', icon: <Settings />, path: '/settings' }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAIFeaturesClick = () => {
    console.log('AI Features clicked - navigating to /ai-features');
    try {
      navigate('/ai-features');
      console.log('Navigation successful');
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };

  const StatCard = ({ title, value, icon, color, onClick, delay = 0 }) => (
    <Zoom in={true} style={{ transitionDelay: `${delay}ms` }}>
      <Card 
        sx={{ 
          '&:hover': { 
            transform: 'translateY(-8px) scale(1.02)', 
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: theme.shadows[8]
          },
          cursor: 'pointer',
          background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
          border: `1px solid ${color}30`,
          transition: 'all 0.3s ease'
        }}
        onClick={onClick}
      >
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h4" fontWeight="bold" color={color}>
                {value}
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
    </Zoom>
  );

  const SectionHeader = ({ title, icon, section, children }) => (
    <Card sx={{ mb: 3, overflow: 'visible' }}>
      <CardContent>
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="space-between"
          sx={{ cursor: 'pointer' }}
          onClick={() => toggleSection(section)}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Box sx={{ color: currentTheme.primary }}>
              {icon}
            </Box>
            <Typography variant="h5" fontWeight="bold">
              {title}
            </Typography>
          </Box>
          <IconButton>
            {expandedSections[section] ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <Collapse in={expandedSections[section]} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 3 }}>
            {children}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* App Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: 1201,
          background: currentTheme.background
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setSidebarOpen(true)}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            🎓 Alumni Connect Portal
          </Typography>

          {/* Theme Toggle */}
          <ToggleButtonGroup
            value={globalThemeMode}
            exclusive
            onChange={(e, newTheme) => newTheme && setGlobalThemeMode(newTheme)}
            size="small"
            sx={{ mr: 2 }}
          >
            <ToggleButton value="academic" sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
              <SchoolOutlined fontSize="small" />
            </ToggleButton>
            <ToggleButton value="professional" sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
              <WorkOutline fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>

          <FormControlLabel
            control={
              <Switch
                checked={globalDarkMode}
                onChange={(e) => setGlobalDarkMode(e.target.checked)}
                color="default"
              />
            }
            label={globalDarkMode ? <Brightness7 /> : <Brightness4 />}
            sx={{ color: 'white', mr: 2 }}
          />
          
          <NotificationCenter />
          <IconButton color="inherit" onClick={logout}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            mt: 8,
            background: globalDarkMode ? 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)' : 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)'
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Navigation
          </Typography>
          <List>
            {menuItems.map((item, index) => (
              <Slide in={true} direction="right" timeout={300 + index * 100} key={item.text}>
                <ListItem
                  button
                  onClick={() => {
                    if (item.text === 'My Chats') {
                      setChatSidebarOpen(true);
                    } else {
                      navigate(item.path);
                      setSidebarOpen(false);
                      if (isMobile) setSidebarOpen(false);
                    }
                  }}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    '&:hover': {
                      backgroundColor: currentTheme.primary + '20',
                      transform: 'translateX(8px)',
                      transition: 'all 0.3s ease'
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: currentTheme.primary }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </Slide>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          p: 3, 
          mt: 8,
          ml: sidebarOpen && !isMobile ? '280px' : 0,
          transition: 'margin-left 0.3s ease'
        }}
      >
        {/* Welcome Section */}
        <Fade in={true} timeout={800}>
          <Card sx={{ 
            mb: 4, 
            background: currentTheme.background, 
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '200px',
                height: '200px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                transform: 'translate(50%, -50%)'
              }}
            />
            <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
              <Grid container alignItems="center" spacing={3}>
                <Grid item>
                  <Avatar sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: 'rgba(255,255,255,0.2)',
                    border: '3px solid rgba(255,255,255,0.3)'
                  }}>
                    <School sx={{ fontSize: 40 }} />
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Welcome back, {user?.name}! 👋
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                    Ready to continue your mentorship journey?
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Chip
                      label="Student"
                      sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                    />
                    <Chip
                      label={globalThemeMode === 'academic' ? '🎓 Academic Mode' : '💼 Professional Mode'}
                      sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Fade>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Mentorships"
              value={stats.activeMentorships}
              icon={<Business sx={{ fontSize: 40 }} />}
              color={currentTheme.primary}
              onClick={() => setMentorshipsDialogOpen(true)}
              delay={100}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Completed Sessions"
              value={stats.completedSessions}
              icon={<VideoCall sx={{ fontSize: 40 }} />}
              color="#059669"
              onClick={() => setSessionsDialogOpen(true)}
              delay={200}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Upcoming Meetings"
              value={stats.upcomingMeetings}
              icon={<Event sx={{ fontSize: 40 }} />}
              color="#dc2626"
              onClick={() => setMeetingsDialogOpen(true)}
              delay={300}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Unread Messages"
              value={stats.messagesUnread}
              icon={<Chat sx={{ fontSize: 40 }} />}
              color="#7c3aed"
              onClick={() => setMessagesDialogOpen(true)}
              delay={400}
            />
          </Grid>
        </Grid>

        {/* Advanced Feature Sidebar */}
        <Box
          sx={{
            position: 'fixed',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1300,
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}
        >
          <Tooltip title="Overview" placement="left">
            <Fab
              size="small"
              onClick={() => setActiveTab('overview')}
              sx={{
                background: activeTab === 'overview' ? currentTheme.background : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            >
              <Dashboard sx={{ color: 'white' }} />
            </Fab>
          </Tooltip>
          
          <Tooltip title="Mentorship" placement="left">
            <Fab
              size="small"
              onClick={() => navigate('/mentorship')}
              sx={{
                background: activeTab === 'mentorship' ? currentTheme.background : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            >
              <Groups sx={{ color: 'white' }} />
            </Fab>
          </Tooltip>
          
          <Tooltip title="AI Features" placement="left">
            <Fab
              size="small"
              onClick={handleAIFeaturesClick}
              sx={{
                background: activeTab === 'ai' ? currentTheme.background : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            >
              <Psychology sx={{ color: 'white' }} />
            </Fab>
          </Tooltip>
          
          <Tooltip title="Progress" placement="left">
            <Fab
              size="small"
              onClick={() => navigate('/progress')}
              sx={{
                background: activeTab === 'progress' ? currentTheme.background : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            >
              <TrendingUp sx={{ color: 'white' }} />
            </Fab>
          </Tooltip>
          
          <Tooltip title="Messages" placement="left">
            <Fab
              size="small"
              onClick={() => setActiveTab('messages')}
              sx={{
                background: activeTab === 'messages' ? currentTheme.background : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            >
              <Badge badgeContent={stats.messagesUnread} color="error">
                <Chat sx={{ color: 'white' }} />
              </Badge>
            </Fab>
          </Tooltip>
        </Box>

        {/* Feature Panel Drawer */}
        <Drawer
          variant="temporary"
          anchor="right"
          open={activeTab === 'messages'}
          onClose={() => setActiveTab('overview')}
          sx={{
            '& .MuiDrawer-paper': {
              width: isMobile ? '100vw' : 450,
              boxSizing: 'border-box',
              mt: 8,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,240,240,0.95) 100%)',
              backdropFilter: 'blur(20px)',
              border: 'none',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            },
          }}
        >
          <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chat sx={{ color: currentTheme.primary }} /> Messages
              </Typography>
              <IconButton onClick={() => setActiveTab('overview')}>
                <Close />
              </IconButton>
            </Box>
            
            {/* Messages Panel */}
            <Box sx={{ height: 'calc(100vh - 200px)' }}>
              <SimpleChatInterface />
            </Box>
          </Box>
        </Drawer>

        {/* Overview Content - Always Visible */}
        <Grid container spacing={3} sx={{ height: 'calc(100vh - 280px)', overflow: 'auto' }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AutoAwesome sx={{ color: currentTheme.primary }} />
                  Quick Actions
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6} md={2.4}>
                    <Button fullWidth variant="contained" startIcon={<Search />} onClick={() => navigate('/browse-alumni')} sx={{ py: 1.5, background: currentTheme.background }}>
                      Find Mentors
                    </Button>
                  </Grid>
                  <Grid item xs={6} md={2.4}>
                    <Button fullWidth variant="contained" startIcon={<Psychology />} onClick={handleAIFeaturesClick} sx={{ py: 1.5, background: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)' }}>
                      AI Features
                    </Button>
                  </Grid>
                  <Grid item xs={6} md={2.4}>
                    <Button fullWidth variant="outlined" startIcon={<VideoCall />} onClick={() => setVideoCallOpen(true)} sx={{ py: 1.5 }}>
                      Video Call
                    </Button>
                  </Grid>
                  <Grid item xs={6} md={2.4}>
                    <Button fullWidth variant="outlined" startIcon={<Chat />} onClick={() => setActiveTab('messages')} sx={{ py: 1.5 }}>
                      Messages
                    </Button>
                  </Grid>
                  <Grid item xs={6} md={2.4}>
                    <Button fullWidth variant="outlined" startIcon={<CalendarToday />} onClick={() => navigate('/meetings')} sx={{ py: 1.5 }}>
                      Schedule
                    </Button>
                  </Grid>
                </Grid>
                <Typography variant="h6" gutterBottom>Recent Activity</Typography>
                <List dense>
                  <ListItem><ListItemText primary="Meeting with John Doe completed" secondary="2 hours ago" /></ListItem>
                  <ListItem><ListItemText primary="New message from Sarah Wilson" secondary="1 day ago" /></ListItem>
                  <ListItem><ListItemText primary="Upcoming session in 2 hours" secondary="Today" /></ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Upcoming Events</Typography>
                <List dense>
                  <ListItem>
                    <ListItemAvatar><Avatar><Event /></Avatar></ListItemAvatar>
                    <ListItemText primary="Career Guidance" secondary="Today 3:00 PM" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar><Avatar><VideoCall /></Avatar></ListItemAvatar>
                    <ListItemText primary="Code Review" secondary="Tomorrow 10:00 AM" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Chat Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: isMobile ? '100vw' : 800,
            boxSizing: 'border-box',
            mt: 8
          },
        }}
      >
        <SimpleChatInterface onClose={() => setChatOpen(false)} />
      </Drawer>

      {/* Chat FAB */}
      <Zoom in={!chatOpen} timeout={300}>
        <Fab
          color="primary"
          sx={{ 
            position: 'fixed', 
            bottom: 24, 
            right: 24, 
            zIndex: 1200,
            background: currentTheme.background,
            '&:hover': { 
              transform: 'scale(1.1)',
              transition: 'all 0.3s ease'
            }
          }}
          onClick={() => setChatOpen(true)}
        >
          <Badge badgeContent={stats.messagesUnread} color="error">
            <Chat />
          </Badge>
        </Fab>
      </Zoom>

      {/* Video Call Dialog */}
      <VideoCallDialog
        open={videoCallOpen}
        onClose={() => setVideoCallOpen(false)}
        recipientName={selectedMentor}
      />

      {/* Detail Dialogs */}
      <MentorshipsDialog
        open={mentorshipsDialogOpen}
        onClose={() => setMentorshipsDialogOpen(false)}
      />
      <SessionsDialog
        open={sessionsDialogOpen}
        onClose={() => setSessionsDialogOpen(false)}
      />
      <MeetingsDialog
        open={meetingsDialogOpen}
        onClose={() => setMeetingsDialogOpen(false)}
      />
      <MessagesDialog
        open={messagesDialogOpen}
        onClose={() => setMessagesDialogOpen(false)}
      />
    </Box>
  );
};

export default StudentDashboard;
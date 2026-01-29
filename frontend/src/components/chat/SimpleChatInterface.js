import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  InputAdornment,
  Divider,
  Badge,
  Fab,
  Slide,
  Fade,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Send,
  Search,
  Close,
  VideoCall,
  Phone,
  MoreVert,
  EmojiEmotions,
  AttachFile,
  ArrowBack,
  Online,
  Schedule
} from '@mui/icons-material';
import { chatService } from '../../services/chatService';

const SimpleChatInterface = ({ onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoCallOpen, setVideoCallOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const mentors = [
    { 
      id: 1,
      name: 'Dr. Sarah Wilson', 
      role: 'Senior Product Manager', 
      status: 'online', 
      expertise: 'Strategy, Leadership, Product Development',
      avatar: '/avatars/sarah.jpg',
      lastMessage: 'Great progress on your project!',
      lastMessageTime: '2 min ago',
      unreadCount: 2
    },
    { 
      id: 2,
      name: 'John Doe', 
      role: 'Software Engineer', 
      status: 'online', 
      expertise: 'React, Node.js, System Design',
      avatar: '/avatars/john.jpg',
      lastMessage: 'Let\'s schedule a code review session',
      lastMessageTime: '1 hour ago',
      unreadCount: 0
    },
    { 
      id: 3,
      name: 'Emily Chen', 
      role: 'UX Designer', 
      status: 'away', 
      expertise: 'Design Systems, User Research',
      avatar: '/avatars/emily.jpg',
      lastMessage: 'I\'ll review your wireframes tomorrow',
      lastMessageTime: '3 hours ago',
      unreadCount: 1
    },
    { 
      id: 4,
      name: 'Mike Johnson', 
      role: 'Data Scientist', 
      status: 'offline', 
      expertise: 'Python, Machine Learning, Analytics',
      avatar: '/avatars/mike.jpg',
      lastMessage: 'Check out this ML course I recommended',
      lastMessageTime: '1 day ago',
      unreadCount: 0
    }
  ];

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.expertise.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (selectedMentor) {
      loadMessages(selectedMentor.id);
    }
  }, [selectedMentor]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async (mentorId) => {
    setLoading(true);
    try {
      const mockMessages = [
        {
          id: 1,
          senderId: mentorId,
          senderName: selectedMentor?.name,
          message: "Hi! How's your project coming along?",
          timestamp: new Date(Date.now() - 3600000),
          type: 'received'
        },
        {
          id: 2,
          senderId: 'current-user',
          senderName: 'You',
          message: "It's going well! I've implemented the user authentication feature.",
          timestamp: new Date(Date.now() - 3000000),
          type: 'sent'
        },
        {
          id: 3,
          senderId: mentorId,
          senderName: selectedMentor?.name,
          message: "That's great! Would you like to schedule a code review session?",
          timestamp: new Date(Date.now() - 1800000),
          type: 'received'
        }
      ];
      setMessages(mockMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedMentor) return;

    const message = {
      id: Date.now(),
      senderId: 'current-user',
      senderName: 'You',
      message: newMessage,
      timestamp: new Date(),
      type: 'sent'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate mentor response
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        senderId: selectedMentor.id,
        senderName: selectedMentor.name,
        message: "Thanks for the update! I'll review this and get back to you.",
        timestamp: new Date(),
        type: 'received'
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#4caf50';
      case 'away': return '#ff9800';
      case 'offline': return '#9e9e9e';
      default: return '#9e9e9e';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isMobile && selectedMentor) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Mobile Chat Header */}
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setSelectedMentor(null)}>
              <ArrowBack />
            </IconButton>
            <Avatar sx={{ mx: 2 }}>
              {selectedMentor.name[0]}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{selectedMentor.name}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {selectedMentor.status}
              </Typography>
            </Box>
            <IconButton color="inherit" onClick={() => setVideoCallOpen(true)}>
              <VideoCall />
            </IconButton>
            <IconButton color="inherit" onClick={onClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Messages */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 2, bgcolor: 'background.default' }}>
          {messages.map((message, index) => (
            <Fade in={true} timeout={300} key={message.id}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: message.type === 'sent' ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: '80%',
                    bgcolor: message.type === 'sent' ? 'primary.main' : 'background.paper',
                    color: message.type === 'sent' ? 'white' : 'text.primary',
                    borderRadius: message.type === 'sent' ? '20px 20px 5px 20px' : '20px 20px 20px 5px'
                  }}
                >
                  <Typography variant="body1">{message.message}</Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      opacity: 0.7, 
                      display: 'block', 
                      textAlign: 'right', 
                      mt: 1 
                    }}
                  >
                    {formatTime(message.timestamp)}
                  </Typography>
                </Paper>
              </Box>
            </Fade>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        {/* Message Input */}
        <Paper sx={{ p: 2, borderRadius: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small">
              <AttachFile />
            </IconButton>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '25px'
                }
              }}
            />
            <IconButton size="small">
              <EmojiEmotions />
            </IconButton>
            <IconButton 
              color="primary" 
              onClick={sendMessage}
              disabled={!newMessage.trim()}
            >
              <Send />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex' }}>
      {/* Mentors List */}
      <Box sx={{ 
        width: isMobile ? '100%' : 350, 
        borderRight: !isMobile ? 1 : 0, 
        borderColor: 'divider', 
        display: 'flex', 
        flexDirection: 'column',
        display: selectedMentor && isMobile ? 'none' : 'flex'
      }}>
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">Messages</Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
          <TextField
            size="small"
            placeholder="Search mentors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            sx={{ 
              width: '100%',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px'
              }
            }}
          />
        </Box>

        {/* Mentors List */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <List sx={{ p: 0 }}>
            {filteredMentors.map((mentor, index) => (
              <Slide in={true} direction="right" timeout={300 + index * 100} key={mentor.id}>
                <ListItem 
                  button
                  selected={selectedMentor?.id === mentor.id}
                  onClick={() => setSelectedMentor(mentor)}
                  sx={{ 
                    borderBottom: 1, 
                    borderColor: 'divider',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      transform: 'translateX(4px)',
                      transition: 'all 0.3s ease'
                    },
                    '&.Mui-selected': {
                      bgcolor: 'primary.light',
                      '&:hover': {
                        bgcolor: 'primary.light'
                      }
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: getStatusColor(mentor.status),
                            border: '2px solid white'
                          }}
                        />
                      }
                    >
                      <Avatar>{mentor.name[0]}</Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {mentor.name}
                        </Typography>
                        {mentor.unreadCount > 0 && (
                          <Badge badgeContent={mentor.unreadCount} color="primary" />
                        )}
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="caption" display="block" color="text.secondary">
                          {mentor.role}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                          {mentor.lastMessage}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {mentor.lastMessageTime}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </Slide>
            ))}
          </List>
        </Box>
      </Box>
      
      {/* Chat Interface */}
      {selectedMentor ? (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar>{selectedMentor.name[0]}</Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {selectedMentor.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: getStatusColor(selectedMentor.status)
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {selectedMentor.status}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
                <IconButton onClick={() => setVideoCallOpen(true)}>
                  <VideoCall />
                </IconButton>
                <IconButton>
                  <Phone />
                </IconButton>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Messages */}
          <Box sx={{ flex: 1, overflow: 'auto', p: 2, bgcolor: 'grey.50' }}>
            {messages.map((message, index) => (
              <Fade in={true} timeout={300} key={message.id}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: message.type === 'sent' ? 'flex-end' : 'flex-start',
                    mb: 2
                  }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      maxWidth: '70%',
                      bgcolor: message.type === 'sent' ? 'primary.main' : 'white',
                      color: message.type === 'sent' ? 'white' : 'text.primary',
                      borderRadius: message.type === 'sent' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                      boxShadow: theme.shadows[2]
                    }}
                  >
                    <Typography variant="body1">{message.message}</Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        opacity: 0.7, 
                        display: 'block', 
                        textAlign: 'right', 
                        mt: 1 
                      }}
                    >
                      {formatTime(message.timestamp)}
                    </Typography>
                  </Paper>
                </Box>
              </Fade>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          {/* Message Input */}
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton size="small">
                <AttachFile />
              </IconButton>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '25px'
                  }
                }}
              />
              <IconButton size="small">
                <EmojiEmotions />
              </IconButton>
              <IconButton 
                color="primary" 
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  }
                }}
              >
                <Send />
              </IconButton>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2
        }}>
          <Typography variant="h5" color="text.secondary">
            Select a mentor to start chatting
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Choose from your mentors list to begin a conversation
          </Typography>
        </Box>
      )}

      {/* Video Call Dialog */}
      <Dialog
        open={videoCallOpen}
        onClose={() => setVideoCallOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Start Video Call</DialogTitle>
        <DialogContent>
          <Typography>
            Start a video call with {selectedMentor?.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVideoCallOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setVideoCallOpen(false)}>
            Start Call
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SimpleChatInterface;
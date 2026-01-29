import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  AppBar,
  Toolbar,
  InputAdornment,
  Chip
} from '@mui/material';
import {
  ArrowBack,
  Send,
  AttachFile,
  EmojiEmotions,
  Circle
} from '@mui/icons-material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ChatInterface = () => {
  const { mentorshipId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [mentor, setMentor] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchChatData();
  }, [mentorshipId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatData = () => {
    // Mock data based on mentorshipId
    const mentorData = {
      1: {
        name: 'John Doe',
        avatar: 'JD',
        role: 'Senior Software Engineer',
        company: 'Google',
        isOnline: true
      },
      2: {
        name: 'Jane Smith',
        avatar: 'JS',
        role: 'Product Manager',
        company: 'Microsoft',
        isOnline: false
      },
      3: {
        name: 'Mike Johnson',
        avatar: 'MJ',
        role: 'Data Scientist',
        company: 'Amazon',
        isOnline: true
      }
    };

    const chatMessages = {
      1: [
        {
          id: 1,
          senderId: 'mentor',
          message: 'Hi! How are you doing with the React project?',
          timestamp: '10:30 AM',
          date: 'Today'
        },
        {
          id: 2,
          senderId: 'student',
          message: 'Hi John! I\'m making good progress. Just finished the component structure.',
          timestamp: '10:32 AM',
          date: 'Today'
        },
        {
          id: 3,
          senderId: 'mentor',
          message: 'That\'s great! Have you considered using React hooks for state management?',
          timestamp: '10:35 AM',
          date: 'Today'
        },
        {
          id: 4,
          senderId: 'student',
          message: 'Yes, I\'m using useState and useEffect. Should I also look into useContext?',
          timestamp: '10:37 AM',
          date: 'Today'
        },
        {
          id: 5,
          senderId: 'mentor',
          message: 'Absolutely! useContext is perfect for managing global state. Let me share some resources.',
          timestamp: '10:40 AM',
          date: 'Today'
        }
      ],
      2: [
        {
          id: 1,
          senderId: 'mentor',
          message: 'Let me know if you need any help with the project requirements.',
          timestamp: '2:15 PM',
          date: 'Yesterday'
        },
        {
          id: 2,
          senderId: 'student',
          message: 'Thank you Jane! I\'ll reach out if I have questions.',
          timestamp: '2:20 PM',
          date: 'Yesterday'
        }
      ],
      3: [
        {
          id: 1,
          senderId: 'mentor',
          message: 'Great progress on your resume! The technical skills section looks much better now.',
          timestamp: '9:00 AM',
          date: 'Today'
        },
        {
          id: 2,
          senderId: 'student',
          message: 'Thanks Mike! Your feedback really helped me highlight my projects better.',
          timestamp: '9:05 AM',
          date: 'Today'
        }
      ]
    };

    setMentor(mentorData[mentorshipId] || mentorData[1]);
    setMessages(chatMessages[mentorshipId] || chatMessages[1]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        senderId: 'student',
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: 'Today'
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate mentor response
      setTimeout(() => {
        const mentorResponse = {
          id: messages.length + 2,
          senderId: 'mentor',
          message: 'Thanks for sharing! I\'ll review this and get back to you.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: 'Today'
        };
        setMessages(prev => [...prev, mentorResponse]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Chat Header */}
      <AppBar position="static" sx={{ bgcolor: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton onClick={() => {
            if (location.state?.returnTo === 'my-chats') {
              navigate('/student/dashboard', { state: { activeSection: 'my-chats' } });
            } else if (location.state?.returnTo === 'my-mentorships') {
              navigate('/student/dashboard', { state: { activeSection: 'my-mentorships' } });
            } else {
              navigate('/student/dashboard', { state: { activeSection: 'my-chats' } });
            }
          }} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Box sx={{ position: 'relative', mr: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {mentor?.avatar}
            </Avatar>
            {mentor?.isOnline && (
              <Circle
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  fontSize: 12,
                  color: 'success.main'
                }}
              />
            )}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{mentor?.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {mentor?.role} at {mentor?.company} • {mentor?.isOnline ? 'Online' : 'Last seen 2h ago'}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Messages Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          bgcolor: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              justifyContent: msg.senderId === 'student' ? 'flex-end' : 'flex-start',
              mb: 1
            }}
          >
            <Paper
              sx={{
                p: 2,
                maxWidth: '70%',
                bgcolor: msg.senderId === 'student' ? 'primary.main' : 'white',
                color: msg.senderId === 'student' ? 'white' : 'text.primary',
                borderRadius: msg.senderId === 'student' ? '18px 18px 4px 18px' : '18px 18px 18px 4px'
              }}
            >
              <Typography variant="body1">{msg.message}</Typography>
              <Typography
                variant="caption"
                sx={{
                  opacity: 0.7,
                  display: 'block',
                  textAlign: 'right',
                  mt: 0.5
                }}
              >
                {msg.timestamp}
              </Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Message Input */}
      <Paper
        sx={{
          p: 2,
          borderTop: '1px solid #e0e0e0',
          bgcolor: 'white'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 25,
                bgcolor: '#f5f5f5'
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small">
                    <AttachFile />
                  </IconButton>
                  <IconButton size="small">
                    <EmojiEmotions />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <IconButton
            onClick={sendMessage}
            disabled={!message.trim()}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
              '&:disabled': { bgcolor: 'grey.300' }
            }}
          >
            <Send />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatInterface;
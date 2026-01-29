import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import { Send, Close } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { socketService } from '../../services/socketService';

const VideoCallChat = ({ meetingId, onClose, participants = [] }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load existing messages
    loadMessages();
    scrollToBottom();
    
    // Connect to socket and join meeting room
    if (user?.id) {
      socketService.connect(user.id);
      socketService.joinMeetingRoom(meetingId);
      
      // Listen for new messages
      socketService.onMeetingMessage((message) => {
        setMessages(prev => [...prev, message]);
      });
    }
    
    return () => {
      socketService.leaveMeetingRoom(meetingId);
      socketService.offMeetingMessage();
    };
  }, [meetingId, user?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = () => {
    // Mock messages for demo
    setMessages([
      {
        id: 1,
        senderId: 'user1',
        senderName: 'John Doe',
        message: 'Hi! Ready to start our session?',
        timestamp: new Date(Date.now() - 300000),
        type: 'text'
      },
      {
        id: 2,
        senderId: user?.id,
        senderName: user?.firstName + ' ' + user?.lastName,
        message: 'Yes, looking forward to it!',
        timestamp: new Date(Date.now() - 240000),
        type: 'text'
      }
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      senderId: user?.id,
      senderName: user?.firstName + ' ' + user?.lastName,
      message: newMessage.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Send message via socket
    socketService.sendMeetingMessage(meetingId, message);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const isOwnMessage = (senderId) => senderId === user?.id;

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        maxHeight: '600px'
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        borderBottom: 1, 
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6">Chat</Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </Box>

      {/* Participants */}
      <Box sx={{ p: 1, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {participants.map((participant, index) => (
            <Chip
              key={index}
              avatar={<Avatar sx={{ width: 24, height: 24 }}>{participant.name[0]}</Avatar>}
              label={participant.name}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      </Box>

      {/* Messages */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        p: 1
      }}>
        <List sx={{ p: 0 }}>
          {messages.map((msg) => (
            <ListItem
              key={msg.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isOwnMessage(msg.senderId) ? 'flex-end' : 'flex-start',
                p: 0.5
              }}
            >
              <Box
                sx={{
                  maxWidth: '80%',
                  bgcolor: isOwnMessage(msg.senderId) ? 'primary.main' : 'grey.100',
                  color: isOwnMessage(msg.senderId) ? 'white' : 'text.primary',
                  borderRadius: 2,
                  p: 1.5,
                  mb: 0.5
                }}
              >
                <Typography variant="body2">{msg.message}</Typography>
              </Box>
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ px: 1 }}
              >
                {!isOwnMessage(msg.senderId) && `${msg.senderName} • `}
                {formatTime(msg.timestamp)}
              </Typography>
            </ListItem>
          ))}
        </List>
        <div ref={messagesEndRef} />
      </Box>

      {/* Message Input */}
      <Box sx={{ 
        p: 2, 
        borderTop: 1, 
        borderColor: 'divider',
        display: 'flex',
        gap: 1
      }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={3}
        />
        <IconButton 
          onClick={sendMessage}
          disabled={!newMessage.trim()}
          color="primary"
        >
          <Send />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default VideoCallChat;
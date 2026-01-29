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
  Chip
} from '@mui/material';
import { Send, Close } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const ChatBox = ({ isOpen, onClose, recipientId, recipientName }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: user.name,
        timestamp: new Date(),
        isOwn: true
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 350,
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1300
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          bgcolor: 'primary.main',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6">{recipientName}</Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
        <List>
          {messages.map((message) => (
            <ListItem
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: message.isOwn ? 'flex-end' : 'flex-start',
                mb: 1
              }}
            >
              <Box
                sx={{
                  maxWidth: '70%',
                  display: 'flex',
                  flexDirection: message.isOwn ? 'row-reverse' : 'row',
                  alignItems: 'flex-end',
                  gap: 1
                }}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {message.sender ? message.sender[0] : 'U'}
                </Avatar>
                <Box>
                  <Paper
                    sx={{
                      p: 1,
                      bgcolor: message.isOwn ? 'primary.main' : 'grey.200',
                      color: message.isOwn ? 'white' : 'text.primary'
                    }}
                  >
                    <Typography variant="body2">{message.text}</Typography>
                  </Paper>
                  <Typography variant="caption" color="text.secondary">
                    {message.timestamp ? message.timestamp.toLocaleTimeString() : ''}
                  </Typography>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
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
          <IconButton onClick={handleSendMessage} color="primary">
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default ChatBox;
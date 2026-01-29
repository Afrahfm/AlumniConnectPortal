import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Badge
} from '@mui/material';
import { Send, ArrowBack } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { socketService } from '../../services/socketService';

const StudentChatSidebar = ({ onBack }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadConversations();
    if (user?.id) {
      socketService.connect(user.id);
      socketService.onMessage(handleNewMessage);
    }
    return () => socketService.disconnect();
  }, [user?.id]);

  useEffect(() => {
    if (selectedChat) {
      loadMessages(selectedChat.id);
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConversations = () => {
    const mockConversations = [
      {
        id: 1,
        participant: { name: 'John Doe', role: 'Software Engineer' },
        lastMessage: { content: 'Thanks for the advice!', timestamp: new Date(Date.now() - 3600000) },
        unreadCount: 0
      },
      {
        id: 2,
        participant: { name: 'Sarah Wilson', role: 'Product Manager' },
        lastMessage: { content: 'Looking forward to our meeting', timestamp: new Date(Date.now() - 7200000) },
        unreadCount: 2
      },
      {
        id: 3,
        participant: { name: 'Mike Johnson', role: 'Data Scientist' },
        lastMessage: { content: 'Great question about ML!', timestamp: new Date(Date.now() - 10800000) },
        unreadCount: 1
      }
    ];
    setConversations(mockConversations);
  };

  const loadMessages = (chatId) => {
    const mockMessages = {
      1: [
        { id: 1, senderId: 1, content: 'Hi! How can I help you today?', timestamp: new Date(Date.now() - 3600000) },
        { id: 2, senderId: user?.id, content: 'I need advice on career paths', timestamp: new Date(Date.now() - 3000000) }
      ],
      2: [
        { id: 3, senderId: 2, content: 'Product management is exciting!', timestamp: new Date(Date.now() - 7200000) },
        { id: 4, senderId: user?.id, content: 'How did you transition to PM?', timestamp: new Date(Date.now() - 6600000) }
      ],
      3: [
        { id: 5, senderId: 3, content: 'Machine learning has many applications', timestamp: new Date(Date.now() - 10800000) }
      ]
    };
    setMessages(mockMessages[chatId] || []);
  };

  const handleNewMessage = (message) => {
    if (selectedChat && message.chatId === selectedChat.id) {
      setMessages(prev => [...prev, message]);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message = {
      id: Date.now(),
      senderId: user?.id,
      content: newMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    socketService.sendMessage(selectedChat.id, message);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (selectedChat) {
    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Chat Header */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="small" onClick={() => setSelectedChat(null)}>
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography variant="subtitle2">{selectedChat.participant.name}</Typography>
            <Typography variant="caption" color="text.secondary">{selectedChat.participant.role}</Typography>
          </Box>
        </Box>

        {/* Messages */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: message.senderId === user?.id ? 'flex-end' : 'flex-start',
                mb: 1
              }}
            >
              <Box
                sx={{
                  maxWidth: '80%',
                  bgcolor: message.senderId === user?.id ? 'primary.main' : 'grey.100',
                  color: message.senderId === user?.id ? 'white' : 'text.primary',
                  borderRadius: 2,
                  p: 1,
                  fontSize: '0.8rem'
                }}
              >
                {message.content}
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', mt: 0.5 }}>
                {formatTime(message.timestamp)}
              </Typography>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        {/* Message Input */}
        <Box sx={{ p: 1, borderTop: 1, borderColor: 'divider', display: 'flex', gap: 1 }}>
          <TextField
            size="small"
            placeholder="Type..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            sx={{ flex: 1, '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
          />
          <IconButton onClick={sendMessage} disabled={!newMessage.trim()} size="small">
            <Send />
          </IconButton>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Messages</Typography>
        <IconButton size="small" onClick={onBack}>
          <ArrowBack />
        </IconButton>
      </Box>

      {/* Conversations List */}
      <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
        {conversations.map((conversation) => (
          <ListItem
            key={conversation.id}
            button
            onClick={() => setSelectedChat(conversation)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <ListItemAvatar>
              <Badge badgeContent={conversation.unreadCount} color="error">
                <Avatar sx={{ width: 32, height: 32 }}>
                  {conversation.participant.name[0]}
                </Avatar>
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="body2" noWrap sx={{ fontSize: '0.85rem' }}>
                  {conversation.participant.name}
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="caption" display="block" color="text.secondary">
                    {conversation.participant.role}
                  </Typography>
                  <Typography variant="caption" noWrap color="text.secondary">
                    {conversation.lastMessage.content}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default StudentChatSidebar;
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
  IconButton,
  TextField,
  Divider,
  Collapse
} from '@mui/material';
import { Chat, Send, ExpandMore, ExpandLess } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { chatService } from '../../services/chatService';
import { socketService } from '../../services/socketService';

const ChatSidebar = ({ isOpen, onToggle }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (user?.id) {
      loadConversations();
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

  const loadConversations = async () => {
    try {
      const data = await chatService.getConversations(user.id);
      setConversations(data);
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const loadMessages = async (chatId) => {
    try {
      const data = await chatService.getMessages(chatId);
      setMessages(data.content || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleNewMessage = (message) => {
    if (selectedChat && message.chatId === selectedChat.id) {
      setMessages(prev => [...prev, message]);
    }
    updateConversationLastMessage(message.chatId, message);
  };

  const updateConversationLastMessage = (chatId, message) => {
    setConversations(prev => prev.map(conv => 
      conv.id === chatId 
        ? { ...conv, lastMessage: message, unreadCount: conv.id === selectedChat?.id ? 0 : conv.unreadCount + 1 }
        : conv
    ));
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message = {
      id: Date.now(),
      senderId: user.id,
      senderName: user.firstName + ' ' + user.lastName,
      content: newMessage.trim(),
      timestamp: new Date(),
      type: 'TEXT'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    try {
      await chatService.sendMessage(selectedChat.id, message.content);
      socketService.sendMessage(selectedChat.id, message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const getOtherParticipant = (conversation) => {
    return conversation.participants.find(p => p.id !== user.id);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        right: 16,
        top: 80,
        width: isOpen ? 280 : 60,
        height: isOpen ? 400 : 60,
        transition: 'all 0.3s ease',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 1.5,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'primary.main',
          color: 'white',
          minHeight: 48
        }}
      >
        {isOpen && (
          <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
            Messages
          </Typography>
        )}
        <IconButton onClick={onToggle} sx={{ color: 'white' }}>
          {isOpen ? <ExpandMore /> : <Chat />}
        </IconButton>
      </Box>

      <Collapse in={isOpen} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Conversations List */}
        <Box sx={{ height: selectedChat ? 160 : 320, overflow: 'auto' }}>
          <List sx={{ p: 0 }}>
            {conversations.map((conversation) => {
              const otherParticipant = getOtherParticipant(conversation);
              return (
                <ListItem
                  key={conversation.id}
                  button
                  selected={selectedChat?.id === conversation.id}
                  onClick={() => setSelectedChat(conversation)}
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    '&.Mui-selected': {
                      bgcolor: 'primary.light'
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Badge badgeContent={conversation.unreadCount} color="error">
                      <Avatar sx={{ width: 28, height: 28, fontSize: '0.8rem' }}>
                        {otherParticipant?.firstName[0]}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" noWrap sx={{ fontSize: '0.8rem' }}>
                        {otherParticipant?.firstName} {otherParticipant?.lastName}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" noWrap color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                        {conversation.lastMessage?.content}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>

        {/* Chat Messages */}
        {selectedChat && (
          <>
            <Divider />
            <Box sx={{ height: 160, display: 'flex', flexDirection: 'column' }}>
              {/* Chat Header */}
              <Box sx={{ p: 0.5, borderBottom: 1, borderColor: 'divider', minHeight: 32 }}>
                <Typography variant="subtitle2" sx={{ fontSize: '0.8rem' }}>
                  {(() => {
                    const otherParticipant = getOtherParticipant(selectedChat);
                    return `${otherParticipant?.firstName} ${otherParticipant?.lastName}`;
                  })()}
                </Typography>
              </Box>

              {/* Messages */}
              <Box sx={{ height: 80, overflow: 'auto', p: 0.5 }}>
                {messages.slice(-3).map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: message.senderId === user.id ? 'flex-end' : 'flex-start',
                      mb: 1
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: '85%',
                        bgcolor: message.senderId === user.id ? 'primary.main' : 'grey.100',
                        color: message.senderId === user.id ? 'white' : 'text.primary',
                        borderRadius: 1.5,
                        p: 0.5,
                        fontSize: '0.7rem',
                        lineHeight: 1.2
                      }}
                    >
                      {message.content}
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                      {formatTime(message.timestamp)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Message Input */}
              <Box sx={{ p: 0.5, borderTop: 1, borderColor: 'divider', display: 'flex', gap: 0.5 }}>
                <TextField
                  size="small"
                  placeholder="Type..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  sx={{ 
                    flex: 1,
                    '& .MuiInputBase-input': {
                      fontSize: '0.8rem',
                      py: 0.5
                    }
                  }}
                />
                <IconButton onClick={sendMessage} disabled={!newMessage.trim()} size="small" sx={{ p: 0.5 }}>
                  <Send />
                </IconButton>
              </Box>
            </Box>
          </>
        )}
      </Collapse>
    </Paper>
  );
};

export default ChatSidebar;
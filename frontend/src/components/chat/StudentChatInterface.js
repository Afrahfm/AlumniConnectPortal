import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  InputAdornment
} from '@mui/material';
import { Send, Search } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { socketService } from '../../services/socketService';

const StudentChatInterface = ({ selectedMentor }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
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
    if (selectedMentor && conversations.length > 0) {
      const mentorChat = conversations.find(conv => 
        conv.participants.some(p => p.name === selectedMentor)
      );
      if (mentorChat) {
        setSelectedChat(mentorChat);
        loadMessages(mentorChat.id);
      }
    }
  }, [selectedMentor, conversations]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConversations = () => {
    const mockConversations = [
      {
        id: 1,
        participants: [
          { id: 1, name: 'John Doe', role: 'Software Engineer' },
          { id: user?.id, name: user?.firstName + ' ' + user?.lastName, role: 'Student' }
        ],
        lastMessage: {
          content: 'Thanks for the career advice!',
          timestamp: new Date(Date.now() - 3600000),
          senderId: user?.id
        },
        unreadCount: 0
      },
      {
        id: 2,
        participants: [
          { id: 2, name: 'Sarah Wilson', role: 'Product Manager' },
          { id: user?.id, name: user?.firstName + ' ' + user?.lastName, role: 'Student' }
        ],
        lastMessage: {
          content: 'Looking forward to our meeting tomorrow',
          timestamp: new Date(Date.now() - 7200000),
          senderId: 2
        },
        unreadCount: 2
      },
      {
        id: 3,
        participants: [
          { id: 3, name: 'Mike Johnson', role: 'Data Scientist' },
          { id: user?.id, name: user?.firstName + ' ' + user?.lastName, role: 'Student' }
        ],
        lastMessage: {
          content: 'Great question about machine learning!',
          timestamp: new Date(Date.now() - 10800000),
          senderId: 3
        },
        unreadCount: 0
      },
      {
        id: 4,
        participants: [
          { id: 4, name: 'Emily Chen', role: 'UX Designer' },
          { id: user?.id, name: user?.firstName + ' ' + user?.lastName, role: 'Student' }
        ],
        lastMessage: {
          content: 'Here are some design resources for you',
          timestamp: new Date(Date.now() - 14400000),
          senderId: 4
        },
        unreadCount: 1
      }
    ];
    setConversations(mockConversations);
  };

  const loadMessages = (chatId) => {
    const mockMessages = {
      1: [
        {
          id: 1,
          senderId: 1,
          senderName: 'John Doe',
          content: 'Hi! I saw your mentorship request. I\'d be happy to help with your career questions.',
          timestamp: new Date(Date.now() - 86400000)
        },
        {
          id: 2,
          senderId: user?.id,
          senderName: user?.firstName + ' ' + user?.lastName,
          content: 'Thank you so much! I\'m particularly interested in software engineering roles.',
          timestamp: new Date(Date.now() - 82800000)
        },
        {
          id: 3,
          senderId: 1,
          senderName: 'John Doe',
          content: 'Great! I\'ve been in the industry for 8 years. What specific areas would you like to discuss?',
          timestamp: new Date(Date.now() - 79200000)
        }
      ],
      2: [
        {
          id: 4,
          senderId: 2,
          senderName: 'Sarah Wilson',
          content: 'Hello! I\'d love to share my experience in product management with you.',
          timestamp: new Date(Date.now() - 43200000)
        },
        {
          id: 5,
          senderId: user?.id,
          senderName: user?.firstName + ' ' + user?.lastName,
          content: 'That would be amazing! I\'m trying to understand the transition from technical to product roles.',
          timestamp: new Date(Date.now() - 39600000)
        }
      ],
      3: [
        {
          id: 6,
          senderId: 3,
          senderName: 'Mike Johnson',
          content: 'Data science is a fascinating field! What aspects interest you most?',
          timestamp: new Date(Date.now() - 21600000)
        }
      ],
      4: [
        {
          id: 7,
          senderId: 4,
          senderName: 'Emily Chen',
          content: 'UX design combines creativity with user psychology. Are you interested in learning more?',
          timestamp: new Date(Date.now() - 18000000)
        }
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
      senderName: user?.firstName + ' ' + user?.lastName,
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getOtherParticipant = (conversation) => {
    return conversation.participants.find(p => p.id !== user?.id);
  };

  const filteredConversations = conversations.filter(conv => {
    const otherParticipant = getOtherParticipant(conv);
    return otherParticipant?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           otherParticipant?.role.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Box sx={{ height: '100%', display: 'flex' }}>
      {/* Conversations List */}
      <Box sx={{ width: 300, borderRight: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom>Conversations</Typography>
          <TextField
            size="small"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            sx={{ width: '100%' }}
          />
        </Box>
        
        <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
          {filteredConversations.map((conversation) => {
            const otherParticipant = getOtherParticipant(conversation);
            return (
              <ListItem
                key={conversation.id}
                button
                selected={selectedChat?.id === conversation.id}
                onClick={() => {
                  setSelectedChat(conversation);
                  loadMessages(conversation.id);
                }}
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  '&.Mui-selected': {
                    bgcolor: 'primary.light'
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar>{otherParticipant?.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={otherParticipant?.name}
                  secondary={
                    <>
                      <Typography variant="caption" display="block">{otherParticipant?.role}</Typography>
                      <Typography variant="caption" color="text.secondary" noWrap>
                        {conversation.lastMessage?.content}
                      </Typography>
                    </>
                  }
                />
                {conversation.unreadCount > 0 && (
                  <Box sx={{ 
                    bgcolor: 'error.main', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: 20, 
                    height: 20, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '0.75rem'
                  }}>
                    {conversation.unreadCount}
                  </Box>
                )}
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Chat Messages */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6">
                {getOtherParticipant(selectedChat)?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {getOtherParticipant(selectedChat)?.role}
              </Typography>
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
                    mb: 2
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      bgcolor: message.senderId === user?.id ? 'primary.main' : 'grey.100',
                      color: message.senderId === user?.id ? 'white' : 'text.primary',
                      borderRadius: 2,
                      p: 1.5
                    }}
                  >
                    <Typography variant="body2">{message.content}</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, px: 1 }}>
                    {formatTime(message.timestamp)}
                  </Typography>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            {/* Message Input */}
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                multiline
                maxRows={3}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        color="primary"
                      >
                        <Send />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          </>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%' 
          }}>
            <Typography variant="h6" color="text.secondary">
              Select a conversation to start chatting
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StudentChatInterface;
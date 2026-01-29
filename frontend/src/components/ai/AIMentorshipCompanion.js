import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  IconButton,
  Paper
} from '@mui/material';
import {
  Psychology,
  Send,
  Lightbulb,
  TrendingUp,
  School,
  SmartToy
} from '@mui/icons-material';

const AIMentorshipCompanion = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: 'ai',
      message: "Hi! I'm your AI Mentorship Companion. I can help you with career advice, skill development, and connecting with the right mentors. What would you like to discuss today?",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      type: 'user',
      message: "I'm struggling with React hooks. Can you help me understand them better?",
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: 3,
      type: 'ai',
      message: "Great question! React hooks are functions that let you use state and lifecycle features in functional components. Based on your profile, I see you're working on frontend development. Would you like me to:\n\n1. Explain useState and useEffect with examples\n2. Connect you with a React expert mentor\n3. Recommend learning resources\n\nI also notice John Doe (Google) has excellent React expertise and is available this week.",
      timestamp: new Date(Date.now() - 180000),
      suggestions: ['Explain hooks', 'Find React mentor', 'Learning resources']
    }
  ]);

  const [quickSuggestions] = useState([
    { text: 'Career guidance', icon: <TrendingUp /> },
    { text: 'Skill assessment', icon: <School /> },
    { text: 'Find mentors', icon: <Psychology /> },
    { text: 'Interview prep', icon: <Lightbulb /> }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: chatHistory.length + 1,
      type: 'user',
      message: message,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatHistory.length + 2,
        type: 'ai',
        message: generateAIResponse(message),
        timestamp: new Date(),
        suggestions: ['Tell me more', 'Find mentor', 'Next steps']
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);

    setMessage('');
  };

  const generateAIResponse = (userMessage) => {
    const responses = [
      "Based on your current progress and goals, I recommend focusing on practical projects. I can connect you with mentors who specialize in this area.",
      "That's a great question! Let me analyze your skill profile and suggest the best learning path. I also found 3 mentors who can help with this specific topic.",
      "I understand your concern. Based on similar students' success patterns, here's what I recommend. Would you like me to schedule a session with a relevant mentor?",
      "Excellent progress! Your learning trajectory shows strong improvement. Let me suggest next steps and potential mentors who can guide you further."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
  };

  return (
    <Card sx={{ height: 600, display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <SmartToy color="primary" />
          <Typography variant="h6">AI Mentorship Companion</Typography>
          <Chip label="Online" color="success" size="small" />
        </Box>
      </CardContent>

      {/* Chat Messages */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 2 }}>
        <List>
          {chatHistory.map((chat) => (
            <ListItem
              key={chat.id}
              sx={{
                display: 'flex',
                justifyContent: chat.type === 'user' ? 'flex-end' : 'flex-start',
                mb: 1
              }}
            >
              <Box
                sx={{
                  maxWidth: '70%',
                  display: 'flex',
                  flexDirection: chat.type === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                  gap: 1
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: chat.type === 'user' ? 'primary.main' : 'secondary.main'
                  }}
                >
                  {chat.type === 'user' ? 'U' : <SmartToy />}
                </Avatar>
                <Box>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: chat.type === 'user' ? 'primary.main' : 'grey.100',
                      color: chat.type === 'user' ? 'white' : 'text.primary'
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                      {chat.message}
                    </Typography>
                  </Paper>
                  {chat.suggestions && (
                    <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                      {chat.suggestions.map((suggestion, index) => (
                        <Chip
                          key={index}
                          label={suggestion}
                          size="small"
                          variant="outlined"
                          onClick={() => handleSuggestionClick(suggestion)}
                          sx={{ cursor: 'pointer' }}
                        />
                      ))}
                    </Box>
                  )}
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    {chat.timestamp.toLocaleTimeString()}
                  </Typography>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Quick Suggestions */}
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Quick suggestions:
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap">
          {quickSuggestions.map((suggestion, index) => (
            <Chip
              key={index}
              label={suggestion.text}
              icon={suggestion.icon}
              size="small"
              variant="outlined"
              onClick={() => handleSuggestionClick(suggestion.text)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Box>

      {/* Message Input */}
      <CardContent sx={{ pt: 1 }}>
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            size="small"
            placeholder="Ask me anything about your career journey..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <IconButton onClick={handleSendMessage} color="primary">
            <Send />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AIMentorshipCompanion;
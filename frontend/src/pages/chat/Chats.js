import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  TextField,
  InputAdornment,
  Divider
} from '@mui/material';
import {
  ArrowBack,
  Search,
  Circle
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Chats = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState([]);

  const handleBack = () => {
    if (location.state?.returnTo === 'notifications') {
      navigate('/student/dashboard', { state: { activeSection: 'notifications' } });
    } else {
      navigate('/student/dashboard');
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = () => {
    setChats([
      {
        id: 1,
        mentorName: 'John Doe',
        mentorAvatar: 'JD',
        lastMessage: 'Thanks for the great session today!',
        timestamp: '2 min ago',
        unreadCount: 2,
        isOnline: true
      },
      {
        id: 2,
        mentorName: 'Jane Smith',
        mentorAvatar: 'JS',
        lastMessage: 'Let me know if you need any help with the project',
        timestamp: '1 hour ago',
        unreadCount: 0,
        isOnline: false
      },
      {
        id: 3,
        mentorName: 'Mike Johnson',
        mentorAvatar: 'MJ',
        lastMessage: 'Great progress on your resume!',
        timestamp: '1 day ago',
        unreadCount: 1,
        isOnline: true
      }
    ]);
  };

  const filteredChats = chats.filter(chat =>
    chat.mentorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openChat = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={handleBack}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            My Chats
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <Card>
          <CardContent sx={{ p: 0 }}>
            <List>
              {filteredChats.map((chat, index) => (
                <React.Fragment key={chat.id}>
                  <ListItem
                    button
                    onClick={() => openChat(chat.id)}
                    sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
                  >
                    <ListItemAvatar>
                      <Box sx={{ position: 'relative' }}>
                        <Avatar>{chat.mentorAvatar}</Avatar>
                        {chat.isOnline && (
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
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {chat.mentorName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {chat.timestamp}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: '200px'
                            }}
                          >
                            {chat.lastMessage}
                          </Typography>
                          {chat.unreadCount > 0 && (
                            <Badge badgeContent={chat.unreadCount} color="primary" />
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < filteredChats.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Chats;
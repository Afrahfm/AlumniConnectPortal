import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Button,
  Box
} from '@mui/material';
import { Person, Star, TrendingUp } from '@mui/icons-material';

const RecommendedMentors = () => {
  const mentors = [
    { name: 'Dr. Sarah Wilson', role: 'Senior Product Manager', match: '95%', icon: <Person /> },
    { name: 'John Smith', role: 'Software Engineer', match: '88%', icon: <Star /> },
    { name: 'Emily Chen', role: 'UX Designer', match: '82%', icon: <TrendingUp /> }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          AI Recommended Mentors
        </Typography>
        <List>
          {mentors.map((mentor, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Box sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white', 
                  borderRadius: '50%', 
                  p: 1, 
                  display: 'flex' 
                }}>
                  {mentor.icon}
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={mentor.name}
                secondary={mentor.role}
              />
              <Chip label={`${mentor.match} match`} color="primary" size="small" />
            </ListItem>
          ))}
        </List>
        <Button variant="contained" fullWidth sx={{ mt: 2 }}>
          View All Recommendations
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecommendedMentors;
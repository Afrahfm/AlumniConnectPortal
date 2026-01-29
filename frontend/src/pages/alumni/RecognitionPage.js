import React from 'react';
import {
  Container,
  Typography,
  Box
} from '@mui/material';
import MentorRecognition from '../../components/ai/MentorRecognition';

const RecognitionPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Recognition & Achievements
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your mentoring achievements and recognition
        </Typography>
      </Box>

      <MentorRecognition />
    </Container>
  );
};

export default RecognitionPage;
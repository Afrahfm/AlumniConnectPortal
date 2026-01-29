import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Avatar,
  Button,
  Chip
} from '@mui/material';
import {
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
  CallEnd,
  ScreenShare,
  StopScreenShare
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

const VideoCall = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    // Start call timer
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Initialize video stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => console.log('Error accessing media devices:', err));

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    navigate('/student/dashboard', { state: { activeSection: 'my-mentorships' } });
  };

  return (
    <Box sx={{ height: '100vh', bgcolor: '#1a1a1a', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" color="white">
            Meeting with Mentor
          </Typography>
          <Chip label={`${formatTime(callDuration)}`} color="primary" />
        </Box>
        <Typography variant="body2" color="white">
          Meeting ID: {meetingId}
        </Typography>
      </Box>

      {/* Video Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, p: 2 }}>
        {/* Main Video */}
        <Paper sx={{ flexGrow: 1, position: 'relative', bgcolor: '#333', borderRadius: 2 }}>
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 8
            }}
          />
          <Box sx={{ position: 'absolute', bottom: 16, left: 16 }}>
            <Chip label="You" color="primary" />
          </Box>
        </Paper>

        {/* Mentor Video */}
        <Paper sx={{ width: 300, height: 200, bgcolor: '#333', borderRadius: 2, position: 'relative' }}>
          <Box sx={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 2
          }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
              JD
            </Avatar>
            <Typography color="white">John Doe</Typography>
          </Box>
          <Box sx={{ position: 'absolute', bottom: 8, left: 8 }}>
            <Chip label="Mentor" size="small" />
          </Box>
        </Paper>
      </Box>

      {/* Controls */}
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <IconButton
          onClick={() => setIsAudioOn(!isAudioOn)}
          sx={{
            bgcolor: isAudioOn ? 'rgba(255,255,255,0.1)' : 'error.main',
            color: 'white',
            '&:hover': { bgcolor: isAudioOn ? 'rgba(255,255,255,0.2)' : 'error.dark' }
          }}
        >
          {isAudioOn ? <Mic /> : <MicOff />}
        </IconButton>

        <IconButton
          onClick={() => setIsVideoOn(!isVideoOn)}
          sx={{
            bgcolor: isVideoOn ? 'rgba(255,255,255,0.1)' : 'error.main',
            color: 'white',
            '&:hover': { bgcolor: isVideoOn ? 'rgba(255,255,255,0.2)' : 'error.dark' }
          }}
        >
          {isVideoOn ? <Videocam /> : <VideocamOff />}
        </IconButton>

        <IconButton
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          sx={{
            bgcolor: isScreenSharing ? 'primary.main' : 'rgba(255,255,255,0.1)',
            color: 'white',
            '&:hover': { bgcolor: isScreenSharing ? 'primary.dark' : 'rgba(255,255,255,0.2)' }
          }}
        >
          {isScreenSharing ? <StopScreenShare /> : <ScreenShare />}
        </IconButton>

        <IconButton
          onClick={handleEndCall}
          sx={{
            bgcolor: 'error.main',
            color: 'white',
            '&:hover': { bgcolor: 'error.dark' }
          }}
        >
          <CallEnd />
        </IconButton>
      </Box>
    </Box>
  );
};

export default VideoCall;
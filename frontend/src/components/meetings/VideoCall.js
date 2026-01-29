import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Paper,
  Avatar,
  Chip,
  Tooltip,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
  CallEnd,
  People,
  Close
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const VideoCall = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [callStarted, setCallStarted] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  const participants = [
    { id: 1, name: 'John Doe', role: 'Mentor', avatar: 'JD', status: 'connected' },
    { id: 2, name: 'You', role: 'Student', avatar: user?.name?.[0] || 'S', status: 'connected' }
  ];

  useEffect(() => {
    fetchMeeting();
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [meetingId]);

  const fetchMeeting = async () => {
    try {
      setMeeting({
        id: meetingId,
        title: 'Career Guidance Session',
        organizer: { firstName: 'John', lastName: 'Doe' },
        participant: { firstName: 'Jane', lastName: 'Smith' },
        scheduledDate: new Date(),
        duration: 60,
        status: 'SCHEDULED'
      });
    } catch (error) {
      toast.error('Failed to fetch meeting details');
    } finally {
      setLoading(false);
    }
  };

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      setCallStarted(true);
      toast.success('Call started successfully!');
    } catch (error) {
      toast.error('Failed to start call. Please check your camera and microphone permissions.');
    }
  };

  const endCall = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    toast.success('Call ended successfully!');
    navigate('/meetings');
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setAudioEnabled(audioTrack.enabled);
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Loading meeting...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', bgcolor: 'black', position: 'relative', overflow: 'hidden' }}>
      {/* Top Bar */}
      <AppBar position="absolute" sx={{ bgcolor: 'rgba(0,0,0,0.7)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
            {meeting?.title || 'Video Call'}
          </Typography>
          <IconButton color="inherit" onClick={() => setParticipantsOpen(true)}>
            <Badge badgeContent={participants.length} color="primary">
              <People />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Video Area */}
      <Box sx={{ height: '100%', position: 'relative', pt: 8 }}>
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundColor: '#1a1a1a'
          }}
        />
        
        {/* Local Video */}
        <Paper
          sx={{
            position: 'absolute',
            bottom: 100,
            right: 20,
            width: isMobile ? 120 : 200,
            height: isMobile ? 90 : 150,
            overflow: 'hidden'
          }}
        >
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scaleX(-1)'
            }}
          />
          {!videoEnabled && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Avatar>{user?.name?.[0] || 'U'}</Avatar>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Bottom Controls */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 2,
          p: 2,
          bgcolor: 'rgba(0,0,0,0.8)',
          borderRadius: 3
        }}
      >
        {!callStarted ? (
          <Button
            variant="contained"
            size="large"
            startIcon={<Videocam />}
            onClick={startCall}
            sx={{ bgcolor: '#4caf50' }}
          >
            Join Call
          </Button>
        ) : (
          <>
            <Tooltip title={audioEnabled ? "Mute" : "Unmute"}>
              <IconButton
                onClick={toggleAudio}
                sx={{
                  bgcolor: audioEnabled ? 'rgba(255,255,255,0.2)' : 'error.main',
                  color: 'white'
                }}
              >
                {audioEnabled ? <Mic /> : <MicOff />}
              </IconButton>
            </Tooltip>

            <Tooltip title={videoEnabled ? "Turn off camera" : "Turn on camera"}>
              <IconButton
                onClick={toggleVideo}
                sx={{
                  bgcolor: videoEnabled ? 'rgba(255,255,255,0.2)' : 'error.main',
                  color: 'white'
                }}
              >
                {videoEnabled ? <Videocam /> : <VideocamOff />}
              </IconButton>
            </Tooltip>

            <Tooltip title="End call">
              <IconButton
                onClick={endCall}
                sx={{ bgcolor: 'error.main', color: 'white' }}
              >
                <CallEnd />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Box>

      {/* Participants Drawer */}
      <Drawer
        anchor="right"
        open={participantsOpen}
        onClose={() => setParticipantsOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: 300, mt: 8 } }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Participants ({participants.length})</Typography>
            <IconButton onClick={() => setParticipantsOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <List>
            {participants.map((participant) => (
              <ListItem key={participant.id}>
                <ListItemIcon>
                  <Avatar>{participant.avatar}</Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={participant.name}
                  secondary={participant.role}
                />
                <Chip
                  label={participant.status}
                  size="small"
                  color={participant.status === 'connected' ? 'success' : 'default'}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default VideoCall;
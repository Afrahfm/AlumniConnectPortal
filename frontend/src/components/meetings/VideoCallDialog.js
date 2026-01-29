import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  IconButton,
  Typography,
  Paper
} from '@mui/material';
import {
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
  CallEnd,
  ScreenShare
} from '@mui/icons-material';

const VideoCallDialog = ({ open, onClose, recipientName }) => {
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    let interval;
    if (open) {
      startCall();
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [open]);

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      streamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const endCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    onClose();
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog
      open={open}
      onClose={endCall}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { height: '80vh', bgcolor: 'black' }
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative', height: '100%' }}>
        {/* Call Info */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 10,
            color: 'white'
          }}
        >
          <Typography variant="h6">{recipientName}</Typography>
          <Typography variant="body2">{formatDuration(callDuration)}</Typography>
        </Box>

        {/* Remote Video */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundColor: '#333'
          }}
        />

        {/* Local Video */}
        <Paper
          sx={{
            position: 'absolute',
            bottom: 80,
            right: 16,
            width: 200,
            height: 150,
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
              objectFit: 'cover'
            }}
          />
        </Paper>

        {/* Controls */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 2,
            bgcolor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: 4,
            p: 1
          }}
        >
          <IconButton
            onClick={toggleVideo}
            sx={{
              bgcolor: videoEnabled ? 'rgba(255, 255, 255, 0.1)' : 'error.main',
              color: 'white'
            }}
          >
            {videoEnabled ? <Videocam /> : <VideocamOff />}
          </IconButton>

          <IconButton
            onClick={toggleAudio}
            sx={{
              bgcolor: audioEnabled ? 'rgba(255, 255, 255, 0.1)' : 'error.main',
              color: 'white'
            }}
          >
            {audioEnabled ? <Mic /> : <MicOff />}
          </IconButton>

          <IconButton
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              color: 'white'
            }}
          >
            <ScreenShare />
          </IconButton>

          <IconButton
            onClick={endCall}
            sx={{
              bgcolor: 'error.main',
              color: 'white',
              '&:hover': { bgcolor: 'error.dark' }
            }}
          >
            <CallEnd />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VideoCallDialog;
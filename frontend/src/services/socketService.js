// Mock socket service for development without socket.io-client dependency
class SocketService {
  constructor() {
    this.isConnected = false;
    this.callbacks = {};
  }

  connect(userId) {
    console.log('Mock socket connected for user:', userId);
    this.isConnected = true;
    return this;
  }

  disconnect() {
    console.log('Mock socket disconnected');
    this.isConnected = false;
    this.callbacks = {};
  }

  // Meeting chat methods
  joinMeetingRoom(meetingId) {
    console.log('Joined meeting room:', meetingId);
  }

  leaveMeetingRoom(meetingId) {
    console.log('Left meeting room:', meetingId);
  }

  sendMeetingMessage(meetingId, message) {
    console.log('Sending meeting message:', { meetingId, message });
    // Simulate receiving the message back for demo
    setTimeout(() => {
      if (this.callbacks['meeting-message']) {
        this.callbacks['meeting-message'](message);
      }
    }, 100);
  }

  onMeetingMessage(callback) {
    this.callbacks['meeting-message'] = callback;
  }

  offMeetingMessage() {
    delete this.callbacks['meeting-message'];
  }

  // General chat methods
  sendMessage(chatId, message) {
    console.log('Sending message:', { chatId, message });
    // Simulate receiving the message back for demo
    setTimeout(() => {
      if (this.callbacks['new-message']) {
        this.callbacks['new-message'](message);
      }
    }, 100);
  }

  onMessage(callback) {
    this.callbacks['new-message'] = callback;
  }

  offMessage() {
    delete this.callbacks['new-message'];
  }

  // Typing indicators
  startTyping(chatId) {
    console.log('Started typing in chat:', chatId);
  }

  stopTyping(chatId) {
    console.log('Stopped typing in chat:', chatId);
  }

  onTyping(callback) {
    this.callbacks['user-typing'] = callback;
  }

  offTyping() {
    delete this.callbacks['user-typing'];
  }
}

export const socketService = new SocketService();
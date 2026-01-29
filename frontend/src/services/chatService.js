import api from './apiService';

class ChatService {
  // Get chat conversations for a user
  async getConversations(userId) {
    try {
      const response = await api.get(`/api/chat/conversations/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      // Return mock data for demo
      return [
        {
          id: 1,
          participants: [
            { id: 1, firstName: 'John', lastName: 'Doe', role: 'ALUMNI' },
            { id: 2, firstName: 'Jane', lastName: 'Smith', role: 'STUDENT' }
          ],
          lastMessage: {
            content: 'Thanks for the career advice!',
            timestamp: new Date(Date.now() - 3600000),
            senderId: 2
          },
          unreadCount: 0
        },
        {
          id: 2,
          participants: [
            { id: 3, firstName: 'Mike', lastName: 'Johnson', role: 'ALUMNI' },
            { id: 2, firstName: 'Jane', lastName: 'Smith', role: 'STUDENT' }
          ],
          lastMessage: {
            content: 'Looking forward to our meeting tomorrow',
            timestamp: new Date(Date.now() - 7200000),
            senderId: 3
          },
          unreadCount: 2
        }
      ];
    }
  }

  // Get messages for a specific chat
  async getMessages(chatId, page = 0, size = 50) {
    try {
      const response = await api.get(`/api/chat/${chatId}/messages?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Return mock data for demo
      return {
        content: [
          {
            id: 1,
            senderId: 1,
            senderName: 'John Doe',
            content: 'Hi! I saw your mentorship request. I\'d be happy to help with your career questions.',
            timestamp: new Date(Date.now() - 86400000),
            type: 'TEXT'
          },
          {
            id: 2,
            senderId: 2,
            senderName: 'Jane Smith',
            content: 'Thank you so much! I\'m particularly interested in software engineering roles.',
            timestamp: new Date(Date.now() - 82800000),
            type: 'TEXT'
          },
          {
            id: 3,
            senderId: 1,
            senderName: 'John Doe',
            content: 'Great! I\'ve been in the industry for 8 years. What specific areas would you like to discuss?',
            timestamp: new Date(Date.now() - 79200000),
            type: 'TEXT'
          }
        ],
        totalElements: 3,
        totalPages: 1,
        first: true,
        last: true
      };
    }
  }

  // Send a message
  async sendMessage(chatId, content, type = 'TEXT') {
    try {
      const response = await api.post(`/api/chat/${chatId}/messages`, {
        content,
        type
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Create a new chat conversation
  async createConversation(participantIds) {
    try {
      const response = await api.post('/api/chat/conversations', {
        participantIds
      });
      return response.data;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  }

  // Mark messages as read
  async markAsRead(chatId) {
    try {
      await api.put(`/api/chat/${chatId}/read`);
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  }

  // Search messages
  async searchMessages(query, chatId = null) {
    try {
      const params = new URLSearchParams({ query });
      if (chatId) params.append('chatId', chatId);
      
      const response = await api.get(`/api/chat/search?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error searching messages:', error);
      return [];
    }
  }
}

export const chatService = new ChatService();
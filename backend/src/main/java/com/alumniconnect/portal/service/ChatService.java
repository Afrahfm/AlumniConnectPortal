package com.alumniconnect.portal.service;

import com.alumniconnect.portal.entity.Chat;
import com.alumniconnect.portal.entity.Mentorship;
import com.alumniconnect.portal.entity.User;
import com.alumniconnect.portal.repository.ChatRepository;
import com.alumniconnect.portal.repository.MentorshipRepository;
import com.alumniconnect.portal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private MentorshipRepository mentorshipRepository;

    @Autowired
    private UserRepository userRepository;

    public Chat sendMessage(Long mentorshipId, Long senderId, String content, Chat.MessageType messageType) {
        Optional<Mentorship> mentorshipOpt = mentorshipRepository.findById(mentorshipId);
        Optional<User> senderOpt = userRepository.findById(senderId);

        if (mentorshipOpt.isPresent() && senderOpt.isPresent()) {
            Chat chat = new Chat();
            chat.setMentorship(mentorshipOpt.get());
            chat.setSender(senderOpt.get());
            chat.setContent(content);
            chat.setMessageType(messageType);

            // Update mentorship last interaction
            Mentorship mentorship = mentorshipOpt.get();
            mentorship.setLastInteraction(LocalDateTime.now());
            mentorshipRepository.save(mentorship);

            return chatRepository.save(chat);
        }

        throw new RuntimeException("Mentorship or User not found");
    }

    public List<Chat> getChatHistory(Long mentorshipId) {
        return chatRepository.findByMentorshipIdOrderByCreatedAt(mentorshipId);
    }

    public List<Chat> getUserChats(Long userId) {
        return chatRepository.findByUserId(userId);
    }

    public void markAsRead(Long chatId) {
        Optional<Chat> chatOpt = chatRepository.findById(chatId);
        if (chatOpt.isPresent()) {
            Chat chat = chatOpt.get();
            chat.setIsRead(true);
            chatRepository.save(chat);
        }
    }
}
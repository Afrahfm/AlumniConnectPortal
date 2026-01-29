package com.alumniconnect.portal.service;

import com.alumniconnect.portal.entity.Mentorship;
import com.alumniconnect.portal.repository.MentorshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MentorshipService {

    @Autowired
    private MentorshipRepository mentorshipRepository;

    public Mentorship createMentorship(Mentorship mentorship) {
        mentorship.setCreatedAt(LocalDateTime.now());
        mentorship.setUpdatedAt(LocalDateTime.now());
        mentorship.setStatus(Mentorship.Status.PENDING);
        return mentorshipRepository.save(mentorship);
    }

    public List<Mentorship> getUserMentorships(Long userId) {
        return mentorshipRepository.findByMentorIdOrMenteeId(userId, userId);
    }

    public Mentorship updateStatus(Long id, Mentorship.Status status, String responseMessage) {
        Mentorship mentorship = mentorshipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mentorship not found"));
        
        mentorship.setStatus(status);
        mentorship.setResponseMessage(responseMessage);
        mentorship.setUpdatedAt(LocalDateTime.now());
        
        if (status == Mentorship.Status.ACCEPTED) {
            mentorship.setStartDate(LocalDateTime.now());
        }
        
        return mentorshipRepository.save(mentorship);
    }

    public List<Mentorship> getAllMentorships() {
        return mentorshipRepository.findAll();
    }
}
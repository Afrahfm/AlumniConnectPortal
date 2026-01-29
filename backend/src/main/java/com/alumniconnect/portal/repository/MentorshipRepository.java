package com.alumniconnect.portal.repository;

import com.alumniconnect.portal.entity.Mentorship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MentorshipRepository extends JpaRepository<Mentorship, Long> {
    
    List<Mentorship> findByMentorId(Long mentorId);
    
    List<Mentorship> findByMenteeId(Long menteeId);
    
    List<Mentorship> findByMentorIdOrMenteeId(Long mentorId, Long menteeId);
    
    List<Mentorship> findByStatus(Mentorship.Status status);
    
    long countByStatus(Mentorship.Status status);
}
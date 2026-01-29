package com.alumniconnect.portal.repository;

import com.alumniconnect.portal.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByMentorshipId(Long mentorshipId);
    
    @Query("SELECT c FROM Chat c WHERE c.mentorship.id = :mentorshipId ORDER BY c.createdAt ASC")
    List<Chat> findByMentorshipIdOrderByCreatedAt(@Param("mentorshipId") Long mentorshipId);
    
    @Query("SELECT c FROM Chat c WHERE c.mentorship.mentor.id = :userId OR c.mentorship.mentee.id = :userId")
    List<Chat> findByUserId(@Param("userId") Long userId);
}
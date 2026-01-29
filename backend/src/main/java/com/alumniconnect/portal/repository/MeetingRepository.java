package com.alumniconnect.portal.repository;

import com.alumniconnect.portal.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    List<Meeting> findByMentorshipId(Long mentorshipId);
    
    @Query("SELECT m FROM Meeting m WHERE (m.organizer.id = :userId OR m.participant.id = :userId)")
    List<Meeting> findByUserId(@Param("userId") Long userId);
    
    @Query("SELECT m FROM Meeting m WHERE (m.organizer.id = :userId OR m.participant.id = :userId) " +
           "AND m.scheduledDate >= :startDate AND m.scheduledDate <= :endDate")
    List<Meeting> findByUserIdAndDateRange(@Param("userId") Long userId,
                                         @Param("startDate") LocalDateTime startDate,
                                         @Param("endDate") LocalDateTime endDate);
    
    List<Meeting> findByStatus(Meeting.Status status);
    
    @Query("SELECT m FROM Meeting m WHERE m.scheduledDate <= :dateTime AND m.reminderSent = false")
    List<Meeting> findUpcomingMeetingsForReminder(@Param("dateTime") LocalDateTime dateTime);
}
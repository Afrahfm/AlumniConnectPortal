package com.alumniconnect.portal.service;

import com.alumniconnect.portal.entity.Meeting;
import com.alumniconnect.portal.entity.Mentorship;
import com.alumniconnect.portal.entity.User;
import com.alumniconnect.portal.repository.MeetingRepository;
import com.alumniconnect.portal.repository.MentorshipRepository;
import com.alumniconnect.portal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private MentorshipRepository mentorshipRepository;

    @Autowired
    private UserRepository userRepository;

    public Meeting scheduleMeeting(Long mentorshipId, Long organizerId, Long participantId,
                                 String title, String description, LocalDateTime scheduledDate,
                                 Integer duration, Meeting.MeetingType meetingType) {
        Optional<Mentorship> mentorshipOpt = mentorshipRepository.findById(mentorshipId);
        Optional<User> organizerOpt = userRepository.findById(organizerId);
        Optional<User> participantOpt = userRepository.findById(participantId);

        if (mentorshipOpt.isPresent() && organizerOpt.isPresent() && participantOpt.isPresent()) {
            Meeting meeting = new Meeting();
            meeting.setMentorship(mentorshipOpt.get());
            meeting.setOrganizer(organizerOpt.get());
            meeting.setParticipant(participantOpt.get());
            meeting.setTitle(title);
            meeting.setDescription(description);
            meeting.setScheduledDate(scheduledDate);
            meeting.setDuration(duration);
            meeting.setMeetingType(meetingType);

            // Set reminder time (30 minutes before meeting)
            meeting.setReminderTime(scheduledDate.minusMinutes(30));

            return meetingRepository.save(meeting);
        }

        throw new RuntimeException("Mentorship or User not found");
    }

    public List<Meeting> getUserMeetings(Long userId) {
        return meetingRepository.findByUserId(userId);
    }

    public List<Meeting> getUserMeetingsInRange(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        return meetingRepository.findByUserIdAndDateRange(userId, startDate, endDate);
    }

    public Meeting updateMeetingStatus(Long meetingId, Meeting.Status status) {
        Optional<Meeting> meetingOpt = meetingRepository.findById(meetingId);

        if (meetingOpt.isPresent()) {
            Meeting meeting = meetingOpt.get();
            meeting.setStatus(status);
            meeting.setUpdatedAt(LocalDateTime.now());

            if (status == Meeting.Status.ONGOING) {
                meeting.setActualStartTime(LocalDateTime.now());
            } else if (status == Meeting.Status.COMPLETED) {
                meeting.setActualEndTime(LocalDateTime.now());
                
                // Update mentorship meetings completed count
                Mentorship mentorship = meeting.getMentorship();
                mentorship.setMeetingsCompleted(mentorship.getMeetingsCompleted() + 1);
                mentorshipRepository.save(mentorship);
            }

            return meetingRepository.save(meeting);
        }

        throw new RuntimeException("Meeting not found");
    }

    public Meeting joinMeeting(Long meetingId, Long userId) {
        Optional<Meeting> meetingOpt = meetingRepository.findById(meetingId);

        if (meetingOpt.isPresent()) {
            Meeting meeting = meetingOpt.get();

            if (meeting.getOrganizer().getId().equals(userId)) {
                meeting.setOrganizerJoined(true);
            } else if (meeting.getParticipant().getId().equals(userId)) {
                meeting.setParticipantJoined(true);
            }

            // If both joined, update status to ongoing
            if (meeting.getOrganizerJoined() && meeting.getParticipantJoined()) {
                meeting.setStatus(Meeting.Status.ONGOING);
                meeting.setActualStartTime(LocalDateTime.now());
            }

            meeting.setUpdatedAt(LocalDateTime.now());
            return meetingRepository.save(meeting);
        }

        throw new RuntimeException("Meeting not found");
    }

    public Meeting addMeetingNotes(Long meetingId, String notes) {
        Optional<Meeting> meetingOpt = meetingRepository.findById(meetingId);

        if (meetingOpt.isPresent()) {
            Meeting meeting = meetingOpt.get();
            meeting.setNotes(notes);
            meeting.setUpdatedAt(LocalDateTime.now());
            return meetingRepository.save(meeting);
        }

        throw new RuntimeException("Meeting not found");
    }

    public List<Meeting> getUpcomingMeetingsForReminder() {
        LocalDateTime reminderTime = LocalDateTime.now().plusMinutes(30);
        return meetingRepository.findUpcomingMeetingsForReminder(reminderTime);
    }

    public Optional<Meeting> findById(Long id) {
        return meetingRepository.findById(id);
    }
}
package com.alumniconnect.portal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "meetings")
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "mentorship_id", nullable = false)
    private Mentorship mentorship;

    @ManyToOne
    @JoinColumn(name = "organizer_id", nullable = false)
    private User organizer;

    @ManyToOne
    @JoinColumn(name = "participant_id", nullable = false)
    private User participant;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private LocalDateTime scheduledDate;

    @Column(nullable = false)
    private Integer duration; // in minutes

    @Enumerated(EnumType.STRING)
    private MeetingType meetingType = MeetingType.VIDEO;

    private String meetingLink;
    private String location;

    @Enumerated(EnumType.STRING)
    private Status status = Status.SCHEDULED;

    private Boolean reminderSent = false;
    private LocalDateTime reminderTime;

    @Column(columnDefinition = "TEXT")
    private String notes;

    private Boolean organizerJoined = false;
    private Boolean participantJoined = false;
    private LocalDateTime actualStartTime;
    private LocalDateTime actualEndTime;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    public enum MeetingType {
        VIDEO, AUDIO, IN_PERSON
    }

    public enum Status {
        SCHEDULED, ONGOING, COMPLETED, CANCELLED, NO_SHOW
    }

    // Constructors
    public Meeting() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Mentorship getMentorship() { return mentorship; }
    public void setMentorship(Mentorship mentorship) { this.mentorship = mentorship; }

    public User getOrganizer() { return organizer; }
    public void setOrganizer(User organizer) { this.organizer = organizer; }

    public User getParticipant() { return participant; }
    public void setParticipant(User participant) { this.participant = participant; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getScheduledDate() { return scheduledDate; }
    public void setScheduledDate(LocalDateTime scheduledDate) { this.scheduledDate = scheduledDate; }

    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }

    public MeetingType getMeetingType() { return meetingType; }
    public void setMeetingType(MeetingType meetingType) { this.meetingType = meetingType; }

    public String getMeetingLink() { return meetingLink; }
    public void setMeetingLink(String meetingLink) { this.meetingLink = meetingLink; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public Boolean getReminderSent() { return reminderSent; }
    public void setReminderSent(Boolean reminderSent) { this.reminderSent = reminderSent; }

    public LocalDateTime getReminderTime() { return reminderTime; }
    public void setReminderTime(LocalDateTime reminderTime) { this.reminderTime = reminderTime; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Boolean getOrganizerJoined() { return organizerJoined; }
    public void setOrganizerJoined(Boolean organizerJoined) { this.organizerJoined = organizerJoined; }

    public Boolean getParticipantJoined() { return participantJoined; }
    public void setParticipantJoined(Boolean participantJoined) { this.participantJoined = participantJoined; }

    public LocalDateTime getActualStartTime() { return actualStartTime; }
    public void setActualStartTime(LocalDateTime actualStartTime) { this.actualStartTime = actualStartTime; }

    public LocalDateTime getActualEndTime() { return actualEndTime; }
    public void setActualEndTime(LocalDateTime actualEndTime) { this.actualEndTime = actualEndTime; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
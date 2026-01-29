package com.alumniconnect.portal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mentorships")
public class Mentorship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "mentor_id", nullable = false)
    private User mentor;

    @ManyToOne
    @JoinColumn(name = "mentee_id", nullable = false)
    private User mentee;

    @Column(columnDefinition = "TEXT")
    private String requestMessage;

    @Column(columnDefinition = "TEXT")
    private String responseMessage;

    private String domain;
    private String duration;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    private Integer mentorRating;
    private Integer menteeRating;

    @Column(columnDefinition = "TEXT")
    private String mentorFeedback;

    @Column(columnDefinition = "TEXT")
    private String menteeFeedback;

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime lastInteraction;
    private Integer meetingsCompleted = 0;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    public enum Status {
        PENDING, ACCEPTED, REJECTED, ACTIVE, COMPLETED, CANCELLED
    }

    public Mentorship() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getMentor() { return mentor; }
    public void setMentor(User mentor) { this.mentor = mentor; }

    public User getMentee() { return mentee; }
    public void setMentee(User mentee) { this.mentee = mentee; }

    public String getRequestMessage() { return requestMessage; }
    public void setRequestMessage(String requestMessage) { this.requestMessage = requestMessage; }

    public String getResponseMessage() { return responseMessage; }
    public void setResponseMessage(String responseMessage) { this.responseMessage = responseMessage; }

    public String getDomain() { return domain; }
    public void setDomain(String domain) { this.domain = domain; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public Integer getMentorRating() { return mentorRating; }
    public void setMentorRating(Integer mentorRating) { this.mentorRating = mentorRating; }

    public Integer getMenteeRating() { return menteeRating; }
    public void setMenteeRating(Integer menteeRating) { this.menteeRating = menteeRating; }

    public String getMentorFeedback() { return mentorFeedback; }
    public void setMentorFeedback(String mentorFeedback) { this.mentorFeedback = mentorFeedback; }

    public String getMenteeFeedback() { return menteeFeedback; }
    public void setMenteeFeedback(String menteeFeedback) { this.menteeFeedback = menteeFeedback; }

    public LocalDateTime getStartDate() { return startDate; }
    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }

    public LocalDateTime getEndDate() { return endDate; }
    public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }

    public LocalDateTime getLastInteraction() { return lastInteraction; }
    public void setLastInteraction(LocalDateTime lastInteraction) { this.lastInteraction = lastInteraction; }

    public Integer getMeetingsCompleted() { return meetingsCompleted; }
    public void setMeetingsCompleted(Integer meetingsCompleted) { this.meetingsCompleted = meetingsCompleted; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
package com.example.lab.projects.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(
    name = "snapshot",
    indexes = {
        @Index(name = "ix_branch_created_at", columnList = "branch_id, created_at")})
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Snapshot {
    @Id
    @NotNull
    @GeneratedValue(generator = "UUID")
    @Column(columnDefinition = "BINARY(16)", updatable = false)
    private UUID id;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "branch_id", nullable = false, updatable = false)
    private Branch branch;

    @NotNull
    @NotBlank
    @Size(max = 500)
    @Column(updatable = false)
    private String data;

    @Size(max = 500)
    @Column(updatable = false)
    private String comment;

    @CreatedBy
    @Column(name = "created_by", updatable = false)
    private String createdBy;

    @CreatedDate
    @Column(name = "created_at", columnDefinition = "timestamp default '2023-10-11 09:47:05.967394'", updatable = false)
    private LocalDateTime createdAt;
}

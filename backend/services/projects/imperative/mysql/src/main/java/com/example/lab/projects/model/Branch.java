package com.example.lab.projects.model;

import static java.lang.String.format;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(
    name = "branch",
    uniqueConstraints = {
        @UniqueConstraint(name = "uc_project_branch_name", columnNames = {"project_id", "name"})},
    indexes = {
        @Index(name = "ix_project_branch_name", columnList = "project_id, name")})
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Branch {
    @Id
    @NotNull
    @GeneratedValue(generator = "UUID")
    @Column(columnDefinition = "BINARY(16)", updatable = false)
    private UUID id;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "project_id", nullable = false, updatable = false)
    private Project project;

    @NotNull
    @NotBlank
    @Size(max = 255)
    private String name;

    @OneToMany(mappedBy = "branch", cascade = CascadeType.REMOVE)
    private List<Snapshot> snapshots;

    public UUID getProjectId() {
        return project != null ? project.getId() : null;
    }

    public boolean isDefaultBranch() {
        return Optional.ofNullable(project)
            .map(ds -> ds.isDefaultBranch(this))
            .orElseThrow(() -> new NoSuchElementException(
                format("No project set for branch with id %s", id)));
    }
}

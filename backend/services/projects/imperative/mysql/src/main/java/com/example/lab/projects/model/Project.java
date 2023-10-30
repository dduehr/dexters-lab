package com.example.lab.projects.model;

import static com.example.lab.projects.util.ListUtil.copyOf;
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
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(
    name = "project",
    uniqueConstraints = {
        @UniqueConstraint(name = "uc_name", columnNames = "name")},
    indexes = {
        @Index(name = "ix_name", columnList = "name")})
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    @NotNull
    @GeneratedValue(generator = "UUID")
    @Column(columnDefinition = "BINARY(16)", updatable = false)
    private UUID id;

    @NotNull
    @NotBlank
    @Size(max = 255)
    private String name;

    @Size(max = 500)
    @Column
    private String comment;

    @OneToMany(mappedBy = "project", cascade = CascadeType.REMOVE)
    private List<Branch> branches;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "default_branch_id")
    private Branch defaultBranch;

    public void addBranch(Branch branch) {
        if (branch == null) {
            throw new IllegalArgumentException(
                "Null is not a valid branch");
        }
        if (branch.getProjectId() != this.id) {
            throw new IllegalArgumentException(
                format("The branch with id %s does not belong to the development stream with id %s",
                    branch.getId(), this.getId()));
        }
        branches = copyOf(branches, branch);
    }

    public Branch getDefaultBranch() {
        if (this.defaultBranch != null && this.defaultBranch.getProjectId() != this.id) {
            throw new IllegalStateException(
                format("The default branch with id %s assigned to the development stream with id %s "
                    + "belongs to another development stream", this.defaultBranch.getId(), this.getId()));
        }
        return this.defaultBranch;
    }

    public void setDefaultBranch(Branch branch) {
        if (this.getDefaultBranch() != null) {
            throw new UnsupportedOperationException(
                format("The default branch of the development stream with id %s may not be replaced",
                    this.getId()));
        }
        if (branch != null && branch.getProjectId() != this.id) {
            throw new IllegalArgumentException(
                format("The branch with id %s does not belong to the development stream with id %s",
                    branch.getId(), this.getId()));
        }
        this.defaultBranch = branch;
    }

    public boolean hasDefaultBranch() {
        return defaultBranch != null;
    }

    public boolean isDefaultBranch(Branch branch) {
        return hasDefaultBranch() ? defaultBranch.equals(branch) : false;
    }
}

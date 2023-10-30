package com.example.lab.projects.model;

import java.util.UUID;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
@Builder
public class Project {
    @Id
    private UUID id;
    private String name;
    private String comment;
    // FIXME branches and defaultBranch not supported by Project entity
    // private List<Branch> branches;
    // private Branch defaultBranch;
}

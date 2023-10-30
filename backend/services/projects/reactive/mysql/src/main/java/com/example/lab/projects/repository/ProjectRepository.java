package com.example.lab.projects.repository;

import com.example.lab.projects.model.Project;
import java.util.UUID;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface ProjectRepository extends ReactiveCrudRepository<Project, UUID>, InsertRepository<Project, UUID> {
}

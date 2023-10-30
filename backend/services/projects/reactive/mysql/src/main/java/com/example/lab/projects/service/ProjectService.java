package com.example.lab.projects.service;

import com.example.lab.projects.dto.NewProjectDto;
import com.example.lab.projects.dto.ProjectDto;
import com.example.lab.projects.mapper.ProjectMapper;
import com.example.lab.projects.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ProjectService {
    final ProjectRepository projectRepository;

    public Flux<ProjectDto> findAll() {
        // TODO: Paging
        return projectRepository.findAll()
                .map(ProjectMapper.INSTANCE::toDto);
    }

    public Mono<ProjectDto> createProject(Mono<NewProjectDto> monoNewProjectDto) {
        return monoNewProjectDto
                .flatMap(dto -> projectRepository.save(ProjectMapper.INSTANCE.toEntity(dto)))
                .map(ProjectMapper.INSTANCE::toDto);
    }
}

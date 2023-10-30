package com.example.lab.projects.controller;

import com.example.lab.projects.dto.ProjectDto;
import com.example.lab.projects.dto.NewProjectDto;
import com.example.lab.projects.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ProjectControllerDelegate implements  ProjectsApiDelegate {
    final ProjectService projectService;

    @Override
    public Mono<ResponseEntity<ProjectDto>> createProject(Mono<NewProjectDto> monoNewProjectDto, ServerWebExchange exchange) {
        return projectService.createProject(monoNewProjectDto).map(ResponseEntity::ok);
    }
}

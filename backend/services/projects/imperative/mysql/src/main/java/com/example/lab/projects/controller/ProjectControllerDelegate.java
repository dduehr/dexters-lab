package com.example.lab.projects.controller;

import com.example.lab.projects.controller.util.PaginationHeader;
import com.example.lab.projects.dto.NewProjectDto;
import com.example.lab.projects.dto.ProjectDto;
import com.example.lab.projects.service.ProjectService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectControllerDelegate implements ProjectsApiDelegate {
    final ProjectService projectService;

    @Override
    public ResponseEntity<ProjectDto> createProject(NewProjectDto newDevStreamDto) {
        val devStream = projectService.createProject(newDevStreamDto);
        return ResponseEntity.ok(devStream);
    }

    @Override
    public ResponseEntity<List<ProjectDto>> findAllProjects(
        Integer page, Integer size) {
        val devStreamsPage = projectService.findAllProjects(PageRequest.of(page, size));
        return ResponseEntity.ok()
            .headers(PaginationHeader.of(devStreamsPage))
            .body(devStreamsPage.getContent());
    }

    @Override
    public ResponseEntity<ProjectDto> findProjectById(UUID id) {
        val optionalDevStream = projectService.findProjectById(id);
        return ResponseEntity.of(optionalDevStream);
    }
}

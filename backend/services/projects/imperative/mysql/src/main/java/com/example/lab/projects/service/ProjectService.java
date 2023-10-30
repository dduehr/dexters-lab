package com.example.lab.projects.service;

import static com.example.lab.projects.util.ExceptionUtil.wrappedInitialCause;

import com.example.lab.projects.dto.NewProjectDto;
import com.example.lab.projects.dto.ProjectDto;
import com.example.lab.projects.exeption.CustomBadArgumentException;
import com.example.lab.projects.exeption.CustomDataConflictException;
import com.example.lab.projects.mapper.ProjectMapper;
import com.example.lab.projects.repository.ProjectRepository;
import jakarta.validation.ConstraintViolationException;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = {Exception.class})
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectDto createProject(NewProjectDto dto) {
        try {
            return ProjectMapper.INSTANCE.toDto(
                projectRepository.saveAndFlush(
                    ProjectMapper.INSTANCE.toEntity(dto)));
        } catch (DataIntegrityViolationException e) {
            throw wrappedInitialCause(e, cause -> new CustomDataConflictException(cause.getMessage(), cause));
        } catch (ConstraintViolationException e) {
            throw wrappedInitialCause(e, cause -> new CustomBadArgumentException(cause.getMessage(), cause));
        }
    }

    public Page<ProjectDto> findAllProjects(Pageable pageRequest) {
        return projectRepository.findByOrderByName(pageRequest)
            .map(ProjectMapper.INSTANCE::toDto);
    }

    public Optional<ProjectDto> findProjectById(UUID id) {
        return projectRepository.findById(id)
            .map(ProjectMapper.INSTANCE::toDto);
    }
}

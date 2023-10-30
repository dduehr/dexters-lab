package com.example.lab.projects.service;

import static java.lang.String.format;

import com.example.lab.projects.dto.NewSnapshotDto;
import com.example.lab.projects.dto.NewSnapshotWithBranchDto;
import com.example.lab.projects.dto.SnapshotDto;
import com.example.lab.projects.exeption.CustomBadArgumentException;
import com.example.lab.projects.exeption.CustomDataConflictException;
import com.example.lab.projects.mapper.SnapshotMapper;
import com.example.lab.projects.model.Branch;
import com.example.lab.projects.model.Project;
import com.example.lab.projects.model.Snapshot;
import com.example.lab.projects.repository.BranchRepository;
import com.example.lab.projects.repository.ProjectRepository;
import com.example.lab.projects.repository.SnapshotRepository;
import jakarta.validation.ConstraintViolationException;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = {Exception.class})
public class SnapshotService {
    private final ProjectRepository projectRepository;
    private final BranchRepository branchRepository;
    private final SnapshotRepository snapshotRepository;

    public SnapshotDto createSnapshotWithBranch(NewSnapshotWithBranchDto dto) {
        return projectRepository.findById(dto.getProjectId())
            .map(project -> doCreateSnapshotWithBranch(project, dto))
            .map(SnapshotMapper.INSTANCE::toDto)
            .orElseThrow(() -> new CustomBadArgumentException(
                format("No development stream with id %s found", dto.getProjectId())));
    }

    public SnapshotDto createSnapshot(NewSnapshotDto dto) {
        return branchRepository.findById(dto.getBranchId())
            .map(branch -> doCreateSnapshot(branch, dto))
            .map(SnapshotMapper.INSTANCE::toDto)
            .orElseThrow(() -> new CustomBadArgumentException(
                format("No branch with id %s found", dto.getBranchId())));
    }

    public Page<SnapshotDto> findSnapshotsByProjectId(UUID id, Pageable pageRequest) {
        return snapshotRepository.findByProjectIdOrderByCreatedAt(id, pageRequest)
                .map(SnapshotMapper.INSTANCE::toDto);
    }

    public Page<SnapshotDto> findSnapshotsByBranchId(UUID id, Pageable pageRequest) {
        return snapshotRepository.findByBranchIdOrderByCreatedAt(id, pageRequest)
            .map(SnapshotMapper.INSTANCE::toDto);
    }

    public Optional<SnapshotDto> findSnapshotsById(UUID id) {
        return snapshotRepository.findById(id)
                .map(SnapshotMapper.INSTANCE::toDto);
    }

    private Snapshot doCreateSnapshotWithBranch(Project project, NewSnapshotWithBranchDto dto) {
        try {
            val newBranch = branchRepository.saveAndFlush(Branch.builder()
                .project(project)
                .name(dto.getBranchName())
                .build());
            val newSnapshot = snapshotRepository.saveAndFlush(Snapshot.builder()
                .branch(newBranch)
                .data(dto.getData())
                .comment(dto.getComment())
                .build());
            if (!project.hasDefaultBranch()) {
                project.setDefaultBranch(newBranch);
                projectRepository.saveAndFlush(project);
            }
            return newSnapshot;
        } catch (ConstraintViolationException | DataIntegrityViolationException e) {
            throw new CustomBadArgumentException(
                format("Failed to save work state for development stream with id %s",
                    dto.getProjectId(), e));
        }
    }

    private Snapshot doCreateSnapshot(Branch branch, NewSnapshotDto dto) {
        try {
            val newSnapshot = snapshotRepository.saveAndFlush(Snapshot.builder()
                .branch(branch)
                .data(dto.getData())
                .comment(dto.getComment())
                .build());
            return newSnapshot;
        } catch (ConstraintViolationException | DataIntegrityViolationException e) {
            throw new CustomBadArgumentException(
                format("Failed to save work state for branch with id %s",
                    dto.getBranchId(), e));
        }
    }
}
package com.example.lab.projects.controller;

import com.example.lab.projects.controller.util.PaginationHeader;
import com.example.lab.projects.dto.NewSnapshotDto;
import com.example.lab.projects.dto.NewSnapshotWithBranchDto;
import com.example.lab.projects.dto.SnapshotDto;
import com.example.lab.projects.service.SnapshotService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SnapshotControllerDelegate implements SnapshotsApiDelegate {
    private final SnapshotService service;

    @Override
    public ResponseEntity<SnapshotDto> createSnapshotWithBranch(NewSnapshotWithBranchDto dto) {
        val snapshotDto = service.createSnapshotWithBranch(dto);
        return ResponseEntity.ok(snapshotDto);
    }

    @Override
    public ResponseEntity<SnapshotDto> createSnapshot(NewSnapshotDto dto) {
        val snapshotDto = service.createSnapshot(dto);
        return ResponseEntity.ok(snapshotDto);
    }

    @Override
    public ResponseEntity<List<SnapshotDto>> findSnapshotsByProjectId(
        UUID id, Integer page, Integer size) {
        val snapshotsPage = service.findSnapshotsByProjectId(id, PageRequest.of(page, size));
        return ResponseEntity.ok()
            .headers(PaginationHeader.of(snapshotsPage))
            .body(snapshotsPage.getContent());
    }

    @Override
    public ResponseEntity<List<SnapshotDto>> findSnapshotsByBranchId(UUID branchId, Integer page, Integer size) {
        val snapshotsPage = service.findSnapshotsByBranchId(branchId, PageRequest.of(page, size));
        return ResponseEntity.ok()
                .headers(PaginationHeader.of(snapshotsPage))
                .body(snapshotsPage.getContent());
    }

    @Override
    public ResponseEntity<SnapshotDto> findSnapshotById(UUID id) {
        val optionalSnapshot = service.findSnapshotsById(id);
        return ResponseEntity.of(optionalSnapshot);
    }
}

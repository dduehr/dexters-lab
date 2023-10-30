package com.example.lab.projects.controller;

import com.example.lab.projects.controller.util.PaginationHeader;
import com.example.lab.projects.dto.BranchDto;
import com.example.lab.projects.service.BranchService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BranchControllerDelegate implements BranchesApiDelegate {
    final BranchService branchService;

    @Override
    public ResponseEntity<BranchDto> findBranchById(UUID id) {
        val optionalBranch = branchService.findBranchById(id);
        return ResponseEntity.of(optionalBranch);
    }

    @Override
    public ResponseEntity<List<BranchDto>> findBranchesByProjectId(UUID projectId, Integer page, Integer size) {
        val branchesPage = branchService.findAllBranchesByProjectId(projectId, PageRequest.of(page, size));
        return ResponseEntity.ok()
                .headers(PaginationHeader.of(branchesPage))
                .body(branchesPage.getContent());
    }
}

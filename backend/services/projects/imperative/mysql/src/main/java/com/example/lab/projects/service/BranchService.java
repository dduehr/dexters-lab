package com.example.lab.projects.service;

import com.example.lab.projects.dto.BranchDto;
import com.example.lab.projects.mapper.BranchMapper;
import com.example.lab.projects.repository.BranchRepository;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = {Exception.class})
public class BranchService {
    private final BranchRepository branchRepository;

    public Optional<BranchDto> findBranchById(UUID branchId) {
        return branchRepository.findById(branchId)
                .map(BranchMapper.INSTANCE::toDto);
    }

    public Page<BranchDto> findAllBranchesByProjectId(UUID projectId, Pageable pageRequest) {
        return branchRepository.findByProjectIdOrderByName(projectId, pageRequest)
                .map(BranchMapper.INSTANCE::toDto);
    }
}

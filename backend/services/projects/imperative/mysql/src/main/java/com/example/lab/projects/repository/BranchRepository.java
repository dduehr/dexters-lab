package com.example.lab.projects.repository;

import com.example.lab.projects.model.Branch;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BranchRepository extends JpaRepository<Branch, UUID> {

    @Query("SELECT b FROM Branch b WHERE b.project.id = :id ORDER BY b.name")
    Page<Branch> findByProjectIdOrderByName(@Param("id") UUID projectId, Pageable pageRequest);
}

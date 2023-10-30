package com.example.lab.projects.repository;

import com.example.lab.projects.model.Snapshot;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SnapshotRepository extends JpaRepository<Snapshot, UUID> {
    @Query("SELECT s FROM Snapshot s WHERE s.branch.id = :id ORDER BY s.createdAt DESC")
    Page<Snapshot> findByBranchIdOrderByCreatedAt(@Param("id") UUID branchId, Pageable pageable);

    @Query("SELECT s FROM Snapshot s JOIN s.branch b WHERE b.project.id = :id ORDER BY s.createdAt DESC")
    Page<Snapshot> findByProjectIdOrderByCreatedAt(@Param("id") UUID developmentStreamId, Pageable pageable);
}

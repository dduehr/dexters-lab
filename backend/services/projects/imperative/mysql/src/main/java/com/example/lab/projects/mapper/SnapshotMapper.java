package com.example.lab.projects.mapper;

import com.example.lab.projects.dto.SnapshotDto;
import com.example.lab.projects.model.Snapshot;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SnapshotMapper {
    SnapshotMapper INSTANCE = Mappers.getMapper(SnapshotMapper.class);

    SnapshotDto toDto(Snapshot entity);

    default OffsetDateTime map(LocalDateTime localDateTime) {
        return OffsetDateTime.of(localDateTime, ZoneOffset.UTC);
    }
}

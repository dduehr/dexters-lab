package com.example.lab.projects.mapper;

import static java.lang.String.format;

import com.example.lab.projects.dto.BranchDto;
import com.example.lab.projects.dto.DefaultBranchDto;
import com.example.lab.projects.model.Branch;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface BranchMapper {
    BranchMapper INSTANCE = Mappers.getMapper(BranchMapper.class);

    BranchDto toDto(Branch entity);

    default DefaultBranchDto toDefaultDto(Branch entity) {
        if (entity == null) {
            return null;
        }

        if (!entity.isDefaultBranch()) {
            throw new IllegalArgumentException(
                format("The branch with id %s is not a default branch", entity.getId()));
        }

        return new DefaultBranchDto()
            .id(entity.getId())
            .name(entity.getName());
    }
}

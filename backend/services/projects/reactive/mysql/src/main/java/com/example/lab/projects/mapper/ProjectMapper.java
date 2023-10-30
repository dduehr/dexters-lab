package com.example.lab.projects.mapper;

import com.example.lab.projects.dto.NewProjectDto;
import com.example.lab.projects.dto.ProjectDto;
import com.example.lab.projects.model.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
    ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);


    // FIXME branches and defaultBranch not supported by ProjectMapper.toDto
    @Mapping(target = "defaultBranch", expression = "java(null)")
    ProjectDto toDto(Project project);

    @Mapping(target = "id", expression = "java(null)")
    // FIXME branches and defaultBranch not supported by ProjectMapper.toEntity
    // @Mapping(target = "branches", expression = "java(null)")
    // @Mapping(target = "defaultBranch", expression = "java(null)")
    Project toEntity(NewProjectDto dto);
}

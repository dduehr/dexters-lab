package com.example.lab.projects.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.r2dbc.core.R2dbcEntityOperations;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import reactor.core.publisher.Mono;

@Component
@Transactional
@RequiredArgsConstructor
public class InsertRepositoryImpl<T, ID> implements InsertRepository<T, ID> {
    final R2dbcEntityOperations entityOperations;

    @Override
    public <S extends T> Mono<S> insert(S entity) {
        Assert.notNull(entity, "Entity to insert must not be null");
        return entityOperations.insert(entity);
    }
}

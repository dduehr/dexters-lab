package com.example.lab.projects.repository;

import reactor.core.publisher.Mono;

public interface InsertRepository<T, ID> {
    <S extends T> Mono<S> insert(S entity);
}

package com.example.lab.projects.controller.util;

import java.util.function.Consumer;
import lombok.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;

@Value(staticConstructor = "of")
public class PaginationHeader<T> implements Consumer<HttpHeaders> {
    private final Page<T> page;

    @Override
    public void accept(HttpHeaders httpHeaders) {
        httpHeaders.set("Pagination-CurrentPage", Integer.toString(page.getNumber()));
        httpHeaders.set("Pagination-PageCount", Integer.toString(page.getTotalPages()));
    }
}

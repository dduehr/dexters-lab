package com.example.lab.projects.exeption;

import jakarta.servlet.http.HttpServletRequest;
import java.net.URI;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    ProblemDetail handle(CustomDataConflictException exception, HttpServletRequest request) {
        return createProblemDetail(exception, request, HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    ProblemDetail handle(CustomBadArgumentException exception, HttpServletRequest request) {
        return createProblemDetail(exception, request, HttpStatus.BAD_REQUEST);
    }

    ProblemDetail createProblemDetail(CustomException exception, HttpServletRequest request, HttpStatus status) {
        val problemDetail = ProblemDetail.forStatus(status.value());
        problemDetail.setTitle(exception.getTitle());
        problemDetail.setDetail(exception.getMessage());
        problemDetail.setType(URI.create("about:blank"));
        problemDetail.setProperty("hostname", request.getServerName());
        return problemDetail;
    }
}

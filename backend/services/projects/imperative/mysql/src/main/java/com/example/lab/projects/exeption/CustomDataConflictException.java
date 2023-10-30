package com.example.lab.projects.exeption;

public class CustomDataConflictException extends RuntimeException implements CustomException {

    public CustomDataConflictException(String message) {
        super(message);
    }

    public CustomDataConflictException(String message, Throwable cause) {
        super(message, cause);
    }

    @Override
    public String getTitle() {
        return "Conflict";
    }
}

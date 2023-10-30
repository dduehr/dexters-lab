package com.example.lab.projects.exeption;

public class CustomBadArgumentException extends RuntimeException implements CustomException {

    @Override
    public String getTitle() {
        return "Bad Arguments";
    }

    public CustomBadArgumentException(String message) {
        super(message);
    }

    public CustomBadArgumentException(String message, Throwable cause) {
        super(message, cause);
    }
}

package com.example.lab.projects.util;

import static org.apache.commons.lang3.exception.ExceptionUtils.getRootCause;

import java.util.function.Function;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.val;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ExceptionUtil {

    public static RuntimeException wrappedInitialCause(
        RuntimeException exception, Function<Throwable, RuntimeException> wrapper) {
        val rootCause = getRootCause(exception);
        return rootCause != null ? wrapper.apply(rootCause) : null;
    }
}

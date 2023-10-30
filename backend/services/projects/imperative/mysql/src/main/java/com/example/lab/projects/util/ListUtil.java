package com.example.lab.projects.util;

import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.val;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ListUtil {

    public static <T> List<T> copyOf(List<T> list, T value) {
        if (value == null) {
            return list;
        }
        if (list == null) {
            return List.of(value);
        }
        val newList = new ArrayList<T>(list);
        newList.add(value);
        return List.copyOf(newList);
    }
}

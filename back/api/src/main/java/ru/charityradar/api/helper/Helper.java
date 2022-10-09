package ru.charityradar.api.helper;

public class Helper {
    public static String getErrorJson(String errorText) {
        return "{\"error\":{\"" + errorText + "\"}";
    }
}

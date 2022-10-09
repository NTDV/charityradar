package ru.charityradar.api.helper;

public class Helper {

    public static final String passRegex = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$";
    public static String getErrorJson(String errorText) {
        return "{\"error\":{\"" + errorText + "\"}";
    }
}

package ru.charityradar.api.constant;

import jdk.jshell.spi.ExecutionControl;
import ru.charityradar.api.helper.ProjectProperties;

import java.util.Objects;

public class Development {
    public static final boolean isDevelopment = Objects.equals(ProjectProperties.ProjectProperty.DEVELOPMENT_TOKEN_AUTOREFRESH.getCachedValue(), "true");
    public static void throwIfNotDevelopment() throws ExecutionControl.NotImplementedException {
        if (!isDevelopment) throw new ExecutionControl.NotImplementedException("Development mode access only!");
    }
}

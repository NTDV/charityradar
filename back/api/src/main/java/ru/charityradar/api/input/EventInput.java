package ru.charityradar.api.input;

import lombok.Data;

@Data
public class EventInput {
    private String name;
    private String address;
    private String dateTime;
    private String description;
    private Integer fundId;
}

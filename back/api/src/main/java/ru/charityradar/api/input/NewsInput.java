package ru.charityradar.api.input;

import lombok.Data;

@Data
public class NewsInput {

    private String name;
    private String date;
    private String description;
    private String image;
    private Integer fundId;
}

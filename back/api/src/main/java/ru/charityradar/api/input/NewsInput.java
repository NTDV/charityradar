package ru.charityradar.api.input;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NewsInput {

    private String name;
    private String date;
    private String description;
    private String image;
    private Integer fundId;
}

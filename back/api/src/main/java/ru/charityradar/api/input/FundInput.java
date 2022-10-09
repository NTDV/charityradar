package ru.charityradar.api.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FundInput {
    private String name;
    private String image;
    private String email;
    private String description;
    private Float rating;
}

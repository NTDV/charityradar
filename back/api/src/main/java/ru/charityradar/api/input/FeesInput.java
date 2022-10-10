package ru.charityradar.api.input;

import lombok.Data;
import ru.charityradar.api.constant.FeeStatus;

@Data
public class FeesInput {
    private String name;
    private Integer goal;
    private String startDate;
    private String endDate;
    private String description;
    private FeeStatus status;
    private Integer collected;
    private Integer fundId;
    private String image;
}

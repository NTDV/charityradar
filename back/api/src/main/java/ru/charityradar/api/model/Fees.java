package ru.charityradar.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.charityradar.api.constant.FeeStatus;
import ru.charityradar.api.input.FeesInput;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Fees {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private String name;
    private Integer goal;
    private String startDate;
    private String endDate;
    private String description;
    private FeeStatus status;
    private Integer collected;
    private Integer fundId;
    private String image;


    public Fees(FeesInput feesInput) {
        this.name = feesInput.getName();
        this.goal = feesInput.getGoal();
        this.startDate = feesInput.getStartDate();
        this.endDate = feesInput.getEndDate();
        this.description = feesInput.getDescription();
        this.status = feesInput.getStatus();
        this.collected = feesInput.getCollected();
        this.fundId = feesInput.getFundId();
        this.image = feesInput.getImage();
    }
}

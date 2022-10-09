package ru.charityradar.api.model;

import lombok.NoArgsConstructor;
import ru.charityradar.api.input.EventInput;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private String name;
    private String address;
    private String dateTime;
    private String description;
    private Integer fundId;

    public Event (EventInput eventInput) {
        this.name = eventInput.getName();
        this.address = eventInput.getAddress();
        this.dateTime = eventInput.getDateTime();
        this.description = eventInput.getDescription();
        this.fundId = eventInput.getFundId();
    }

}

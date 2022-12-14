package ru.charityradar.api.model;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.charityradar.api.input.FundInput;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Fund {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private String name;
    private String email;
    private String phone;
    private String image;
    private String description;
    private Float rating;
    private String balanceId;

    public Fund(final FundInput fundInput) {
        this.name = fundInput.getName();
        this.email = fundInput.getEmail();
        this.phone = fundInput.getPhone();
        this.image= fundInput.getImage();
        this.description = fundInput.getDescription();
        this.rating = fundInput.getRating();
    }

    public Fund edit(final FundInput fundInput) {
        this.name = fundInput.getName();
        this.email = fundInput.getEmail();
        this.phone = fundInput.getPhone();
        this.image= fundInput.getImage();
        this.description = fundInput.getDescription();
        return this;
    }

    public Fund editImage(final String image) {
        this.image = image;
        return this;
    }
}

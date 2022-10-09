package ru.charityradar.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Getter
@Setter
public class Balance {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private UUID id;
    private Float balance;

    public Balance() {
        this.id = UUID.randomUUID();
        this.balance = 0.0f;
    }

}

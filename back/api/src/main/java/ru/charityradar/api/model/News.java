package ru.charityradar.api.model;


import lombok.*;
import ru.charityradar.api.input.NewsInput;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;
@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class News {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private String name;
    private String date;
    private String description;
    private String image;
    private Integer fundId;

    public News(final NewsInput newsInput) {
        this.name = newsInput.getName();
        this.date = newsInput.getDate();
        this.description = newsInput.getDescription();
        this.image = newsInput.getImage();
        this.fundId = newsInput.getFundId();
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

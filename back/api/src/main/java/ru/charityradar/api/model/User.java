package ru.charityradar.api.model;

import lombok.*;
import org.hibernate.Hibernate;
import ru.charityradar.api.dto.VTBMe;
import ru.charityradar.api.input.UserInput;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private String name;

    private String surname;

    private String patronymic;

    private String phone;
    private String email;
    private String balanceId;

    public User(final UserInput userInput) {
        this.name = userInput.getName();
        this.surname = userInput.getSurname();
        this.patronymic = userInput.getPatronymic();
        this.email = userInput.getEmail();
        this.phone = userInput.getPhone();
    }

    public User(final VTBMe me) {
        this.name = me.name();
        this.surname = me.surname();
        this.patronymic = me.patronymic();
        this.email = me.email();
        this.phone = me.mainMobilePhone();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return id != null && Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

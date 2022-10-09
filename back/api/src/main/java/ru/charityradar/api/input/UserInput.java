package ru.charityradar.api.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInput {
    private String name;
    private String surname;
    private String patronymic;
    private String email;
    private String phone;
}

package ru.charityradar.api.input;

import lombok.Data;

@Data
public class AuthInput {
    private String login;
    private String password;
    private Integer type;
}

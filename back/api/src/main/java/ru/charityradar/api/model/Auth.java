package ru.charityradar.api.model;

import lombok.NoArgsConstructor;
import ru.charityradar.api.helper.AuthHash;
import ru.charityradar.api.input.AuthInput;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.security.NoSuchAlgorithmException;

@Entity
@NoArgsConstructor
public class Auth {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;
    private String login;
    private String password;
    private Integer type;
    private Integer link;

    public Auth(AuthInput authInput, Integer link, Integer type) throws NoSuchAlgorithmException {
        login = authInput.getLogin();
        password = AuthHash.getSecureHash(authInput.getPassword(), authInput.getLogin());
        this.type = type;
        this.link = link;
    }
}

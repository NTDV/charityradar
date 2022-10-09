package ru.charityradar.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.charityradar.api.helper.AuthHash;
import ru.charityradar.api.input.AuthInput;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

@Entity
@NoArgsConstructor
@Getter
public class Auth {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;
    private String login;
    @Setter
    private String password;
    @Setter
    private String token;
    private Integer type;
    private Integer link;
    @Setter
    private boolean confirmed;

    public Auth(AuthInput authInput, Integer link, Integer type) throws NoSuchAlgorithmException {
        login = authInput.getLogin();
        password = AuthHash.getSecureHash(authInput.getPassword(), authInput.getLogin());
        this.token = UUID.randomUUID().toString();
        this.confirmed = false;
        this.type = type;
        this.link = link;
    }
}

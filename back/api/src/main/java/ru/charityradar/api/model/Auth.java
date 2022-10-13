package ru.charityradar.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;
import ru.charityradar.api.dto.VTBMasterToken;
import ru.charityradar.api.dto.VTBMe;
import ru.charityradar.api.helper.AuthHash;
import ru.charityradar.api.input.AuthInput;

import javax.persistence.*;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

@Entity
@NoArgsConstructor
@Getter
public class Auth {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;
    @Setter
    @Nullable
    private String vtbMdmId;
    @Nullable
    private String login;
    @Setter
    @Nullable
    private String password;
    @Setter
    private String token;
    @Setter
    @Nullable
    @Column(columnDefinition = "TEXT")
    private String vtbToken;
    private Integer type;
    @Nullable
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

    public Auth(final VTBMe me, final User user, final VTBMasterToken token) {
        this.vtbMdmId = me.mdmId();
        this.vtbToken = token.access_token();
        this.token = UUID.randomUUID().toString();
        this.confirmed = true;
        this.type = 1;
        this.link = user.getId();
    }
}

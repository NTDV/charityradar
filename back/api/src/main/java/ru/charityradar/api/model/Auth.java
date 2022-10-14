package ru.charityradar.api.model;

import jdk.jshell.spi.ExecutionControl;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;
import ru.charityradar.api.dto.VTB.VTBMasterToken;
import ru.charityradar.api.dto.VTB.VTBMe;
import ru.charityradar.api.helper.AuthHash;
import ru.charityradar.api.helper.ProjectProperties;
import ru.charityradar.api.input.AuthInput;

import javax.persistence.*;
import javax.security.sasl.AuthenticationException;
import java.security.NoSuchAlgorithmException;
import java.util.Objects;
import java.util.UUID;

import static ru.charityradar.api.constant.Development.isDevelopment;

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

    public Auth(final VTBMe vtbMe, final User user, final VTBMasterToken token) {
        this.vtbMdmId = vtbMe.mdmId();
        this.vtbToken = token.access_token();
        this.token = UUID.randomUUID().toString();
        this.confirmed = true;
        this.type = 1;
        this.link = user.getId();
    }

    public Auth(final VTBMe vtbMe, final User user, final VTBMasterToken token, final String login, final String password)
            throws ExecutionControl.NotImplementedException {
        this(vtbMe, user, token);
        if (!Objects.equals(ProjectProperties.ProjectProperty.DEVELOPMENT_TOKEN_AUTOREFRESH.getCachedValue(), "true"))
            throw new ExecutionControl.NotImplementedException("Development mode access only!");
        this.login = login;
        this.password = password;
    }

    @Nullable
    public String getVtbToken() throws AuthenticationException {
        if (isDevelopment) return VTBMasterToken.generate(login, password).access_token();
        return vtbToken;
    }
}

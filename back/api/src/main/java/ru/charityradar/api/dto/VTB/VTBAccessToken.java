package ru.charityradar.api.dto.VTB;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;
import ru.charityradar.api.helper.ProjectProperties;

import javax.security.sasl.AuthenticationException;
import java.util.List;

public record VTBAccessToken(String access_token, String refresh_token, String scope, String id_token) {
    @SuppressWarnings("CopyConstructorMissesField")
    public VTBAccessToken(final VTBAccessToken vtbAccessToken) throws NullPointerException {
        this(vtbAccessToken.access_token(), vtbAccessToken.refresh_token(), vtbAccessToken.scope(), vtbAccessToken.id_token());
    }

    public static VTBAccessToken generate(final VTBMasterToken vtbMasterToken) throws AuthenticationException {
        final var headers = new HttpHeaders();
        headers.setBearerAuth(vtbMasterToken.access_token());
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        final var body = "{\"grant_type\": \"code\"}";
        final var response = new RestTemplate()
                .postForEntity(ProjectProperties.ProjectProperty.AUTH_VTBID_ACCESS_TOKEN_URL.getCachedValue(), new HttpEntity<>(body, headers) , VTBAccessToken.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            final var accessToken = response.getBody();
            if (accessToken != null) {
                try {
                    return new VTBAccessToken(accessToken);
                } catch (final NullPointerException e) {
                    throw new AuthenticationException(HttpStatus.BAD_REQUEST.getReasonPhrase());
                }
            } else {
                throw new AuthenticationException(HttpStatus.UNAUTHORIZED.getReasonPhrase());
            }
        } else {
            throw new AuthenticationException(response.getStatusCode().getReasonPhrase());
        }
    }

    public static VTBAccessToken generate(final String login, final String password) throws AuthenticationException {
        return generate(VTBMasterToken.generate(login, password));
    }
}

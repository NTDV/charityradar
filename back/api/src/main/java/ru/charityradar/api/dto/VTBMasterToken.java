package ru.charityradar.api.dto;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.security.sasl.AuthenticationException;
import java.util.List;

import static ru.charityradar.api.helper.ProjectProperties.ProjectProperty;

public record VTBMasterToken(String access_token, Integer expires_in, Integer refresh_expires_in, String token_type, String scope) {
    @SuppressWarnings("CopyConstructorMissesField")
    public VTBMasterToken(final VTBMasterToken masterToken) throws NullPointerException {
        this(masterToken.access_token(), masterToken.expires_in(), masterToken.refresh_expires_in(), masterToken.token_type(), masterToken.scope());
    }

    public static VTBMasterToken generate(final String login, final String password) throws AuthenticationException {
        final var headers = new HttpHeaders();
        headers.setBasicAuth(login, password);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        final var body = new LinkedMultiValueMap<>();
        body.add("grant_type", "client_credentials");
        final var response = new RestTemplate()
                .postForEntity(ProjectProperty.AUTH_VTBID_MASTER_TOKEN_URL.getCachedValue(), new HttpEntity<>(body, headers) , VTBMasterToken.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            final var masterToken = response.getBody();
            if (masterToken != null) {
                try {
                    return new VTBMasterToken(masterToken);
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
}

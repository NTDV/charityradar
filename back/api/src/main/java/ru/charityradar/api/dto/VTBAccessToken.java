package ru.charityradar.api.dto;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

public record VTBAccessToken(String access_token, Integer expires_in, String token_type, String scope) {
    public static Optional<String> generate() {
        final var headers = new HttpHeaders();
        headers.setBasicAuth("e3tjbGllbnRfaWR9fTp7e2NsaWVudF9zZWNyZXR9fQ==");
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        final var body = new LinkedMultiValueMap<>();
        body.add("client_id","team13");
        body.add("client_secret","NhwqcMQLDovYSQbj7TyyfS5PvhmLTMAQ");
        body.add("grant_type","client_credentials");
        final var response = new RestTemplate()
                .postForEntity("https://auth.bankingapi.ru/auth/realms/kubernetes/protocol/openid-connect/token", new HttpEntity<>(body, headers) , VTBAccessToken.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            final var responseBody = response.getBody();
            if (responseBody != null) return Optional.ofNullable(responseBody.access_token());
        }
        return Optional.empty();
    }
}

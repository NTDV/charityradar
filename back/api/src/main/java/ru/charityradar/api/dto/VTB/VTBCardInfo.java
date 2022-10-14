package ru.charityradar.api.dto.VTB;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import ru.charityradar.api.helper.ProjectProperties;
import ru.charityradar.api.model.Auth;

import javax.security.sasl.AuthenticationException;
import java.util.List;
import java.util.UUID;

public record VTBCardInfo(String cardExpiry, String embossingName, String encryptedPan) {
    @SuppressWarnings("CopyConstructorMissesField")
    public VTBCardInfo(final VTBCardInfo cardinfo) {
        this(cardinfo.cardExpiry(), cardinfo.embossingName(), cardinfo.encryptedPan());
    }

    @SuppressWarnings("DuplicatedCode")
    public static VTBCardInfo generate(final Auth auth, final Integer cardId) throws AuthenticationException {
        if (auth == null || auth.getVtbToken() == null) throw new AuthenticationException("Can not get VTB ID info for user.");
        final var headers = new HttpHeaders();
        headers.setBearerAuth(auth.getVtbToken());
        headers.set("X-IBM-Client-Id", ProjectProperties.ProjectProperty.CONSTANT_X_IBM_CLIENT_ID.getCachedValue());
        headers.set("X-PARTNER-ID", ProjectProperties.ProjectProperty.CONSTANT_X_PARTNER_ID.getCachedValue());
        headers.set("x-client-channel", ProjectProperties.ProjectProperty.CONSTANT_X_CLIENT_CHANNEL_WEB.getCachedValue());
        headers.set("X-Mdm-Id", auth.getVtbMdmId());
        headers.set("clientOpenKey", UUID.randomUUID().toString());
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        final var response = new RestTemplate()
                .exchange(ProjectProperties.ProjectProperty.CARDINFO_VTB_CREDENTIALS_URL.getCachedValue() + "/" + cardId, HttpMethod.GET, new HttpEntity<>(headers) , VTBCardInfo.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            final var cardInfo = response.getBody();
            if (cardInfo != null) {
                try {
                    return new VTBCardInfo(cardInfo);
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

package ru.charityradar.api.dto.VTB;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import ru.charityradar.api.helper.ProjectProperties;

import javax.security.sasl.AuthenticationException;
import java.util.List;

public record VTBMe(String surname, String name, String patronymic, String gender, String birthPlace,
                    String birthDate, String maritalStatus, String mainMobilePhone, String mobilePhone, String email,
                    VTBSimpleAddres registrationAddress, VTBSimpleAddres temporaryAddress, VTBSimpleAddres actualAddress,
                    String snils, String inn, VTBRussianPassport rfPassport, String mdmId) {
    @SuppressWarnings("CopyConstructorMissesField")
    public VTBMe(final VTBMe vtbMe) throws NullPointerException {
        this(vtbMe.surname(), vtbMe.name(), vtbMe.patronymic(), vtbMe.gender(), vtbMe.birthPlace(),
                vtbMe.birthDate(), vtbMe.maritalStatus(), vtbMe.mainMobilePhone(), vtbMe.mobilePhone(),
                vtbMe.email(), vtbMe.registrationAddress(), vtbMe.temporaryAddress(), vtbMe.actualAddress(),
                vtbMe.snils(), vtbMe.inn(), vtbMe.rfPassport(), vtbMe.mdmId());
    }

    @SuppressWarnings("unused")
    public static VTBMe generate(final String login, final String password) throws AuthenticationException {
        return generate(VTBMasterToken.generate(login, password));
    }

    public static VTBMe generate(final VTBMasterToken accessToken) throws AuthenticationException {
        final var headers = new HttpHeaders();
        headers.setBearerAuth(accessToken.access_token());
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        final var response = new RestTemplate()
                .exchange(ProjectProperties.ProjectProperty.AUTH_VTBID_ME_URL.getCachedValue(), HttpMethod.GET, new HttpEntity<>(headers) , VTBMe.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            final var me = response.getBody();
            if (me != null) {
                try {
                    return new VTBMe(me);
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

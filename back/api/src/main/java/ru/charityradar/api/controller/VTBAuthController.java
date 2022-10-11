package ru.charityradar.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import ru.charityradar.api.dto.VTBAccessToken;
import ru.charityradar.api.dto.VTBMe;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/openid/vtb")
public class VTBAuthController {
    @Autowired
    private HttpServletRequest request;

    @GetMapping("/login")
    public ResponseEntity<?> login() throws IOException, InterruptedException, URISyntaxException {
        final var token = VTBAccessToken.generate();
        if (token.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        final var headers = new HttpHeaders();
        headers.setBearerAuth(token.get());
        // todo Так как происходит переадресация на другой домен, то заголовок с авторизацией не сохраняется.
        //  Ссылку снизу нужно обработать на фронте, выудить token из query и подставить в Authorization Bearer ...
        headers.setLocation(new URI("https://hackaton.bankingapi.ru/api/vtbid/v1/oauth2/authorize?redirect_uri=http://iotachi.ru/openid/vtb/success&state=TEST&client_id=team13&response_type=code&token="+ token.get()));

        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

    @GetMapping("/me")
    public ResponseEntity<?> me() {
        final var token = request.getHeader("Authorization");
        if (token == null || token.isBlank()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        final var headers = new HttpHeaders();
        headers.set("Authorization", token);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        final var response = new RestTemplate()
                .exchange("https://hackaton.bankingapi.ru/api/vtbid/v1/oauth2/me", HttpMethod.GET, new HttpEntity<>(headers) , VTBMe.class);
        final var status = response.getStatusCode();
        if (status.is2xxSuccessful()) {
            final var body = response.getBody();
            if (body != null) return new ResponseEntity<>(body, HttpStatus.OK);
            else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else return new ResponseEntity<>(status);
    }
}

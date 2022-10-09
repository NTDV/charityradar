package ru.charityradar.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.charityradar.api.model.Auth;
import ru.charityradar.api.service.AuthService;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/activate_email")
public class RestController {

    @Autowired
    private final AuthService _authService;

    public RestController(AuthService authService) {
        _authService = authService;
    }


    @GetMapping("/{token}")
    public String activateAuth(@PathVariable String token) {
        Auth auth = _authService.getAuthByToken(token);

        if (auth.getId() > 0) {
            _authService.setConfirmed(auth);
            return "<p>Вы успешно подтвердили свою почту!</p>";
        } else {
            return "<p>Что то пошло не так!</p>";
        }
    }

}

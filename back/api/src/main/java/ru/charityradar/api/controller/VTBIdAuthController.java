package ru.charityradar.api.controller;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.charityradar.api.model.Auth;
import ru.charityradar.api.service.VTBIdAuthService;

import javax.security.sasl.AuthenticationException;

@Controller
@NoArgsConstructor
public class VTBIdAuthController {
    @Autowired
    private VTBIdAuthService _vtbIdAuthService;

    @QueryMapping
    public Auth authByVTBId(@Argument final String login, @Argument final String password) throws AuthenticationException {
        return _vtbIdAuthService.authByVTBId(login, password);
    }
}

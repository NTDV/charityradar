package ru.charityradar.api.controller;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.charityradar.api.input.AuthInput;
import ru.charityradar.api.input.FundInput;
import ru.charityradar.api.input.UserInput;
import ru.charityradar.api.model.Auth;
import ru.charityradar.api.service.AuthService;

import java.security.NoSuchAlgorithmException;

@Controller
@NoArgsConstructor
public class AuthController {

    @Autowired
    private AuthService _authService;

    @MutationMapping
    public Auth addUserAuth(@Argument final AuthInput authInput, @Argument final UserInput userInput) throws NoSuchAlgorithmException {
        return  _authService.registerAuth(authInput, userInput);
    }
    @MutationMapping
    public Auth addFundAuth(@Argument final AuthInput authInput, @Argument final FundInput fundInput) throws NoSuchAlgorithmException {
        return  _authService.registerAuth(authInput, fundInput);
    }

    @QueryMapping
    public Auth getAuthByLogin(@Argument final String login) {
        return _authService.getAuthByLogin(login);
    }


    @QueryMapping
    public String authByLoginPass(@Argument final String login, @Argument final String password) throws NoSuchAlgorithmException {
        return _authService.authByLoginPass(login, password);
    }

    @QueryMapping
    public Iterable<Auth> getAllAuth() {
        return _authService.getAllAuth();
    }


}

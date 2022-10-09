package ru.charityradar.api.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.charityradar.api.input.UserInput;
import ru.charityradar.api.model.User;
import ru.charityradar.api.service.UserService;

@AllArgsConstructor
@Controller
public class UserController {
    @Autowired
    private final UserService _userService;

    @QueryMapping
    public Iterable<User> getAllUsers() {
        return _userService.getAllUsers();
    }

    @QueryMapping
    public User getUserByEmail(@Argument final String email) {
        return _userService.getUserByEmail(email);
    }
    @QueryMapping
    public User getUserById(@Argument final Integer id) {
        return _userService.getUserById(id);
    }
}
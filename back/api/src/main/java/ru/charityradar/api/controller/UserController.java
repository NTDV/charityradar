package ru.charityradar.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.charityradar.api.model.User;
import ru.charityradar.api.repository.UserRepository;

import java.util.List;

@Controller
public class UserController {
    //@Autowired
    private final UserRepository _userRepository;

    public UserController(final UserRepository userRepository) {
        _userRepository = userRepository;
    }

    @MutationMapping
    public User addUser(final String name, final String email) {
        final var user = new User(name, email);
        return _userRepository.save(user);
    }

    @QueryMapping
    public Iterable<User> getAllUsers() {
        return _userRepository.findAll();
    }
}
package ru.charityradar.api.controller;

import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.charityradar.api.input.UserInput;
import ru.charityradar.api.model.User;
import ru.charityradar.api.repository.UserRepository;

@AllArgsConstructor
@Controller
public class UserController {
    //@Autowired
    private final UserRepository _userRepository;

    @MutationMapping
    public User addUser(@Argument final UserInput userInput) {
        final var user = new User(userInput);
        return _userRepository.save(user);
    }

    @QueryMapping
    public Iterable<User> getAllUsers() {
        return _userRepository.findAll();
    }
}
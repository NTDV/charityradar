package ru.charityradar.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.stereotype.Service;
import ru.charityradar.api.input.UserInput;
import ru.charityradar.api.model.User;
import ru.charityradar.api.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository _userRepository;

    public User addUser(@Argument final UserInput userInput) {
        final var user = new User(userInput);
        return _userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return _userRepository.getUserByEmail(email);
    }

}

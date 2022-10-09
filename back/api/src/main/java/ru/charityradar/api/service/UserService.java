package ru.charityradar.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.stereotype.Service;
import ru.charityradar.api.input.UserInput;
import ru.charityradar.api.model.User;
import ru.charityradar.api.repository.UserRepository;

import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository _userRepository;

    public User addUser(@Argument final UserInput userInput, @Argument final UUID balanceId) {
        final var user = new User(userInput);
        user.setBalanceId(balanceId);
        return _userRepository.save(user);
    }

    public Iterable<User> getAllUsers() {
        return _userRepository.findAll();
    }

    public User getUserByEmail(String email) {
        return _userRepository.getUserByEmail(email);
    }
    public User getUserById(Integer id) {
        return _userRepository.getUserById(id);
    }

}

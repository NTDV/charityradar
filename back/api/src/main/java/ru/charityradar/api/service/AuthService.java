package ru.charityradar.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.stereotype.Service;
import ru.charityradar.api.helper.MailSender;
import ru.charityradar.api.input.AuthInput;
import ru.charityradar.api.input.FundInput;
import ru.charityradar.api.input.UserInput;
import ru.charityradar.api.model.Auth;
import ru.charityradar.api.repository.AuthRepository;

import java.security.NoSuchAlgorithmException;

@Service
public class AuthService {
    @Autowired
    private AuthRepository _authRepository;
    @Autowired
    private UserService _userService;
    @Autowired
    private FundService _fundService;

    public Auth registerAuth(@Argument final AuthInput authInput, @Argument final UserInput userInput) throws NoSuchAlgorithmException {
        try {
            MailSender.sendLetterToSomebodyFromRobot("Попытка зарегистрировать пользователя",
                    "email: " + userInput.getEmail() +
                            "\nname: " + userInput.getName() +
                            "\nsurname: " + userInput.getSurname() +
                            "\nphone: " + userInput.getPhone(), "mail@sganiev.ru"
            );
        } catch (Exception e) {
            System.out.println("MailSender.sendLetterToSomebodyFromRobot : ERROR");
        }
        if (getAuthByLogin(authInput.getLogin()) == null && _userService.getUserByEmail(userInput.getEmail()) == null) {
            final var user = _userService.addUser(userInput);
            final var auth = new Auth(authInput, user.getId(), 1);
            return _authRepository.save(auth);
        } else {
            return null;
        }
    }
    public Auth registerAuth(@Argument final AuthInput authInput, @Argument final FundInput fundInput) throws NoSuchAlgorithmException {
        try {
            MailSender.sendLetterToSomebodyFromRobot("Попытка зарегистрировать пользователя",
                    "email: " + fundInput.getEmail() +
                            "\nname: " + fundInput.getName() +
                            "\ndescription: " + fundInput.getDescription() +
                            "\nimage: " + fundInput.getImage(), "mail@sganiev.ru"
            );
        } catch (Exception e) {
            System.out.println("MailSender.sendLetterToSomebodyFromRobot : ERROR");
        }
        if (getAuthByLogin(authInput.getLogin()) == null && _fundService.getFundByEmail(fundInput.getEmail()) == null) {
            final var fund = _fundService.addFund(fundInput);
            final var auth = new Auth(authInput, fund.getId(), 2);
            return _authRepository.save(auth);
        } else {
            return null;
        }
    }
    public Auth getAuthByLogin(String login) {
        return _authRepository.getAuthByLogin(login);
    }
}

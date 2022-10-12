package ru.charityradar.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.stereotype.Service;
import ru.charityradar.api.dto.VTBAccessToken;
import ru.charityradar.api.helper.AuthHash;
import ru.charityradar.api.helper.Helper;
import ru.charityradar.api.helper.MailSender;
import ru.charityradar.api.helper.ProjectProperties;
import ru.charityradar.api.input.AuthInput;
import ru.charityradar.api.input.FundInput;
import ru.charityradar.api.input.UserInput;
import ru.charityradar.api.mixed.BalanceMixed;
import ru.charityradar.api.model.Auth;
import ru.charityradar.api.model.User;
import ru.charityradar.api.repository.AuthRepository;

import javax.security.sasl.AuthenticationException;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.Properties;
import java.util.UUID;

@Service
public class AuthService {
    @Autowired
    private AuthRepository _authRepository;
    @Autowired
    private UserService _userService;
    @Autowired
    private FundService _fundService;
    @Autowired
    private BalanceService _balanceService;

    @Autowired
    private TransactionService _transactionService;

    public Auth registerAuth(@Argument final AuthInput authInput, @Argument final UserInput userInput) throws NoSuchAlgorithmException {
        Properties properties = ProjectProperties.getProperties();
        String url = properties.getProperty("main.url");
        if (getAuthByLogin(authInput.getLogin()) == null && _userService.getUserByEmail(userInput.getEmail()) == null) {
            final var balance = _balanceService.createBalance();
            final var user = _userService.addUser(userInput, balance.getId());
            final var auth = new Auth(authInput, user.getId(), 1);
            Auth authOb = _authRepository.save(auth);
            if (authOb.getId() != null) {
                try {
                    MailSender.sendLetterToSomebodyFromRobot("Регистрация пользователя в Charity Radar",
                            "Благодарим вас за регистрацию в системе Charity Radar.<br><br>" +
                                    "Нажмите на ссылку ниже, чтобы подтвердить ваш адрес электронной почты.<br><br>" +
                                    "<a target='_blank' href='" + url + "activate_email/" + authOb.getToken() + "'>" +
                                    url + "activate_email/" + authOb.getToken() + "</a><br><br>" +
                                    "С наилучшими пожеланиями,<br>Команда Charity Radar", "mail@sganiev.ru");
                } catch (Exception e) {
                    System.out.println("MailSender.sendLetterToSomebodyFromRobot : ERROR");
                }
            }
            return authOb;
        } else {
            return null;
        }
    }
    public Auth registerAuth(@Argument final AuthInput authInput, @Argument final FundInput fundInput) throws NoSuchAlgorithmException {
        Properties properties = ProjectProperties.getProperties();
        String url = properties.getProperty("main.url");
        if (getAuthByLogin(authInput.getLogin()) == null && _fundService.getFundByEmail(fundInput.getEmail()) == null) {
            final var balance = _balanceService.createBalance();
            final var fund = _fundService.addFund(fundInput, balance.getId());
            final var auth = new Auth(authInput, fund.getId(), 2);
            Auth authOb = _authRepository.save(auth);
            if (authOb.getId() != null) {
                try {
                    MailSender.sendLetterToSomebodyFromRobot("Регистрация Фонда в Charity Radar",
                            "Благодарим вас за регистрацию в системе Charity Radar.<br><br>" +
                                    "Нажмите на ссылку ниже, чтобы подтвердить адрес электронной почты.<br><br>" +
                                    "<a target='_blank' href='" + url + "activate_email/" + authOb.getToken() + "'>" +
                                    url + "activate_email/" + authOb.getToken() + "</a><br><br>" +
                                    "С наилучшими пожеланиями,<br>Команда Charity Radar", "mail@sganiev.ru");
                } catch (Exception e) {
                    System.out.println("MailSender.sendLetterToSomebodyFromRobot : ERROR");
                }
            }
            return authOb;
        } else {
            return null;
        }
    }
    public Auth getAuthByLogin(String login) {
        return _authRepository.getAuthByLogin(login);
    }

    public VTBAccessToken authByVTBId(String login, String pass) throws AuthenticationException {
        return VTBAccessToken.generate(login, pass);
    }

    public Auth authByLoginPass(String login, String pass) throws NoSuchAlgorithmException {
        Auth auth = getAuthByLogin(login);
        return setNewUUIDToken(auth, login, pass);
    }

    public Iterable<Auth> getAllAuth() {
        return _authRepository.findAll();
    }

    public BalanceMixed getBalanceInfo(String token) {
        Auth auth = _authRepository.getAuthByToken(token);
        User  user = _userService.getUserById(auth.getLink());
        Date[] dates = Helper.getMonthStartEndNow();
        return new BalanceMixed(_balanceService.getBalanceAmountById(user.getBalanceId()),
                _transactionService.getMonthTransactionsByUserId(user.getId(), dates[0], dates[1]));
    }

    public Auth getAuthByToken(String token) {
        return _authRepository.getAuthByToken(token);
    }

    public void setConfirmed(Auth auth) {
        auth.setConfirmed(true);
        _authRepository.save(auth);
    }

    public void setNewPassword(Auth auth, String pass1) throws NoSuchAlgorithmException {
        auth.setPassword(AuthHash.getSecureHash(pass1, auth.getLogin()));
        _authRepository.save(auth);
    }

    public Boolean sendLetterToConfirmEmail(String token) {
        Properties properties = ProjectProperties.getProperties();
        String url = properties.getProperty("main.url");
        Auth auth = getAuthByToken(token);
        if (auth!= null && auth.getId() > 0){
            try {
                MailSender.sendLetterToSomebodyFromRobot("Регистрация в Charity Radar",
                        "Благодарим вас за регистрацию в системе Charity Radar.<br><br>" +
                                "Нажмите на ссылку ниже, чтобы подтвердить адрес электронной почты.<br><br>" +
                                "<a target='_blank' href='" + url + "activate_email/" + auth.getToken() + "'>" +
                                url + "activate_email/" + auth.getToken() + "</a><br><br>" +
                                "С наилучшими пожеланиями,<br>Команда Charity Radar", "mail@sganiev.ru");
            } catch (Exception e) {
                System.out.println("MailSender.sendLetterToSomebodyFromRobot : ERROR");
            }
            return true;
        } else {
            return false;
        }
    }

    public Boolean sendLetterToResetPassword(String login) {
        Properties properties = ProjectProperties.getProperties();
        String url = properties.getProperty("main.url");
        Auth auth = getAuthByLogin(login);
        if (auth != null && auth.getId() > 0){
            try {
                MailSender.sendLetterToSomebodyFromRobot("Сброс пароля в Charity Radar",
                        "Получен запрос на сброс пароля в Charity Radar.<br><br>" +
                                "Перейдите по ссылке, чтобы ввести новый пароль:<br>" +
                                "<a target='_blank' href='" + url + "reset_password/" + auth.getToken() + "'>" +
                                url + "reset_password/" + auth.getToken() + "</a><br><br>" +
                                "Если вы не подавали этот запрос, не беспокойтесь! Ваш пароль в безопасности. " +
                                "Вы можете просто удалить это сообщение c электронной почты.<br><br>" +
                                "С наилучшими пожеланиями,<br>Команда Charity Radar", "mail@sganiev.ru");
            } catch (Exception e) {
                System.out.println("MailSender.sendLetterToSomebodyFromRobot : ERROR");
            }
            return true;
        } else {
            return false;
        }
    }

    public Auth setNewUUIDToken(Auth auth, String login, String pass) throws NoSuchAlgorithmException {
        if (AuthHash.getSecureHash(pass, login).equals(auth.getPassword())) {
            String token = UUID.randomUUID().toString();
            auth.setToken(token);
            _authRepository.save(auth);
            return auth;
        } else {
            return null;
        }
    }

}

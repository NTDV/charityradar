package ru.charityradar.api.service.VTB;

import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.charityradar.api.dto.VTB.VTBMasterToken;
import ru.charityradar.api.dto.VTB.VTBMe;
import ru.charityradar.api.helper.MailSender;
import ru.charityradar.api.model.Auth;
import ru.charityradar.api.repository.AuthRepository;
import ru.charityradar.api.service.BalanceService;
import ru.charityradar.api.service.UserService;

import javax.security.sasl.AuthenticationException;

import static ru.charityradar.api.constant.Development.isDevelopment;
import static ru.charityradar.api.constant.Development.throwIfNotDevelopment;

@Service
public class VTBAuthService {
    @Autowired
    private AuthRepository _authRepository;
    @Autowired
    private UserService _userService;
    @Autowired
    private BalanceService _balanceService;

    private Auth getAuthByMdmId(final String mdmId) {
        return _authRepository.getAuthByVtbMdmId(mdmId);
    }

    private Auth registerByVTBId(final VTBMe vtbMe, final VTBMasterToken accessToken) {
        if (getAuthByMdmId(vtbMe.mdmId()) == null && _userService.getUserByEmail(vtbMe.email()) == null) {
            final var auth = _authRepository.save(
                    new Auth(vtbMe,
                            _userService.addUser(vtbMe, _balanceService.createBalance()),
                            accessToken));
            if (auth.getId() != null) {
                try {
                    MailSender.sendLetterToSomebodyFromRobot(
                            "Регистрация пользователя в Charity Radar", """
                            Благодарим вас за регистрацию в системе Charity Radar.<br><br>
                            С наилучшими пожеланиями,<br>Команда Charity Radar""",
                            vtbMe.email());
                } catch (Exception e) {
                    System.out.println("MailSender.sendLetterToSomebodyFromRobot : ERROR");
                }
            }
            return auth;
        } else {
            return null;
        }
    }

    private Auth registerByVTBId(final VTBMe vtbMe, final VTBMasterToken accessToken, final String login, final String pass)
            throws ExecutionControl.NotImplementedException {
        throwIfNotDevelopment();
        if (getAuthByMdmId(vtbMe.mdmId()) == null && _userService.getUserByEmail(vtbMe.email()) == null) {
            final var auth = _authRepository.save(
                    new Auth(vtbMe,
                            _userService.addUser(vtbMe, _balanceService.createBalance()),
                            accessToken, login, pass));
            if (auth.getId() != null) {
                try {
                    MailSender.sendLetterToSomebodyFromRobot(
                            "Регистрация пользователя в Charity Radar", """
                            Благодарим вас за регистрацию в системе Charity Radar.<br><br>
                            С наилучшими пожеланиями,<br>Команда Charity Radar""",
                            vtbMe.email());
                } catch (Exception e) {
                    System.out.println("MailSender.sendLetterToSomebodyFromRobot : ERROR");
                }
            }
            return auth;
        } else {
            return null;
        }
    }

    public Auth authByVTBId(final String login, final String pass) throws AuthenticationException, ExecutionControl.NotImplementedException {
        final var accessToken = VTBMasterToken.generate(login, pass);
        final var me = VTBMe.generate(accessToken);
        final var auth = getAuthByMdmId(me.mdmId());
        if (auth == null) {
            if (isDevelopment) return registerByVTBId(me,accessToken, login, pass);
            else return registerByVTBId(me, accessToken);
        } else return auth;
    }
}

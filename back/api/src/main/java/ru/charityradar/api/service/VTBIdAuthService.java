package ru.charityradar.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.charityradar.api.dto.VTBMasterToken;
import ru.charityradar.api.dto.VTBMe;
import ru.charityradar.api.helper.MailSender;
import ru.charityradar.api.model.Auth;
import ru.charityradar.api.repository.AuthRepository;

import javax.security.sasl.AuthenticationException;

@Service
public class VTBIdAuthService {
    @Autowired
    private AuthRepository _authRepository;
    @Autowired
    private UserService _userService;
    @Autowired
    private BalanceService _balanceService;

    private Auth getAuthByMdmId(final String mdmId) {
        return _authRepository.getAuthByVtbMdmId(mdmId);
    }

    private Auth registerByVTBId(final VTBMe me, final VTBMasterToken accessToken) {
        if (getAuthByMdmId(me.mdmId()) == null && _userService.getUserByEmail(me.email()) == null) {
            final var auth = _authRepository.save(
                    new Auth(me,
                            _userService.addUser(me, _balanceService.createBalance()),
                            accessToken));
            if (auth.getId() != null) {
                try {
                    MailSender.sendLetterToSomebodyFromRobot(
                            "Регистрация пользователя в Charity Radar", """
                            Благодарим вас за регистрацию в системе Charity Radar.<br><br>
                            С наилучшими пожеланиями,<br>Команда Charity Radar""",
                            me.email());
                } catch (Exception e) {
                    System.out.println("MailSender.sendLetterToSomebodyFromRobot : ERROR");
                }
            }
            return auth;
        } else {
            return null;
        }
    }

    public Auth authByVTBId(String login, String pass) throws AuthenticationException {
        final var accessToken = VTBMasterToken.generate(login, pass);
        final var me = VTBMe.generate(accessToken);
        final var auth = getAuthByMdmId(me.mdmId());
        if (auth == null) return registerByVTBId(me, accessToken);
        else return auth;
    }
}

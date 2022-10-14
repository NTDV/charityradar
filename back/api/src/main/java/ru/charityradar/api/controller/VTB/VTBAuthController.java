package ru.charityradar.api.controller.VTB;

import jdk.jshell.spi.ExecutionControl;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.charityradar.api.model.Auth;
import ru.charityradar.api.service.VTB.VTBAuthService;

import javax.security.sasl.AuthenticationException;

@Controller
@NoArgsConstructor
public class VTBAuthController {
    @Autowired
    private VTBAuthService _vtbIdVTBAuthService;

    @QueryMapping
    public Auth authByVTBId(@Argument final String login, @Argument final String password)
            throws AuthenticationException, ExecutionControl.NotImplementedException {
        return _vtbIdVTBAuthService.authByVTBId(login, password);
    }
}

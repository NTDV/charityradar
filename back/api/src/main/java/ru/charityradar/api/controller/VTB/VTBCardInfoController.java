package ru.charityradar.api.controller.VTB;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.charityradar.api.dto.CardInfo;
import ru.charityradar.api.service.VTB.VTBCardInfoService;

import javax.security.sasl.AuthenticationException;

@Controller
@NoArgsConstructor
public class VTBCardInfoController {
    @Autowired
    private VTBCardInfoService _vtbCardInfoService;

    @QueryMapping
    public CardInfo getMainCardInfo(@Argument final String token) throws AuthenticationException {
        return CardInfo.generate(_vtbCardInfoService.getMainCardInfo(token));
    }
}

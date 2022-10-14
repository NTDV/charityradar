package ru.charityradar.api.controller.VTB;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.charityradar.api.dto.CardInfo;
import ru.charityradar.api.input.CardInput;
import ru.charityradar.api.model.Balance;
import ru.charityradar.api.service.VTB.VTBCardInfoService;

import javax.security.sasl.AuthenticationException;
import java.text.ParseException;

@Controller
@NoArgsConstructor
public class VTBCardInfoController {
    @Autowired
    private VTBCardInfoService _vtbCardInfoService;

    @QueryMapping
    public CardInfo getMainCardInfo(@Argument final String token) throws AuthenticationException {
        return CardInfo.generate(_vtbCardInfoService.getMainCardInfo(token));
    }

    @QueryMapping
    public Balance payToFund(@Argument final String token, @Argument final CardInput card, @Argument final Float amount, @Argument final String fundId) throws AuthenticationException, ParseException {
        return _vtbCardInfoService.payToFund(token, card, amount, fundId);
    }

    @QueryMapping
    public Integer payToFees(@Argument final String token, @Argument final CardInput card, @Argument final Integer amount, @Argument final String fundId) throws AuthenticationException, ParseException {
        return _vtbCardInfoService.payToFees(token, card, amount, fundId);
    }
}

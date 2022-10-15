package ru.charityradar.api.controller.VTB;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.charityradar.api.dto.IntegerAndBalance;
import ru.charityradar.api.input.CardInput;
import ru.charityradar.api.model.Balance;
import ru.charityradar.api.service.VTB.VTBCardInfoService;

import javax.security.sasl.AuthenticationException;
import java.text.ParseException;

@Controller
@AllArgsConstructor
public class VTBPaymentController {
    @Autowired
    private VTBCardInfoService _vtbCardInfoService;


    @QueryMapping
    public Balance payToFund(@Argument final String token, @Argument final CardInput card, @Argument final Float amount, @Argument final String fundId) throws AuthenticationException, ParseException {
        return _vtbCardInfoService.payToFund(token, card, amount, fundId);
    }

    @QueryMapping
    public Integer payToFees(@Argument final String token, @Argument final CardInput card, @Argument final Integer amount, @Argument final String feesId) throws AuthenticationException, ParseException {
        return _vtbCardInfoService.payToFees(token, card, amount, feesId);
    }

    @QueryMapping
    public Balance[] payToFundByBalance(@Argument final String token, @Argument final Float amount, @Argument final String fundId) throws ParseException {
        return _vtbCardInfoService.payToFundByBalance(token, amount, fundId);
    }

    @QueryMapping
    public IntegerAndBalance payToFeesByBalance(@Argument final String token, @Argument final Integer amount, @Argument final String feesId) throws ParseException {
        return _vtbCardInfoService.payToFeesByBalance(token, amount, feesId);
    }

    @QueryMapping
    public Balance addToUserBalance(@Argument final String token, @Argument final CardInput card, @Argument final Float amount) throws AuthenticationException, ParseException {
        return _vtbCardInfoService.addToUserBalance(token, card, amount);
    }

    @QueryMapping
    public IntegerAndBalance payFromFundToFees(@Argument final String token, @Argument final Integer amount, @Argument final String feesId) throws AuthenticationException, ParseException {
        return _vtbCardInfoService.payFromFundToFees(token, amount, feesId);
    }
}

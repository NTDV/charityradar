package ru.charityradar.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.charityradar.api.model.Balance;
import ru.charityradar.api.service.BalanceService;

@Controller
public class BalanceController {
    @Autowired
    private BalanceService _balanceService;

    @QueryMapping
    public Balance getBalanceByFundId(final String fundId) {
        return _balanceService.getBalanceByFundId(fundId);
    }
}

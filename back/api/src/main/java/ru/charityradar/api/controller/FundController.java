package ru.charityradar.api.controller;

import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.charityradar.api.mixed.FundMixed;
import ru.charityradar.api.model.Fund;
import ru.charityradar.api.service.FundService;

@AllArgsConstructor
@Controller
public class FundController {
    private final FundService _fundService;

    @QueryMapping
    public Iterable<FundMixed> getAllFunds() {
        return _fundService.getAllFunds();
    }

    @QueryMapping
    public Fund getFundById(@Argument final Integer id) {
        return _fundService.getFundById(id);
    }

    @QueryMapping
    public Iterable<FundMixed> getTopFund() {
        return _fundService.getTopFund();
    }
}

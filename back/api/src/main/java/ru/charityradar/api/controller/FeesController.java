package ru.charityradar.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.charityradar.api.model.Fees;
import ru.charityradar.api.input.FeesInput;
import ru.charityradar.api.service.FeesService;

@Controller
public class FeesController {

    @Autowired
    private FeesService _feesService;


    @MutationMapping
    public Fees addFees(@Argument final FeesInput feesInput) {
        return _feesService.addFees(feesInput);
    }
    @QueryMapping
    public Iterable<Fees> getAllFees() {
        return _feesService.getAllFees();
    }

    @QueryMapping
    public Iterable<Fees> getFeesByFundId(@Argument final Integer fundId) {
        return _feesService.getFeesByFundId(fundId);
    }

    @QueryMapping
    public Iterable<Fees> getTopFees() {
        return _feesService.getTopFees();
    }

    @QueryMapping
    public Fees getFeesById(@Argument final Integer feesId) {
        return _feesService.getFeesById(feesId);
    }
}

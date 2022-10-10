package ru.charityradar.api.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.charityradar.api.input.FundInput;
import ru.charityradar.api.model.Fund;
import ru.charityradar.api.repository.FundRepository;
import ru.charityradar.api.service.FundService;

import java.util.Optional;

@AllArgsConstructor
@Controller
public class FundController {
    private final FundService _fundService;

    @QueryMapping
    public Iterable<Fund> getAllFunds() {
        return _fundService.getAllFunds();
    }

    public Fund setImage(@Argument final Fund fund, @Argument final String image) {
        return _fundService.setImage(fund, image);
    }

    @QueryMapping
    public Fund getFundById(@Argument final Integer id) {
        return _fundService.getFundById(id);
    }

    @QueryMapping
    public Iterable<Fund> getTopFund() {
        return _fundService.getTopFund();
    }
}

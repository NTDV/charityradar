package ru.charityradar.api.controller;

import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.charityradar.api.input.FundInput;
import ru.charityradar.api.model.Fund;
import ru.charityradar.api.repository.FundRepository;

import java.util.Optional;

@AllArgsConstructor
@Controller
public class FundController {
    private final FundRepository _fundRepository;

    @MutationMapping
    public Fund addFund(@Argument final FundInput fundInput) {
        final var fund = new Fund(fundInput);
        return _fundRepository.save(fund);
    }

    @QueryMapping
    public Iterable<Fund> getAllFunds() {
        return _fundRepository.findAll();
    }

    @QueryMapping
    public Optional<Fund> getFundById(@Argument final Integer id) {
        return _fundRepository.findById(id);
    }
}

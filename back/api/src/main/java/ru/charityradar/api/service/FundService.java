package ru.charityradar.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.charityradar.api.input.FundInput;
import ru.charityradar.api.model.Fund;
import ru.charityradar.api.repository.FundRepository;

@Service
public class FundService {

    @Autowired
    private FundRepository _fundRepository;
    public Fund addFund(FundInput fundInput) {
        final var fund = new Fund(fundInput);
        return _fundRepository.save(fund);
    }

    public Fund getFundByEmail(String email) {
        return _fundRepository.getAuthByEmail(email);
    }
}

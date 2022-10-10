package ru.charityradar.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.charityradar.api.input.FeesInput;
import ru.charityradar.api.input.FundInput;
import ru.charityradar.api.model.Fees;
import ru.charityradar.api.model.Fund;
import ru.charityradar.api.repository.FundRepository;

import java.util.stream.StreamSupport;

@Service
public class FundService {

    @Autowired
    private FundRepository _fundRepository;
    public Fund addFund(FundInput fundInput, String balanceId) {
        final var fund = new Fund(fundInput);
        fund.setBalanceId(balanceId);
        return _fundRepository.save(fund);
    }

    public Fund getFundByEmail(String email) {
        return _fundRepository.getFundByEmail(email);
    }

    public Fund getFundById(Integer id) {
        return _fundRepository.getFundById(id);
    }

    public Iterable<Fund> getTopFund() {
        return StreamSupport.stream(_fundRepository.findAll().spliterator(), false).sorted((fund1, fund2) -> (int) (fund2.getRating() - fund1.getRating())).limit(10).toList();
    }
    public Iterable<Fund> getAllFunds() {
        return _fundRepository.findAll();
    }
}

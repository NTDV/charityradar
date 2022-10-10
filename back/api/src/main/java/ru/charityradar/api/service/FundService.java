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
    private FundService _fundService;
    public Fund addFund(FundInput fundInput, String balanceId) {
        final var fund = new Fund(fundInput);
        fund.setBalanceId(balanceId);
        return _fundRepository.save(fund);
    }

    public Fund setImage(Fund fund, String image) {
        fund.setImage(image);
        return _fundRepository.save(fund);
    }

    public Fund getFundByEmail(String email) {
        return _fundRepository.getFundByEmail(email);
    }

    public Fund getFundById(Integer id) {
        return _fundRepository.getFundById(id);
    }
}

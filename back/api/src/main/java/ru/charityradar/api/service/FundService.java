package ru.charityradar.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.charityradar.api.input.FundInput;
import ru.charityradar.api.mixed.FundMixed;
import ru.charityradar.api.model.Fund;
import ru.charityradar.api.repository.FundRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class FundService {
    @Autowired
    private FundRepository _fundRepository;
    @Autowired
    private FeesService _feesService;

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

    public Iterable<FundMixed> getTopFund() {
        List<Fund> allFunds = StreamSupport.stream(_fundRepository.findAll().spliterator(), false).
                sorted((fund1, fund2) -> (int) (fund2.getRating() - fund1.getRating())).limit(10).toList();
        if (allFunds.size() > 0) {
            List<FundMixed> result = new ArrayList<>();
            for (Fund fund : allFunds) {
                FundMixed mixed = new FundMixed(fund, Collections.singletonList(_feesService.findFirstByFundId(fund.getId())));
                result.add(mixed);
            }
            return result;
        } else return null;

    }
    public List<FundMixed> getAllFunds() {
        Iterable<Fund> allFunds = _fundRepository.findAll();
        List<FundMixed> result = new ArrayList<>();
        for (Fund fund : allFunds) {
            FundMixed mixed = new FundMixed(fund, Collections.singletonList(_feesService.findFirstByFundId(fund.getId())));
            result.add(mixed);
        }
        return result;
    }

}

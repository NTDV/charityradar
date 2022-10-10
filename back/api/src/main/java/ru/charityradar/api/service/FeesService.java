package ru.charityradar.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.charityradar.api.input.FeesInput;
import ru.charityradar.api.model.Fees;
import ru.charityradar.api.repository.FeesRepository;

@Service
public class FeesService {

    @Autowired
    private FeesRepository _feesRepository;


    public Fees addFees(FeesInput feesInput) {
        final var fees = new Fees(feesInput);
        return _feesRepository.save(fees);
    }

    public Fees setImage(Fees fees, String image) {
        fees.setImage(image);
        return _feesRepository.save(fees);
    }

    public Iterable<Fees> getAllFees() {
        return _feesRepository.findAll();
    }

    public Iterable<Fees> getFeesByFundId(Integer fundId) {
        return _feesRepository.findFeesByFundId(fundId);
    }
    public Fees getFeesById(Integer feesId) {
        return _feesRepository.findFeesById(feesId);
    }

}

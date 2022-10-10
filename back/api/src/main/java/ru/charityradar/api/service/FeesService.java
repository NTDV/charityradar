package ru.charityradar.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.charityradar.api.helper.Helper;
import ru.charityradar.api.input.FeesInput;
import ru.charityradar.api.model.Fees;
import ru.charityradar.api.model.Fund;
import ru.charityradar.api.repository.FeesRepository;

import java.text.ParseException;
import java.util.Date;
import java.util.stream.StreamSupport;

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

    public Iterable<Fees> getTopFees() {
        return StreamSupport.stream(_feesRepository.findAll().spliterator(), false).sorted((fees1, fees2) ->
        {
            try {
                return (int) (Helper.dateFormatter.parse(fees1.getEndDate()).getTime() - Helper.dateFormatter.parse(fees2.getEndDate()).getTime());
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }).filter(fees -> {
            try {
                return Helper.dateFormatter.parse(fees.getEndDate()).after(new Date());
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }).limit(10).toList();
    }

}

package ru.charityradar.api.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.charityradar.api.dto.FundAndFees;
import ru.charityradar.api.model.Fees;
import ru.charityradar.api.model.Fund;
import ru.charityradar.api.repository.FeesRepository;
import ru.charityradar.api.repository.FundRepository;

@Service
@AllArgsConstructor
public class SearchService {
    @Autowired
    private final FundRepository _fundRepository;
    @Autowired
    private final FeesRepository _feesRepository;

    public FundAndFees searchFundAndFeesByName(final String query) {
        return new FundAndFees(
                _fundRepository.findByNameContainsIgnoreCaseOrDescriptionContainsIgnoreCase(query, query).toArray(Fund[]::new),
                _feesRepository.findByNameContainsIgnoreCaseOrDescriptionContainsIgnoreCase(query, query).toArray(Fees[]::new));
    }
}

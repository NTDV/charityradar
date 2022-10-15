package ru.charityradar.api.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.charityradar.api.dto.FundAndFees;
import ru.charityradar.api.service.SearchService;

@Controller
@AllArgsConstructor
public class SearchController {
    @Autowired
    private final SearchService _searchService;

    @QueryMapping
    public FundAndFees searchFundAndFeesByName(@Argument final String query) {
        return _searchService.searchFundAndFeesByName(query);
    }
}

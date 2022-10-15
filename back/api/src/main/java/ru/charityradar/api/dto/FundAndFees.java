package ru.charityradar.api.dto;

import ru.charityradar.api.model.Fees;
import ru.charityradar.api.model.Fund;

public record FundAndFees(Fund[] fund, Fees[] fees) { }

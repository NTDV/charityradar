package ru.charityradar.api.input;

import lombok.Data;
import ru.charityradar.api.constant.TransactionType;
import ru.charityradar.api.constant.TransactionStatus;

@Data
public class TransactionInput {
    private TransactionType type;
    private TransactionStatus status;
    private Integer feesId;
    private Integer fundId;
    private Integer userId;
    private String document;
}

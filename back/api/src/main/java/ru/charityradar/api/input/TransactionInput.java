package ru.charityradar.api.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import ru.charityradar.api.constant.TransactionType;
import ru.charityradar.api.constant.TransactionStatus;

@Data
@AllArgsConstructor
public class TransactionInput {
    private TransactionType type;
    private Float amount;
    private String dateTime;
    private TransactionStatus status;
    private Integer feesId;
    private Integer fundId;
    private Integer userId;
    private String document;
}

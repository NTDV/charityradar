package ru.charityradar.api.model;

import lombok.NoArgsConstructor;
import ru.charityradar.api.constant.TransactionType;
import ru.charityradar.api.constant.TransactionStatus;
import ru.charityradar.api.input.TransactionInput;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@NoArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private UUID id;
    private TransactionType type;
    private Float amount;
    private TransactionStatus status;
    private Integer feesId;
    private Integer fundId;
    private Integer userId;
    private String document;

    public Transaction(TransactionInput transactionInput) {
        this.type = transactionInput.getType();
        this.amount = transactionInput.getAmount();
        this.status = transactionInput.getStatus();
        this.feesId = transactionInput.getFeesId();
        this.fundId = transactionInput.getFundId();
        this.userId = transactionInput.getUserId();
        this.document = transactionInput.getDocument();
    }
}

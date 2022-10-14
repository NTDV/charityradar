package ru.charityradar.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;
import lombok.Setter;
import ru.charityradar.api.constant.TransactionType;
import ru.charityradar.api.constant.TransactionStatus;
import ru.charityradar.api.input.TransactionInput;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.text.ParseException;
import java.util.UUID;

@Entity
@NoArgsConstructor
@Getter
public class Transaction {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private UUID id;
    private TransactionType type;
    @Nullable
    private String name;
    @Nullable
    private String category;
    private String dateTime;
    private Float amount;
    private TransactionStatus status;
    private Integer feesId;
    private Integer fundId;
    private Integer userId;
    @Setter
    private String document;

    public Transaction(TransactionInput transactionInput) {
        this.type = transactionInput.getType();
        this.amount = transactionInput.getAmount();
        this.name = transactionInput.getName();
        this.category = transactionInput.getCategory();
        this.dateTime = transactionInput.getDateTime();
        this.status = transactionInput.getStatus();
        this.feesId = transactionInput.getFeesId();
        this.fundId = transactionInput.getFundId();
        this.userId = transactionInput.getUserId();
        this.document = transactionInput.getDocument();
    }
}

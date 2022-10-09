package ru.charityradar.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.charityradar.api.input.TransactionInput;
import ru.charityradar.api.model.Transaction;
import ru.charityradar.api.service.TransactionService;

@Controller
public class TransactionController {


    @Autowired
    private TransactionService _transactionService;

    @MutationMapping
    public Transaction addTransaction(@Argument final TransactionInput transactionInput) {
        return  _transactionService.addTransaction(transactionInput);
    }

    @QueryMapping
    public Iterable<Transaction> getTransactionsByUserId(@Argument final Integer userId) {
        return _transactionService.getTransactionsByUserId(userId);
    }

    @QueryMapping
    public Iterable<Transaction> getTransactionsByFundId(@Argument final Integer fundId) {
        return _transactionService.getTransactionsByFundId(fundId);
    }
}

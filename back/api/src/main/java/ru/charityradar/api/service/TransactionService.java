package ru.charityradar.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.charityradar.api.input.TransactionInput;
import ru.charityradar.api.model.Transaction;
import ru.charityradar.api.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository _transactionRepository;

    public Transaction addTransaction(TransactionInput transactionInput) {
        final var transaction = new Transaction(transactionInput);
        return _transactionRepository.save(transaction);
    }

    public Iterable<Transaction> getTransactionsByUserId(Integer userId) {
        return _transactionRepository.getTransactionsByUserId(userId);
    }
    public Iterable<Transaction> getTransactionsByFundId(Integer fundId) {
        return _transactionRepository.getTransactionsByFundId(fundId);
    }
}

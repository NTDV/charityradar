package ru.charityradar.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.charityradar.api.constant.TransactionType;
import ru.charityradar.api.model.Transaction;

import java.util.UUID;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, UUID> {

    Iterable<Transaction> getTransactionsByUserId(Integer userId);
    Iterable<Transaction> getTransactionsByFundId(Integer fundId);
    Iterable<Transaction> getTransactionsByFundIdAndType(Integer userId, TransactionType type);
    Transaction getTransactionById(Integer transactionId);

}

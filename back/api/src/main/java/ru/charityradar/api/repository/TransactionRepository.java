package ru.charityradar.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.stereotype.Repository;
import ru.charityradar.api.input.TransactionInput;
import ru.charityradar.api.model.Transaction;

import java.util.UUID;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, UUID> {

    Iterable<Transaction> getTransactionsByUserId(Integer userId);
    Iterable<Transaction> getTransactionsByFundId(Integer userId);

}

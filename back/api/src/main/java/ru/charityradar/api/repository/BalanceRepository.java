package ru.charityradar.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.charityradar.api.model.Balance;

import java.util.UUID;

@Repository
public interface BalanceRepository extends CrudRepository<Balance, UUID> {
    Balance getBalanceById(String id);
}

package ru.charityradar.api.repository;

import org.springframework.data.repository.CrudRepository;
import ru.charityradar.api.model.Fees;

public interface FeesRepository extends CrudRepository<Fees, Integer> {
    Iterable<Fees> findFeesByFundId(Integer fundId);

    Fees findFeesById(Integer feesId);

    Fees findFirstByFundId(Integer fundId);
}

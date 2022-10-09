package ru.charityradar.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.charityradar.api.model.Fund;

@Repository
public interface FundRepository extends CrudRepository<Fund, Integer> {
    Fund getFundByEmail(String login);
    Fund getFundById(Integer id);

}

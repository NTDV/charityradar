package ru.charityradar.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.charityradar.api.model.Fund;

import java.util.List;

@Repository
public interface FundRepository extends CrudRepository<Fund, Integer> {
    Fund getFundByEmail(String login);
    Fund getFundById(Integer id);
    List<Fund> findByNameContainsIgnoreCaseOrDescriptionContainsIgnoreCase(String name, String description);
}

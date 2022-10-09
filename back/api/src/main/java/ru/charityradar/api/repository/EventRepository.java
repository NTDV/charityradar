package ru.charityradar.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.charityradar.api.model.Event;

@Repository
public interface EventRepository extends CrudRepository<Event, Integer> {

    Iterable<Event> findEventsByFundId(Integer fundId);

}

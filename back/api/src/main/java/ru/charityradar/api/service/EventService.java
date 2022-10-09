package ru.charityradar.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.charityradar.api.input.EventInput;
import ru.charityradar.api.model.Event;
import ru.charityradar.api.repository.EventRepository;

@Service
public class EventService {
    @Autowired
    private EventRepository _eventRepository;


    public Event addFees(EventInput eventInput) {
        final var event = new Event(eventInput);
        return _eventRepository.save(event);
    }

    public Iterable<Event> getAllEvents() {
        return _eventRepository.findAll();
    }

    public Iterable<Event> getEventsByFundId(Integer fundId) {
        return _eventRepository.findEventsByFundId(fundId);
    }
}

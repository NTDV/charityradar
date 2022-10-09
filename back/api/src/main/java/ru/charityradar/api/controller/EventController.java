package ru.charityradar.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.charityradar.api.input.EventInput;
import ru.charityradar.api.model.Event;
import ru.charityradar.api.service.EventService;

@Controller
public class EventController {

    @Autowired
    private EventService _eventService;


    @MutationMapping
    public Event addEvent(@Argument final EventInput eventInput) {
        return _eventService.addFees(eventInput);
    }
    @QueryMapping
    public Iterable<Event> getAllEvents() {
        return _eventService.getAllEvents();
    }

    @QueryMapping
    public Iterable<Event> getEventsByFundId(@Argument final Integer fundId) {
        return _eventService.getEventsByFundId(fundId);
    }
}

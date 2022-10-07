package ru.charityradar.api.controller;

import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.charityradar.api.repository.NewsRepository;
import ru.charityradar.api.model.News;

import java.util.List;

@AllArgsConstructor
@Controller
public class NewsController {
    private final NewsRepository _newsRepository;

    @QueryMapping
    public List<News> getAllNews() {
        return _newsRepository.getAll();
    }
}

package ru.charityradar.api.controller;

import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.charityradar.api.input.NewsInput;
import ru.charityradar.api.repository.NewsRepository;
import ru.charityradar.api.model.News;

import java.util.List;


@AllArgsConstructor
@Controller
public class NewsController {
    private final NewsRepository _newsRepository;

    @MutationMapping
    public News addNews(@Argument final NewsInput newsInput) {
        final var news = new News(newsInput);
        return _newsRepository.save(news);
    }
    @QueryMapping
    public Iterable<News> getAllNews() {
        return _newsRepository.findAll();
    }
    @QueryMapping
    public Iterable<News> getNewsByFundId(@Argument final Integer fundId) {
        return _newsRepository.findNewsByFundId(fundId);
    }
}

package ru.charityradar.api.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.charityradar.api.input.NewsInput;
import ru.charityradar.api.model.News;
import ru.charityradar.api.service.NewsService;


@AllArgsConstructor
@Controller
public class NewsController {

    @Autowired
    private NewsService _newsService;
    @MutationMapping
    public News addNews(@Argument final NewsInput newsInput) {
        return _newsService.addNews(newsInput);
    }

    public News setImage(@Argument final News news,@Argument final String image) {
        return _newsService.setImage(news, image);
    }
    @QueryMapping
    public Iterable<News> getAllNews() {
        return _newsService.getAllNews();
    }
    @QueryMapping
    public Iterable<News> getNewsByFundId(@Argument final Integer fundId) {
        return _newsService.getNewsByFundId(fundId);
    }

    public News getNewsById(@Argument final Integer newsId){
        return _newsService.getNewsById(newsId);
    }
}

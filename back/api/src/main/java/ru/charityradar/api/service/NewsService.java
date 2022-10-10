package ru.charityradar.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.charityradar.api.input.NewsInput;
import ru.charityradar.api.model.News;
import ru.charityradar.api.repository.NewsRepository;

@Service
public class NewsService {

    @Autowired
    private NewsRepository _newsRepository;

    public News addNews(NewsInput newsInput) {
        final var news = new News(newsInput);
        return _newsRepository.save(news);
    }

    public News setImage(News news, String image) {
        news.setImage(image);
        return _newsRepository.save(news);
    }
    public Iterable<News> getAllNews() {
        return _newsRepository.findAll();
    }


    public Iterable<News> getNewsByFundId(Integer fundId) {
        return _newsRepository.findNewsByFundId(fundId);
    }

    public News getNewsById(Integer newsId) {
        return _newsRepository.findNewsById(newsId);
    }
}

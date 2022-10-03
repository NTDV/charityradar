package ru.charityradar.api.repository;

import org.springframework.stereotype.Repository;
import ru.charityradar.api.model.News;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Repository
public class NewsRepository {
    private final List<News> _news = new ArrayList<>();
    private final AtomicInteger _idCounter = new AtomicInteger(0);

    public List<News> getAll() {
        return _news;
    }

    public Optional<News> get(final Integer id) {
        return _news.stream().filter(news -> news.id().equals(id)).findFirst();
    }

    public News create(final String title, final String text) {
        final var news = new News(_idCounter.incrementAndGet(), title, text);
        _news.add(news);
        return news;
    }

    public News update(final Integer id, final String title, final String text) {
        final var updatedNews = new News(id, title, text);
        final var oldNews = get(id);
        if (oldNews.isPresent()) {
            _news.set(_news.indexOf(oldNews.get()), updatedNews);
        } else {
            throw new NoSuchElementException("Can not find a News with id=" + id + ".");
        }
        return updatedNews;
    }

    public News delete(final Integer id) {
        final var deletedNews = get(id).orElseThrow();
        _news.remove(deletedNews);
        return deletedNews;
    }

    //todo Remove this method before pushing to production
    @PostConstruct
    private void init() {
        create("Test title 1", "test text");
        create("Test title 2", "test text test text");
    }
}

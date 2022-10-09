package ru.charityradar.api.repository;

import org.springframework.data.repository.CrudRepository;
import ru.charityradar.api.model.News;

import java.util.List;

public interface NewsRepository  extends CrudRepository<News, Integer> {
    Iterable<News> findNewsByFundId(Integer fundId);
}

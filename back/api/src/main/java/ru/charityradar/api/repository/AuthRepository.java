package ru.charityradar.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.charityradar.api.model.Auth;


@Repository
public interface AuthRepository extends CrudRepository<Auth, Integer> {
    Auth getAuthByLogin(String login);
    Auth getAuthByToken(String token);
}

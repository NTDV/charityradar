package ru.charityradar.api.repository;

import org.springframework.data.repository.CrudRepository;

import ru.charityradar.api.model.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<User, Integer> {
    User getUserByEmail(String email);
    User getUserById(Integer id);

}

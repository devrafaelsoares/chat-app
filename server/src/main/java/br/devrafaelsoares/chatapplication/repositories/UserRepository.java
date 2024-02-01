package br.devrafaelsoares.chatapplication.repositories;

import br.devrafaelsoares.chatapplication.domain.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

   Optional<User> findByUsername(String username);

   Optional<User> findByName(String name);

}

package login_service.login_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import login_service.login_service.model.Users;

@Repository
public interface UsersRespository extends MongoRepository<Users, String> {
	Users findByUsername(String username);
}

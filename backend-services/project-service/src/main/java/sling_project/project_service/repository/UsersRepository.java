package sling_project.project_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import sling_project.project_service.model.Users;

@Repository
public interface UsersRepository extends MongoRepository<Users, String>{
	
	Users findByUsername(String id);
	

}

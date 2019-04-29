package sling_project.project_service.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import sling_project.project_service.model.Projects;

@Repository
public interface ProjectsRepository extends MongoRepository<Projects, String> {
	Projects findByProjectId(ObjectId id);

}

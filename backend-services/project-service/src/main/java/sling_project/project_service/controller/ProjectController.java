package sling_project.project_service.controller;

import java.util.Map;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import sling_project.project_service.model.Projects;
import sling_project.project_service.model.UserProjectRequest;
import sling_project.project_service.repository.ProjectsRepository;
import sling_project.project_service.service.MongoProjectService;

@RestController
@RequestMapping("/api")
public class ProjectController {
	
	@Autowired
	private MongoProjectService mongoService;
	
	@RequestMapping(value = "/projects", method = RequestMethod.POST)
	public Projects createProject(@Valid @RequestBody Projects project) {
		return mongoService.createProject(project);
	}
	
	@RequestMapping(value = "/projects", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteProject(@RequestBody UserProjectRequest request) {
		return mongoService.deleteProject(request);
	}
	
	@RequestMapping(value = "/projects", method = RequestMethod.GET)
	public ResponseEntity<?> getAllProjects() {
		return mongoService.getAllProjects();
	}
	
	@RequestMapping(value = "/projects/{username}", method = RequestMethod.GET)
	public ResponseEntity<?> getProjectsByUsername(@PathVariable String username) {
		return mongoService.getProjectsByUsername(username);
	}
	
	@RequestMapping(value = "/projects/add/", method = RequestMethod.PUT)
	public ResponseEntity<?> addUserToProject(@RequestBody UserProjectRequest request) {
		return mongoService.addUserToProject(request);
	}

}

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import sling_project.project_service.model.Projects;
import sling_project.project_service.repository.ProjectsRepository;
import sling_project.project_service.requests.MoveProjectRequest;
import sling_project.project_service.requests.ProjectCategoryRequest;
import sling_project.project_service.requests.ProjectTaskRequest;
import sling_project.project_service.requests.UserCategoryRequest;
import sling_project.project_service.requests.UserProjectRequest;
import sling_project.project_service.service.MongoProjectService;

@RestController
public class ProjectController {
	
	@Autowired
	private MongoProjectService mongoService;
	
	@RequestMapping(value = "/projects", method = RequestMethod.POST)
	public Projects createProject(@Valid @RequestBody ProjectCategoryRequest request) {
		return mongoService.createProject(request);
	}
	
	@RequestMapping(value = "/projects", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteProject(@Valid @RequestBody UserProjectRequest request) {
		return mongoService.deleteProject(request);
	}
	
	@RequestMapping(value = "/projects", method = RequestMethod.PUT)
	public ResponseEntity<?> updateProject(@Valid @RequestBody Projects project) {
		return mongoService.updateProject(project);
	}
	
	@RequestMapping(value = "/projects/category", method = RequestMethod.POST)
	public ResponseEntity<?> createProjectCategory(@Valid @RequestBody UserCategoryRequest request) {
		return mongoService.createProjectCategory(request);
	}
	
	@RequestMapping(value = "/projects/category", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteProjectCategory(@Valid @RequestBody UserCategoryRequest request) {
		return mongoService.deleteProjectCategory(request);
	}
	
	@RequestMapping(value = "/projects/category/move", method = RequestMethod.PUT)
	public ResponseEntity<?> moveProject(@RequestBody @Valid MoveProjectRequest request) {
		return mongoService.changeProjectCategory(request);
	}
	
	@RequestMapping(value = "/projects/task", method = RequestMethod.POST)
	public ResponseEntity<?> createTask(@Valid @RequestBody ProjectTaskRequest request) {
		return mongoService.createTask(request);
	}
	
	@RequestMapping(value = "/projects/task", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteTask(@Valid @RequestBody ProjectTaskRequest request) {
		return mongoService.deleteTask(request);
	}
	
	@RequestMapping(value = "/projects/task", method = RequestMethod.PUT)
	public ResponseEntity<?> updateTask(@Valid @RequestBody ProjectTaskRequest request) {
		return mongoService.updateTask(request);
	}
	
	@RequestMapping(value = "/projects", method = RequestMethod.GET)
	public ResponseEntity<?> getAllProjects() {
		return mongoService.getAllProjects();
	}
	
	@RequestMapping(value = "/projects/user/{username}", method = RequestMethod.GET)
	public ResponseEntity<?> getProjectsByUsername(@PathVariable String username) {
		return mongoService.getProjectsByUsername(username);
	}
	
	@RequestMapping(value = "/projects/id/{projectId}", method = RequestMethod.GET)
	public ResponseEntity<?> getProjectsByUsername(@PathVariable ObjectId projectId) {
		return mongoService.getProjectById(projectId);
	}
	
	@RequestMapping(value = "/projects/user", method = RequestMethod.PUT)
	public ResponseEntity<?> addUserToProject(@RequestBody UserProjectRequest request) {
		return mongoService.addUserToProject(request);
	}
	
	@RequestMapping(value = "/projects/user", method = RequestMethod.DELETE)
	public ResponseEntity<?> removeUserFromProject(@RequestBody UserProjectRequest request) {
		return mongoService.removeUserFromProject(request);
	}

}

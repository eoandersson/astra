package sling_project.project_service.controller;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import sling_project.project_service.model.Projects;
import sling_project.project_service.repository.ProjectsRepository;

@RestController
@RequestMapping("/api")
public class ProjectController {
	
	@Autowired
	private ProjectsRepository projectsRepository;
	
	@RequestMapping(value = "/projects", method = RequestMethod.POST)
	public Projects createProject(@Valid @RequestBody Projects project) {
		project.set_id(ObjectId.get());
		projectsRepository.save(project);
		return project;
	}
	
	@RequestMapping(value = "/projects", method = RequestMethod.GET)
	public ResponseEntity<?> getAllProjects() {
		return new ResponseEntity(projectsRepository.findAll(), HttpStatus.OK);
	}

}

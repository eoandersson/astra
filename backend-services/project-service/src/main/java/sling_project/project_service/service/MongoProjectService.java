package sling_project.project_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sling_project.project_service.repository.ProjectsRepository;

@Service
public class MongoProjectService {
	
	@Autowired
	private ProjectsRepository projectsRepository;

}

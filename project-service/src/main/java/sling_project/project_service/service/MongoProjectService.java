package sling_project.project_service.service;

import java.util.ArrayList;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import sling_project.project_service.model.ProjectTaskRequest;
import sling_project.project_service.model.Projects;
import sling_project.project_service.model.UserProjectRequest;
import sling_project.project_service.model.Users;
import sling_project.project_service.repository.ProjectsRepository;
import sling_project.project_service.repository.UsersRepository;

@Service
public class MongoProjectService {
	
	@Autowired
	private ProjectsRepository projectsRepository;
	
	@Autowired
	private UsersRepository usersRepository;
	
	public Projects createProject(Projects project) {
		ObjectId projectId = ObjectId.get();
		project.set_id(projectId);
		
		ArrayList<String> users = project.getUsers();
		
		for(String username : users) {
			Users user = usersRepository.findByUsername(username);
			if(user == null) {
				user = new Users(username);
			}
			user.addProject(projectId);
			usersRepository.save(user);
		}
		
		projectsRepository.save(project);
		return project;
	}
	
	public ResponseEntity<?> deleteProject(UserProjectRequest request) {
		ObjectId projectId = request.getProjectId();
		String username = request.getUsername();
		Users user = usersRepository.findByUsername(username);
		Projects project = projectsRepository.findByProjectId(projectId);
		
		if(project == null || user == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		
		boolean userInProject = isPartOfProject(username, project);
		
		if(userInProject) {
			projectsRepository.delete(project);
			for(String curUsername : project.getUsers()) {
				Users curUser = usersRepository.findByUsername(curUsername);
				ArrayList<ObjectId> userProjects = curUser.getProjects();
				for(int i = 0; i < userProjects.size(); i++) {
					if(userProjects.get(i).equals(projectId)) {
						userProjects.remove(i);
						usersRepository.save(curUser);
						break;
					}
				}
			}
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity(HttpStatus.UNAUTHORIZED);
		
	}
	
	private boolean isPartOfProject(String username, Projects project) {
		for(String user : project.getUsers()) {
			if(user.equals(username)) {
				return true;
			}
		}
		return false;
	}
	

	public ResponseEntity<?> updateProject(Projects project) {
		if(projectsRepository.findByProjectId(project.get_id()) == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		projectsRepository.save(project);
		return new ResponseEntity(HttpStatus.OK);
	}
	
	public ResponseEntity<?> createTask(ProjectTaskRequest request) {
		Projects project = projectsRepository.findByProjectId(request.getProjectId());
		
		if(project == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		
		project.addTask(request.getTask());
		projectsRepository.save(project);
		return new ResponseEntity(HttpStatus.OK);
	}
	
	public ResponseEntity<?> deleteTask(ProjectTaskRequest request) {
		Projects project = projectsRepository.findByProjectId(request.getProjectId());
		
		if(project == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		
		project.removeTasks(request.getTask());
		projectsRepository.save(project);
		return new ResponseEntity(HttpStatus.OK);
	}
	
	public ResponseEntity<?> updateTask(ProjectTaskRequest request) {
		Projects project = projectsRepository.findByProjectId(request.getProjectId());
		
		if(project == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		
		project.setTaskState(request.getTask());
		projectsRepository.save(project);
		return new ResponseEntity(HttpStatus.OK);
	}
	
	public ResponseEntity<?> getAllProjects() {
		return new ResponseEntity(projectsRepository.findAll(), HttpStatus.OK);
	}
	
	public ResponseEntity<?> getProjectsByUsername(String username) {
		Users user = usersRepository.findByUsername(username);
		ArrayList<ObjectId> projectIds = user.getProjects();
		ArrayList<Projects> projects = new ArrayList<Projects>();
		
		for(ObjectId id : projectIds) {
			Projects curProject = projectsRepository.findByProjectId(id);
			if(curProject != null) {
				projects.add(curProject);
			}
		}
		
		return new ResponseEntity(projects, HttpStatus.OK);
		
	}
	
	public ResponseEntity<?> getProjectById(ObjectId projectId) {
		Projects project = projectsRepository.findByProjectId(projectId);
		if(project == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity(project, HttpStatus.OK);
	}
	
	public ResponseEntity<?> addUserToProject(UserProjectRequest request) {
		ObjectId id = request.getProjectId();
		Projects project = projectsRepository.findByProjectId(id);
		
		if(project == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		
		project.getUsers().add(request.getUsername());
		
		Users user = usersRepository.findByUsername(request.getUsername());
		if(user == null) {
			user = new Users(request.getUsername());
		}
		user.addProject(id);
		usersRepository.save(user);
		projectsRepository.save(project);
		
		return new ResponseEntity(HttpStatus.OK);
		
	}
	
	public ResponseEntity<?> removeUserFromProject(UserProjectRequest request) {
		ObjectId id = request.getProjectId();
		Projects project = projectsRepository.findByProjectId(id);
		Users user = usersRepository.findByUsername(request.getUsername());
		
		if(project == null || user == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		
		project.removeUser(request.getUsername());
		
		ArrayList<ObjectId> userProjects = user.getProjects();
		for(int i = 0; i < userProjects.size(); i++) {
			if(userProjects.get(i).equals(id)) {
				userProjects.remove(i);
				usersRepository.save(user);
				break;
			}
		}
		
		projectsRepository.save(project);
		
		return new ResponseEntity(HttpStatus.OK);
		
	}
	

}

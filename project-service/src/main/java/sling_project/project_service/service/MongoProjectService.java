package sling_project.project_service.service;

import java.io.Console;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.messaging.Task;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.netflix.client.http.HttpResponse;

import sling_project.project_service.model.Projects;
import sling_project.project_service.model.Tasks;
import sling_project.project_service.model.Users;
import sling_project.project_service.repository.ProjectsRepository;
import sling_project.project_service.repository.UsersRepository;
import sling_project.project_service.requests.MoveProjectRequest;
import sling_project.project_service.requests.ProjectCategoryRequest;
import sling_project.project_service.requests.ProjectSubtaskRequest;
import sling_project.project_service.requests.ProjectTaskRequest;
import sling_project.project_service.requests.UserCategoryRequest;
import sling_project.project_service.requests.UserProjectRequest;

@Service
public class MongoProjectService {
	
	@Autowired
	private ProjectsRepository projectsRepository;
	
	@Autowired
	private UsersRepository usersRepository;
	
	public ProjectCategoryRequest createProject(ProjectCategoryRequest request) {
		Projects project = request.getProject();
		String categoryName = request.getProjectCategory();
		
		ObjectId projectId = ObjectId.get();
		project.set_id(projectId);
		
		ArrayList<String> users = project.getUsers();
		
		for(String username : users) {
			Users user = usersRepository.findByUsername(username);
			if(user == null) {
				user = new Users(username);
			}
			user.addProject(projectId, categoryName);
			usersRepository.save(user);
		}
		
		projectsRepository.save(project);
		System.out.println(request);
		return request;
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
				curUser.removeProject(projectId);
				usersRepository.save(curUser);
			}
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity(HttpStatus.UNAUTHORIZED);
		
	}
	
	public ResponseEntity<?> createProjectCategory(UserCategoryRequest request) {
		System.out.println(request.getUsername());
		System.out.println(request.getCategory());
		Users user = usersRepository.findByUsername(request.getUsername());
		if(user == null) {
			user = new Users(request.getUsername());
		}
		user.addCategory(request.getCategory());
		usersRepository.save(user);
		return new ResponseEntity(HttpStatus.OK);
	}
	
	public ResponseEntity<?> deleteProjectCategory(UserCategoryRequest request) {
		Users user = usersRepository.findByUsername(request.getUsername());
		if(user == null || !user.getProjectCategories().containsKey(request.getCategory())) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		user.removeCategory(request.getCategory());
		usersRepository.save(user);
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}
	
	public ResponseEntity<?> moveProject(MoveProjectRequest request) {
		String username = request.getUsername();
		String oldCategory = request.getOldCategory();
		String targetCategory = request.getTargetCategory();
		ObjectId projectId = request.getProjectId();
		
		if(oldCategory.equals(targetCategory)) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
		
		Users user = usersRepository.findByUsername(username);
		if(user == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		
		Map<String, ArrayList<ObjectId>> projectCategories = user.getProjectCategories();
		if(!projectCategories.containsKey(oldCategory) || !projectCategories.containsKey(targetCategory)) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		
		ArrayList<ObjectId> projectList = projectCategories.get(oldCategory);
		for(int i=0; i<projectList.size(); i++) {
			if(projectList.get(i).equals(projectId)) {
				projectList.remove(i);
				projectCategories.get(targetCategory).add(projectId);
				usersRepository.save(user);
				return new ResponseEntity(HttpStatus.OK);
			}
		}
		return new ResponseEntity(HttpStatus.NOT_FOUND);
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
		System.out.println(project.get_id());
		Projects oldProject = projectsRepository.findByProjectId(project.get_id());
		System.out.println(oldProject);
		if(oldProject == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		
		Set<String> oldUsers = new HashSet<String>(oldProject.getUsers());
		Set<String> newUsers = new HashSet<String>(project.getUsers());
		
		for(String username : oldUsers) {
			if(!newUsers.contains(username)) {
				removeProjectFromUser(username, project.get_id());
			}
		}
		
		for(String username : newUsers) {
			if(!oldUsers.contains(username)) {
				addProjectToUser(username, project.get_id(), "Shared Projects");
			}
		}
		
		projectsRepository.save(project);
		return new ResponseEntity(HttpStatus.OK);
	}
	
	private void removeProjectFromUser(String username, ObjectId projectId) {
		Users user = usersRepository.findByUsername(username);
		if(user == null) return;
		
		user.removeProject(projectId);
		usersRepository.save(user);
	}
	
	private void addProjectToUser(String username, ObjectId projectId, String categoryName) {
		Users user = usersRepository.findByUsername(username);
		if(user == null || !user.getProjectCategories().containsKey(categoryName)) {
			user = new Users(username);
		}
		user.addProject(projectId, categoryName);
		usersRepository.save(user);
	}
	
	
	public ResponseEntity<?> createTask(ProjectTaskRequest request) {
		Projects project = projectsRepository.findByProjectId(request.getProjectId());
		
		if(project == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		
		Tasks requestTask = request.getTask();
		Tasks newTask = new Tasks(requestTask.getName(), requestTask.getDescription(), 0);
		project.addTask(newTask);
		projectsRepository.save(project);
		return new ResponseEntity(newTask, HttpStatus.OK);
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
		
		project.updateTask(request.getTask());
		projectsRepository.save(project);
		return new ResponseEntity(HttpStatus.OK);
	}
	
	public ResponseEntity<?> createSubtask(ProjectSubtaskRequest request) {
		Projects project = projectsRepository.findByProjectId(request.getProjectId());
		
		if(project == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		
		System.out.println("Target TaskId: " + request.getTaskId().toString());
		for(Tasks task : project.getTasks()) {
			System.out.println("Current TaskId: " + task.getTaskId().toString());
			if(task.getTaskId().equals(request.getTaskId())) {
				ResponseEntity response = task.addSubtask(request.getSubtask());
				if(response.getStatusCode().equals(HttpStatus.OK)) {
					projectsRepository.save(project);
				}
				return response;
			}
		}
		
		return new ResponseEntity(HttpStatus.NOT_FOUND);
		
	}
	
	public ResponseEntity<?> deleteSubtask(ProjectSubtaskRequest request) {
		Projects project = projectsRepository.findByProjectId(request.getProjectId());
		
		if(project == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		
		for(Tasks task : project.getTasks()) {
			if(task.getTaskId().equals(request.getTaskId())) {
				ResponseEntity response = task.removeSubtask(request.getSubtask());
				if(response.getStatusCode().equals(HttpStatus.NO_CONTENT)) {
					projectsRepository.save(project);
				}
				return response;
			}
		}
		
		return new ResponseEntity(HttpStatus.NOT_FOUND);
		
	}
	
	public ResponseEntity<?> updateSubtask(ProjectSubtaskRequest request) {
		Projects project = projectsRepository.findByProjectId(request.getProjectId());
		
		if(project == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		
		for(Tasks task : project.getTasks()) {
			if(task.getTaskId().equals(request.getTaskId())) {
				ResponseEntity response = task.updateSubtask(request.getSubtask());
				if(response.getStatusCode().equals(HttpStatus.OK)) {
					projectsRepository.save(project);
				}
				return response;
			}
		}
		
		return new ResponseEntity(HttpStatus.NOT_FOUND);
		
	}
	
	public ResponseEntity<?> getAllProjects() {
		return new ResponseEntity(projectsRepository.findAll(), HttpStatus.OK);
	}
	
	public ResponseEntity<?> getProjectsByUsername(String username) {
		Users user = usersRepository.findByUsername(username);
		if(user == null) {
			user = new Users(username);
		}
		Map<String, ArrayList<ObjectId>> projectCategories = user.getProjectCategories();
		Map<String, ArrayList<Projects>> projects = new HashMap<String, ArrayList<Projects>>();
		
		for(String category : projectCategories.keySet()) {
			ArrayList<Projects> curProjects = new ArrayList<Projects>();
			for(ObjectId id : projectCategories.get(category)) {
				Projects curProject = projectsRepository.findByProjectId(id);
				if(curProject != null) {
					curProjects.add(curProject);
				}
			}
			projects.put(category, curProjects);
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
		user.addProject(id, "Shared Projects");
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
		
		Map<String, ArrayList<ObjectId>> userCategories = user.getProjectCategories();
		for(ArrayList<ObjectId> userProjects : userCategories.values()) {
			for(int i = 0; i < userProjects.size(); i++) {
				if(userProjects.get(i).equals(id)) {
					userProjects.remove(i);
					usersRepository.save(user);
					break;
				}
			}
		}
		
		projectsRepository.save(project);
		
		return new ResponseEntity(HttpStatus.OK);
		
	}
	

}

package sling_project.project_service.model;

import java.util.ArrayList;
import sling_project.project_service.model.Tasks;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Projects {
	
	@Id
	public ObjectId projectId;
	
	private String projectName;
	private String projectDescription;

	private ArrayList<String> users;
	private ArrayList<Tasks> tasks;
	
	private void addUser(String username) {
		users.add(username);
	}
	
	public void addTask(Tasks task) {
		tasks.add(new Tasks(task.getName(), task.getDescription(), task.getStatus()));
	}
	
	public void removeUser(String username) {
		for (int i = 0; i < users.size(); i++) {
			if (users.get(i).equals(username)) {
				users.remove(i);
				break;
			}
		}
	}
	
	public void removeTasks(Tasks task) {
		ObjectId taskId = task.getTaskId();
		for (int i = 0; i < tasks.size(); i++) {
			ObjectId curTaskId = tasks.get(i).getTaskId();
			if (curTaskId.equals(taskId)) {
				tasks.remove(i);
				break;
			}
		}
	}
	
	public void updateTask(Tasks task) {
		ObjectId taskId = task.getTaskId();
		for (int i = 0; i < tasks.size(); i++) {
			ObjectId curTaskId = tasks.get(i).getTaskId();
			if (curTaskId.equals(taskId)) {
				Tasks curTask = tasks.get(i);
				curTask.setName(task.getName());
				curTask.setDescription(task.getDescription());
				curTask.setStatus(task.getStatus());
				break;
			}
		}
	}
	
	public ObjectId get_id() {
		return projectId;
	}
	
	public void set_id(ObjectId _id) {
		this.projectId = _id;
	}
	
	public ArrayList<String> getUsers() {
		return users;
	}
	
	public void setUsers(ArrayList<String> users) {
		this.users = users;
	}
	
	public ArrayList<Tasks> getTasks() {
		return tasks;
	}
	
	public void setTasks(ArrayList<Tasks> tasks) {
		this.tasks = tasks;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	
	public String getProjectDescription() {
		return projectDescription;
	}

	public void setProjectDescription(String projectDescription) {
		this.projectDescription = projectDescription;
	}
	

}

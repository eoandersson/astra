package sling_project.project_service.model;

import java.util.ArrayList;
import java.util.HashSet;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Projects {
	
	@Id
	public ObjectId projectId;
	
	private ArrayList<String> users;
	private ArrayList<Tasks> tasks;
	
	private void addUser(String username) {
		users.add(username);
	}
	
	private void addTask(Tasks task) {
		tasks.add(task);
	}
	
	private void removeUser(String username) {
		for (int i = 0; i < users.size(); i++) {
			if (users.get(i).equals(username)) {
				users.remove(i);
				break;
			}
		}
	}
	
	private void removeTasks(String name) {
		for (int i = 0; i < tasks.size(); i++) {
			Tasks task = tasks.get(i);
			if (task.getName().equals(name)) {
				tasks.remove(i);
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
	

}

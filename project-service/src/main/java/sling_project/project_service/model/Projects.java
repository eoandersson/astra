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
		tasks.add(task);
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
		String name = task.getName();
		for (int i = 0; i < tasks.size(); i++) {
			String curName = tasks.get(i).getName();
			if (curName.equals(name)) {
				tasks.remove(i);
				break;
			}
		}
	}
	
	public void setTaskState(Tasks task) {
		String name = task.getName();
		for (int i = 0; i < tasks.size(); i++) {
			String curName = tasks.get(i).getName();
			if (curName.equals(name)) {
				Tasks curTask = tasks.get(i);
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

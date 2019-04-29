package sling_project.project_service.model;

import java.util.ArrayList;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Users {
	
	@Id
	public ObjectId userId;
	
	private String username;
	private ArrayList<ObjectId> projects;
	
	
	
	public Users(String username) {
		this.username = username;
		this.projects = new ArrayList();
	}

	public void addProject(ObjectId projectId) {
		projects.add(projectId);
	}
	
	public void removeProject(ObjectId projectId) {
		for (int i = 0; i < projects.size(); i++) {
			if (projects.get(i).equals(projectId)) {
				projects.remove(i);
				break;
			}
		}
	}
	
	public ObjectId getUserId() {
		return userId;
	}
	public void setUserId(ObjectId userId) {
		this.userId = userId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public ArrayList<ObjectId> getProjects() {
		return projects;
	}
	public void setProjects(ArrayList<ObjectId> projects) {
		this.projects = projects;
	}
	
	
}

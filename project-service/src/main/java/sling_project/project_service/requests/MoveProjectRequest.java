package sling_project.project_service.requests;

import org.bson.types.ObjectId;

public class MoveProjectRequest {
	
	private String username;
	private String category;
	private ObjectId projectId;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public ObjectId getProjectId() {
		return projectId;
	}
	public void setProjectId(ObjectId projectId) {
		this.projectId = projectId;
	}

}

package sling_project.project_service.requests;

import org.bson.types.ObjectId;

public class UserProjectRequest {
	
	public ObjectId projectId;
	public String username;
	
	public ObjectId getProjectId() {
		return projectId;
	}
	public void setProjectId(ObjectId projectId) {
		this.projectId = projectId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	
}

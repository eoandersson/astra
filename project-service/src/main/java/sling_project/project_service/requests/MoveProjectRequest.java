package sling_project.project_service.requests;

import org.bson.types.ObjectId;

public class MoveProjectRequest {
	
	private String username;
	private String oldCategory;
	private String targetCategory;
	private ObjectId projectId;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getOldCategory() {
		return oldCategory;
	}
	public void setOldCategory(String oldCategory) {
		this.oldCategory = oldCategory;
	}
	public String getTargetCategory() {
		return targetCategory;
	}
	public void setTargetCategory(String targetCategory) {
		this.targetCategory = targetCategory;
	}
	public ObjectId getProjectId() {
		return projectId;
	}
	public void setProjectId(ObjectId projectId) {
		this.projectId = projectId;
	}	

}

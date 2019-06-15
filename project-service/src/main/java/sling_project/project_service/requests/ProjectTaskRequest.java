package sling_project.project_service.requests;

import org.bson.types.ObjectId;

import sling_project.project_service.model.Tasks;

public class ProjectTaskRequest {
	
	public ObjectId projectId;
	public Tasks task;
	
	public ObjectId getProjectId() {
		return projectId;
	}
	public void setProjectId(ObjectId projectId) {
		this.projectId = projectId;
	}
	public Tasks getTask() {
		return task;
	}
	public void setTask(Tasks task) {
		this.task = task;
	}
	
	

}

package sling_project.project_service.requests;

import org.bson.types.ObjectId;

import sling_project.project_service.model.Subtasks;

public class ProjectSubtaskRequest {
	
	public ObjectId projectId;
	public ObjectId taskId;
	public Subtasks subtask;
	
	public ObjectId getProjectId() {
		return projectId;
	}
	public void setProjectId(ObjectId projectId) {
		this.projectId = projectId;
	}
	public ObjectId getTaskId() {
		return taskId;
	}
	public void setTaskId(ObjectId taskId) {
		this.taskId = taskId;
	}
	public Subtasks getSubtask() {
		return subtask;
	}
	public void setSubtask(Subtasks subtask) {
		this.subtask = subtask;
	}
	

}

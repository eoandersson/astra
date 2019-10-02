package sling_project.project_service.requests;

import org.bson.types.ObjectId;

import sling_project.project_service.model.Subtasks;

public class ProjectSubtaskRequest {
	
	public ObjectId projectId;
	public String taskName;
	public Subtasks subtask;
	
	public ObjectId getProjectId() {
		return projectId;
	}
	public void setProjectId(ObjectId projectId) {
		this.projectId = projectId;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTask(String taskName) {
		this.taskName = taskName;
	}
	public Subtasks getSubtask() {
		return subtask;
	}
	public void setSubtask(Subtasks subtask) {
		this.subtask = subtask;
	}
	

}

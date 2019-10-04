package sling_project.project_service.model;

import org.bson.types.ObjectId;

public class Subtasks {
	
	private ObjectId subtaskId;
	private String name;
	private String description;
	private int status;
	
	public Subtasks(String name, String description, int status) {
		this.setSubtaskId(new ObjectId());
		this.name = name;
		this.description = description;
		this.status = status;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}

	public ObjectId getSubtaskId() {
		return subtaskId;
	}

	public void setSubtaskId(ObjectId subtaskId) {
		this.subtaskId = subtaskId;
	}

}

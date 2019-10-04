package sling_project.project_service.model;

import java.awt.List;
import java.util.ArrayList;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Tasks {
	
	private ObjectId taskId;
	private String name;
	private String description;
	private int status;
	private ArrayList<Subtasks> subtasks;
	
	public Tasks(String name, String description, int status) {
		this.setTaskId(new ObjectId());
		this.name = name;
		this.description = description;
		this.status = status;
		subtasks = new ArrayList<Subtasks>();
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

	public ArrayList<Subtasks> getSubtasks() {
		return subtasks;
	}

	public void setSubtasks(ArrayList<Subtasks> subtasks) {
		this.subtasks = subtasks;
	}
	
	public ResponseEntity<?> addSubtask(Subtasks subtask) {
		Subtasks newTask = new Subtasks(subtask.getName(), subtask.getDescription(), subtask.getStatus());
		subtasks.add(newTask);
		return new ResponseEntity(newTask, HttpStatus.OK);
	}
	
	public ResponseEntity<?> removeSubtask(Subtasks subtask) {
		ObjectId subtaskId = subtask.getSubtaskId();
		for (int i = 0; i < subtasks.size(); i++) {
			ObjectId curSubtaskId = subtasks.get(i).getSubtaskId();
			if (curSubtaskId.equals(subtaskId)) {
				subtasks.remove(i);
				return new ResponseEntity(HttpStatus.NO_CONTENT);
			}
		}
		
		return new ResponseEntity(HttpStatus.NOT_FOUND);
	}
	
	public ResponseEntity<?> updateSubtask(Subtasks subtask) {
		ObjectId subtaskId = subtask.getSubtaskId();
		for (int i = 0; i < subtasks.size(); i++) {
			ObjectId curSubtaskId = subtasks.get(i).getSubtaskId();
			if (curSubtaskId.equals(subtaskId)) {
				Subtasks curTask = subtasks.get(i);
				curTask.setName(subtask.getName());
				curTask.setDescription(subtask.getDescription());
				curTask.setStatus(subtask.getStatus());
				return new ResponseEntity(HttpStatus.OK);
			}
		}
		return new ResponseEntity(HttpStatus.NOT_FOUND);
	}

	public ObjectId getTaskId() {
		return taskId;
	}

	public void setTaskId(ObjectId taskId) {
		this.taskId = taskId;
	}
	
	

}

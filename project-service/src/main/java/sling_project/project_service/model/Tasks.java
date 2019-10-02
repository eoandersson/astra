package sling_project.project_service.model;

import java.awt.List;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Tasks {
	
	private String name;
	private String description;
	private int status;
	private ArrayList<Subtasks> subtasks;
	
	public Tasks() {
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
		subtasks.add(subtask);
		return new ResponseEntity(HttpStatus.OK);
	}
	
	public ResponseEntity<?> removeSubtask(Subtasks subtask) {
		String name = subtask.getName();
		for (int i = 0; i < subtasks.size(); i++) {
			String curName = subtasks.get(i).getName();
			if (curName.equals(name)) {
				subtasks.remove(i);
				return new ResponseEntity(HttpStatus.NO_CONTENT);
			}
		}
		
		return new ResponseEntity(HttpStatus.NOT_FOUND);
	}
	
	public ResponseEntity<?> updateSubtask(Subtasks subtask) {
		String name = subtask.getName();
		for (int i = 0; i < subtasks.size(); i++) {
			String curName = subtasks.get(i).getName();
			if (curName.equals(name)) {
				Subtasks curTask = subtasks.get(i);
				curTask.setDescription(subtask.getDescription());
				curTask.setStatus(subtask.getStatus());
				return new ResponseEntity(HttpStatus.OK);
			}
		}
		return new ResponseEntity(HttpStatus.NOT_FOUND);
	}
	
	

}

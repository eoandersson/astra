package sling_project.project_service.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Users {
	
	private String HOME_CATEGORY="My Projects";
	private String SHARED_CATEGORY="Shared Projects";
	
	@Id
	public ObjectId userId;
	
	private String username;
	private Map<String, ArrayList<ObjectId>> projectCategories;
	
	public Users(String username) {
		this.username = username;
		this.projectCategories = new HashMap<String, ArrayList<ObjectId>>();
		projectCategories.put(HOME_CATEGORY, new ArrayList<ObjectId>());
		projectCategories.put(SHARED_CATEGORY, new ArrayList<ObjectId>());
	}

	public void addProject(ObjectId projectId, String categoryName) {
		if(categoryName == null || categoryName.length()==0) categoryName = HOME_CATEGORY;
		projectCategories.get(categoryName).add(projectId);
	}
	
	public void removeProject(ObjectId projectId) {
		for(ArrayList<ObjectId> projectList : projectCategories.values()) {
			for (int i = 0; i < projectList.size(); i++) {
				if (projectList.get(i).equals(projectId)) {
					projectList.remove(i);
					break;
				}
			}
		}
	}
	
	public void addCategory(String categoryName) {
		projectCategories.put(categoryName, new ArrayList<ObjectId>());
	}
	
	public void removeCategory(String categoryName) {
		projectCategories.remove(categoryName);
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
	public Map<String, ArrayList<ObjectId>> getProjectCategories() {
		return projectCategories;
	}
	public void setProjectCategories(Map<String, ArrayList<ObjectId>> projectCategories) {
		this.projectCategories = projectCategories;
	}
	
	
}

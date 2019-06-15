package sling_project.project_service.requests;

import org.bson.types.ObjectId;

import sling_project.project_service.model.Projects;

public class ProjectCategoryRequest {
	
	private Projects project;
	private String projectCategory;
	
	public Projects getProject() {
		return project;
	}
	public void setProject(Projects project) {
		this.project = project;
	}
	public String getProjectCategory() {
		return projectCategory;
	}
	public void setProjectCategory(String projectCategory) {
		this.projectCategory = projectCategory;
	}	

}

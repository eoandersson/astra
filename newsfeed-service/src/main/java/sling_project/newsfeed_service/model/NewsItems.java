package sling_project.newsfeed_service.model;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class NewsItems {
	
	@Id
	public ObjectId newsId;
	
	private String title;
	private String body;
	private String author;
	
	public ObjectId getNewsId() {
		return newsId;
	}
	public void setNewsId(ObjectId newsId) {
		this.newsId = newsId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}


}

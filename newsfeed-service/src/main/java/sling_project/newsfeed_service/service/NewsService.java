package sling_project.newsfeed_service.service;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import sling_project.newsfeed_service.model.NewsItems;
import sling_project.newsfeed_service.repository.NewsItemRepository;

@Service
public class NewsService {
	
	@Autowired
	private NewsItemRepository newsItemRepository;
	
	public NewsItems postNewsItem(NewsItems input) {
		ObjectId newsItemId = ObjectId.get();
		input.setNewsId(newsItemId);
		
		newsItemRepository.save(input);
		
		return input;
	}
	
	public ResponseEntity<?> deleteNewsItem(ObjectId id) {
	
		NewsItems newsItem = newsItemRepository.findByNewsId(id);
		
		if (newsItem == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		
		newsItemRepository.delete(newsItem);
		
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}
	
	public ResponseEntity<?> updateNewsItem(NewsItems input) {
		if (input.getNewsId() == null || newsItemRepository.findByNewsId(input.getNewsId()) == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		} 
		newsItemRepository.save(input);
		return new ResponseEntity(HttpStatus.OK);
	}
	
	public ResponseEntity<?> getAllNewsItems() {
		return new ResponseEntity(newsItemRepository.findAll(), HttpStatus.OK);
	}
	
	public ResponseEntity<?> getNewsItemById(ObjectId id) {
		NewsItems newsItem = newsItemRepository.findByNewsId(id);
		
		if (newsItem == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity(newsItem, HttpStatus.OK);
	}
	
	public ResponseEntity<?> getNewsItemsByAuthor(String author) {
		NewsItems newsItem = newsItemRepository.findByAuthor(author);
		
		if (newsItem == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity(newsItem, HttpStatus.OK);
	}
	
	public ResponseEntity<?> getNewsItemsByTitle(String title) {
		NewsItems newsItem = newsItemRepository.findByTitle(title);
		
		if (newsItem == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity(newsItem, HttpStatus.OK);
	}

}

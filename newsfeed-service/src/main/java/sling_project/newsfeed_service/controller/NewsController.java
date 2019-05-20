package sling_project.newsfeed_service.controller;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import sling_project.newsfeed_service.model.NewsItems;
import sling_project.newsfeed_service.service.NewsService;

@RestController
public class NewsController {
	
	@Autowired
	private NewsService newsService;

	@RequestMapping(value = "/news", method = RequestMethod.POST)
	public NewsItems postNewsItem(@Valid @RequestBody NewsItems input) {
		return newsService.postNewsItem(input);
	}
	
	@RequestMapping(value = "/news/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteNewsItem(@PathVariable ObjectId id) {
		return newsService.deleteNewsItem(id);
	}
	
	@RequestMapping(value = "/news", method = RequestMethod.PUT)
	public ResponseEntity<?> updateNewsItem(@Valid @RequestBody NewsItems input) {
		return newsService.updateNewsItem(input);
	}
	
	@RequestMapping(value = "/news", method = RequestMethod.GET)
	public ResponseEntity<?> getAll() {
		return newsService.getAllNewsItems();
	}
	
	@RequestMapping(value = "/news/id/{newsItemId}", method = RequestMethod.GET)
	public ResponseEntity<?> getNewsItemById(@PathVariable ObjectId newsItemId) {
		return newsService.getNewsItemById(newsItemId);
	}
	
	@RequestMapping(value = "/news/author/{author}", method = RequestMethod.GET)
	public ResponseEntity<?> getNewsItemsByAuthor(@PathVariable String author) {
		return newsService.getNewsItemsByAuthor(author);
	}
	
	@RequestMapping(value = "/news/title/{title}", method = RequestMethod.GET)
	public ResponseEntity<?> getNewsItemsByTitle(@PathVariable String title) {
		return newsService.getNewsItemsByTitle(title);
	}
	
}

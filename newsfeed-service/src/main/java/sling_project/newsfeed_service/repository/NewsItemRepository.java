package sling_project.newsfeed_service.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import sling_project.newsfeed_service.model.NewsItems;

@Repository
public interface NewsItemRepository extends MongoRepository<NewsItems, Long>{
	NewsItems findByNewsId(ObjectId id);
	NewsItems findByAuthor(String author);
	NewsItems findByTitle(String title);
}

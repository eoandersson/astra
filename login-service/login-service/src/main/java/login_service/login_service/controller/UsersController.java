package login_service.login_service.controller;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import login_service.login_service.model.Users;
import login_service.login_service.repository.UsersRespository;

@RestController
@RequestMapping("/api")
public class UsersController {
	@Autowired
	private UsersRespository usersRespository;
	
	@RequestMapping(value = "/users/{username}", method = RequestMethod.GET)
	public ResponseEntity<?> getUser(@PathVariable String username) {
		return new ResponseEntity(usersRespository.findByUsername(username), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public ResponseEntity<?> getAllUsers() {
		return new ResponseEntity(usersRespository.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/users/{username}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteUser(@PathVariable String username) {
		usersRespository.delete(usersRespository.findByUsername(username));
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}
	
	@RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
	public void updateUser(@Valid @RequestBody Users user, @PathVariable ObjectId id) {
		user.set_id(id);
		usersRespository.save(user);
	}
	
	@RequestMapping(value = "/users", method = RequestMethod.POST)
	public Users createUser(@Valid @RequestBody Users user) {
		user.set_id(ObjectId.get());
		usersRespository.save(user);
		return user;
	}
}

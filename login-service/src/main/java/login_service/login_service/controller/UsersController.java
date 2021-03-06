package login_service.login_service.controller;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import login_service.login_service.model.Users;
import login_service.login_service.repository.UsersRespository;
import login_service.login_service.service.MongoUserDetailsService;

@RestController
public class UsersController {
	@Autowired
	private UsersRespository usersRespository;
	
	@Autowired
	private MongoUserDetailsService usersService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@RequestMapping(value = "/users/{username}", method = RequestMethod.GET)
	public ResponseEntity<?> getUser(@PathVariable String username) {
		return new ResponseEntity(usersRespository.findByUsername(username), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public ResponseEntity<?> getAllUsers() {
		return new ResponseEntity(usersRespository.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/users/delete/{username}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteUser(@PathVariable String username) {
		usersRespository.delete(usersRespository.findByUsername(username));
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}
	
	@RequestMapping(value = "/users/update/{username}", method = RequestMethod.PUT)
	public void updateUser(@Valid @RequestBody Users user, @PathVariable String username) {
		Users users = usersRespository.findByUsername(username);
		ObjectId id = users.get_id();
		user.set_id(id);
		usersRespository.save(user);
	}
	
	@RequestMapping(value = "/users/register", method = RequestMethod.POST)
	public ResponseEntity<?> createUser(@Valid @RequestBody Users user) {
		return usersService.createUser(user);
	}
}

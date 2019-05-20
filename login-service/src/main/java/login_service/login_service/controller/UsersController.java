package login_service.login_service.controller;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
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
	public Users createUser(@Valid @RequestBody Users user) {
		user.set_id(ObjectId.get());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		usersRespository.save(user);
		return user;
	}
	/*
	@RequestMapping(value = "/users/login", method = RequestMethod.POST)
	public ResponseEntity<?> loginUser(@Valid @RequestBody Users user) {
		Users storedUser = usersRespository.findByUsername(user.getUsername());
		boolean correctPassword = passwordEncoder.matches(user.getPassword(), storedUser.getPassword());
		if(!correctPassword) {
			return new ResponseEntity(HttpStatus.UNAUTHORIZED);
		} else {
			return new ResponseEntity(HttpStatus.OK);
		}
	}
	*/
}

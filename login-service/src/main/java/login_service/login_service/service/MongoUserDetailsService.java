package login_service.login_service.service;

import java.util.List;
import java.util.Arrays;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import login_service.login_service.repository.UsersRespository;
import login_service.login_service.model.Users;

@Component
public class MongoUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UsersRespository repository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public ResponseEntity<?> createUser(Users user) throws UsernameNotFoundException {
		if(repository.findByUsername(user.getUsername()) != null) {
			return new ResponseEntity(HttpStatus.CONFLICT);
		}
		
		user.set_id(ObjectId.get());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		repository.save(user);
		
		return new ResponseEntity(user, HttpStatus.OK);
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Users user = repository.findByUsername(username);
		
		if(user == null) {
			throw new UsernameNotFoundException("User not found");
		}
		
		List<SimpleGrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority("user"));
		
		return new User(user.getUsername(), user.getPassword(), authorities);
	}

}

package login_service.login_service;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Hello world!
 *
 */

@RestController
@SpringBootApplication
public class LoginApplication {
	
	@CrossOrigin(origins = "*", allowedHeaders="*")
	@RequestMapping(value = "/api/login")
	public Map<String, String> login() {
		Map<String, String> jsonObject = new HashMap();
		jsonObject.put("loginText", "You are logged in!");
		return jsonObject;
	}
	
    public static void main( String[] args ) {
    	SpringApplication.run(LoginApplication.class, args);
    }
}

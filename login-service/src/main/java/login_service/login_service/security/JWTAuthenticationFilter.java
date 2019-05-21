package login_service.login_service.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;

import login_service.login_service.model.Users;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static login_service.login_service.security.SecurityConstants.EXPIRATION_TIME;
import static login_service.login_service.security.SecurityConstants.HEADER_STRING;
import static login_service.login_service.security.SecurityConstants.SECRET;
import static login_service.login_service.security.SecurityConstants.TOKEN_PREFIX;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private AuthenticationManager authenticationManager;

	public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		// TODO Auto-generated method stub
		Users creds;
		try {
			 creds = new ObjectMapper()
					.readValue(request.getInputStream(), Users.class);
		} catch (Exception e) {
			throw new RuntimeException();
		}
			
			
			System.out.println(creds.getUsername());
			System.out.println(creds.getPassword());
			
			UsernamePasswordAuthenticationToken userToken = new UsernamePasswordAuthenticationToken(
					creds.getUsername(), 
					creds.getPassword(),
					new ArrayList());
			
			System.out.println(userToken);
			
			return authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							creds.getUsername(), 
							creds.getPassword(),
							new ArrayList()
					)
			);
			
		
	}
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		
		System.out.println("Creating token...");
		String token = JWT.create()
				.withSubject(((User) authResult.getPrincipal()).getUsername())
				.withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.sign(HMAC512(SECRET.getBytes()));
		response.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
		System.out.println("Token: " + token);
		System.out.println("Header String: " + HEADER_STRING);
		System.out.println("Token Prefix: " + TOKEN_PREFIX);
		System.out.println("Response Headers: " + response.getHeaderNames());
	}
	
	
}

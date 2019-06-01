package sling_project.newsfeed_service.security;

import static sling_project.newsfeed_service.security.SecurityConstants.HEADER_STRING;
import static sling_project.newsfeed_service.security.SecurityConstants.SECRET;
import static sling_project.newsfeed_service.security.SecurityConstants.TOKEN_PREFIX;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
	
	public JWTAuthorizationFilter(AuthenticationManager authManager) {
		super(authManager);
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// TODO Auto-generated method stub
		String header = request.getHeader(HEADER_STRING);
		if (header == null || !header.startsWith(TOKEN_PREFIX)) {
			chain.doFilter(request, response);
			return;
		}
		
		UsernamePasswordAuthenticationToken authentication = getAuthentication(request);
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(request, response);
	}

	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
		// TODO Auto-generated method stub
		String token = request.getHeader(HEADER_STRING);
		if (token != null) {
			String user = JWT.require(Algorithm.HMAC512(SECRET.getBytes()))
					.build()
					.verify(token.replace(TOKEN_PREFIX, ""))
					.getSubject();
			
			if (user != null) {
				return new UsernamePasswordAuthenticationToken(user, null, new ArrayList());
			}
			return null;
		}
		return null;
	}

	
}

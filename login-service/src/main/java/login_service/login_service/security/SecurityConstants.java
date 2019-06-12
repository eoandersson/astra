package login_service.login_service.security;

public class SecurityConstants {
	public static final String SECRET = System.getenv("JWT_SECRET");
	public static final long EXPIRATION_TIME = 86400000;
	public static final String TOKEN_PREFIX = "Bearer ";
	public static final String HEADER_STRING = "Authorization";
	public static final String SIGN_UP_URL = "/users/register";
}

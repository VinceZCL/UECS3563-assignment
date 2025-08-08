package com.assignment.backend.security;

import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import com.assignment.backend.dto.UserRequest;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private static final String SECRET_KEY = "c2VjcmV0X2tleV84YjZlZDZkYy1jZDM5LTQ4YmQtYjQ0Zi1iZWJjNjE0OTY0Y2E=";
	private static final Key KEY = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
	private final long EXPIRATION_TIME = 1000 * 60 * 60;
	
	public String generateToken(String username, Long userId) {
		return Jwts.builder()
				.claim("userId", userId)
				.subject(username)
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis()+ EXPIRATION_TIME))
				.signWith(KEY)
				.compact();
	}
	
	public String extractUsername(String token) {
		return Jwts.parser()
				.verifyWith((SecretKey) KEY)
				.build()
				.parseSignedClaims(token)
				.getPayload()
				.getSubject();
	}
	
	public Long extractUserId(String token) {
		return Jwts.parser()
				.verifyWith((SecretKey) KEY)
				.build()
				.parseSignedClaims(token)
				.getPayload()
				.get("userId", Long.class);
	}
	
	public boolean validateToken(String token, UserRequest userReq) {
		try {
			String tokenName = extractUsername(token);
			return tokenName.equals(userReq.getName());
		} catch (JwtException | IllegalArgumentException e) {
			return false;
		}
	}
	
}

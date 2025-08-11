package com.assignment.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.backend.dto.JwtClaims;
import com.assignment.backend.dto.UserDTO;
import com.assignment.backend.dto.UserRequest;
import com.assignment.backend.exception.UnauthorizedException;
import com.assignment.backend.security.JwtUtil;
import com.assignment.backend.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private JwtUtil jwt;
	@Autowired
	private UserService userService;
	
	@GetMapping("/users")
	public ResponseEntity<List<UserDTO>> getUsers() {
		log.info("GET /api/users invoked");
		return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
	}
	
	@GetMapping("/user/{id}")
	public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
		log.info("GET /api/user/{id} invoked with id=" + id);
		return ResponseEntity.ok(userService.getUserById(id));
	}
	
	@PostMapping("/users")
	public ResponseEntity<UserDTO> addUser(@RequestBody UserRequest user) {
		log.info("POST /api/users invoked");
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser(user));
	}
	
	@PutMapping("/users")
	public ResponseEntity<UserDTO> editUser(@RequestBody Map<String, Object> body) {
		log.info("PUT /api/users invoked");
		return ResponseEntity.ok(userService.updateUser(body));
	}
	
	@DeleteMapping("/user/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		log.info("DELETE /api/user/{id} invoked with id="+id);
		userService.deleteUser(id);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/users/jwt")
	public ResponseEntity<JwtClaims> parseJWT(HttpServletRequest req) {
		String authHeader = req.getHeader("Authorization");
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			throw new UnauthorizedException("Invalid or Missing JWT Token");
		}
		String token = authHeader.substring(7).trim();
		JwtClaims jwtc = new JwtClaims(Long.valueOf(jwt.extractUserId(token)), jwt.extractUsername(token));
		return ResponseEntity.ok(jwtc);
		
	}
	
}

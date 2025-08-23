package com.assignment.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.backend.dto.UserRequest;
import com.assignment.backend.exception.InvalidRequestException;
import com.assignment.backend.model.User;
import com.assignment.backend.security.JwtUtil;
import com.assignment.backend.service.UserService;

@RestController
@RequestMapping("/api")
public class AuthController {

	@Autowired
	private JwtUtil jwt;
	@Autowired
	private UserService userService;
	
	@PostMapping("/auth")
	public ResponseEntity<String> login(@RequestBody UserRequest userReq) {
		User target = userService.findUserByName(userReq.getName());
		if (userReq.getName().equals(target.getName()) && userReq.getPassword().equals(target.getPassword())) {
			String token = jwt.generateToken(target.getName(), target.getId());
			return ResponseEntity.ok().body("Bearer " + token);
		} else {
			throw new InvalidRequestException("Invalid Username or Password");
		}
	}
	
}

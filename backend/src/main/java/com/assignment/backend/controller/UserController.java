package com.assignment.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.backend.dto.UserDTO;
import com.assignment.backend.model.User;
import com.assignment.backend.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/users")
	public ResponseEntity<List<UserDTO>> getUsers() {
		log.info("GET /api/users invoked");
		return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
	}
	
	@GetMapping("/user/{id}")
	public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
//		return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(id));
		log.info("GET /api/user/{id} invoked with id=" + id);
		return ResponseEntity.ok(userService.getUserById(id));
	}
	
	@PostMapping("/users")
	public ResponseEntity<UserDTO> addUser(@RequestBody User user) {
		log.info("POST /api/users invoked");
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser(user));
	}
}

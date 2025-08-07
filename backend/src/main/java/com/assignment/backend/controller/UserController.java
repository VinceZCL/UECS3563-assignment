package com.assignment.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.backend.dto.UserDTO;
import com.assignment.backend.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	UserService userService;
	
	@GetMapping("/users")
	public List<UserDTO> getUsers() {
		log.info("GET /api/users invoked");
		return userService.getAllUsers();
	}
	
	@GetMapping("/user/{id}")
	public UserDTO getUser(@PathVariable Long id) {
		return userService.getUserById(id);
	}
}

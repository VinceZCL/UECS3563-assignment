package com.assignment.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assignment.backend.dto.UserDTO;
import com.assignment.backend.exception.UserNotFoundException;
import com.assignment.backend.model.User;
import com.assignment.backend.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public List<UserDTO> getAllUsers() {
		return userRepository.findAll().stream()
				.map(user -> new UserDTO(user.getUser_id(), user.getName()))
				.collect(Collectors.toList());
	}
	
	public UserDTO getUserById(Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException("User with user_id " + id + " not found."));
		return convertToDTO(user);
	}
	
	public UserDTO saveUser(User user) {
		User saved = userRepository.save(user);
		return convertToDTO(saved);
	}
	
	private UserDTO convertToDTO(User user) {
		return UserDTO.toDTO(user);
	}
}

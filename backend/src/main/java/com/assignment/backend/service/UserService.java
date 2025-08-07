package com.assignment.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assignment.backend.dto.UserDTO;
import com.assignment.backend.model.User;
import com.assignment.backend.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

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
				.orElseThrow(() -> new EntityNotFoundException("Users not found"));
		return convertToDTO(user);
	}
	
	private UserDTO convertToDTO(User user) {
		return UserDTO.toDTO(user);
	}
}

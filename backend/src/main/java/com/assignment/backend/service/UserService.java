package com.assignment.backend.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assignment.backend.dto.UserDTO;
import com.assignment.backend.dto.UserRequest;
import com.assignment.backend.exception.InvalidRequestException;
import com.assignment.backend.exception.UserNotFoundException;
import com.assignment.backend.model.User;
import com.assignment.backend.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public List<UserDTO> getAllUsers() {
		return userRepository.findAll().stream()
				.map(user -> new UserDTO(user.getId(), user.getName()))
				.collect(Collectors.toList());
	}
	
	public UserDTO getUserById(Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException("User with id " + id + " not found."));
		return convertToDTO(user);
	}
	
	public UserDTO saveUser(UserRequest userReq) {
		User user = new User();
		user.setName(userReq.getName());
		user.setPassword(userReq.getPassword());
		User saved = userRepository.save(user);
		return convertToDTO(saved);
	}
		
	public UserDTO updateUser(Map<String, Object> details) {
		Long id = Long.valueOf(details.get("id").toString());
		String oldName = details.get("old_name").toString();
		String oldPassword = details.get("old_password").toString();
		String newName = details.get("new_name").toString();
		String newPassword = details.get("new_password").toString();
		
		User user = userRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException("User with id " + id + " not found."));
		if (oldName.equals(user.getName()) && oldPassword.equals(user.getPassword())) {
			user.setName(newName);
			user.setPassword(newPassword);
			User saved = userRepository.save(user);
			return convertToDTO(saved);
		} else {
			throw new InvalidRequestException("Unmatched credentials for id " + id);
		}
	}
	
	public void deleteUser(Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException("User with id " + id + " not found."));
		userRepository.delete(user);
	}
	
	private UserDTO convertToDTO(User user) {
		return UserDTO.toDTO(user);
	}
	
	public User findUserByName(String name) {
		User user = userRepository.findByName(name)
				.orElseThrow(() -> new InvalidRequestException("Invalid Username or Password"));
		return user;
	}
}

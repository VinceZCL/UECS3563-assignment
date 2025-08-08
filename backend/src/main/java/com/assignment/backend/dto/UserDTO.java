package com.assignment.backend.dto;

import com.assignment.backend.model.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class UserDTO {
	private Long user_id;
	private String username;
	
	public static UserDTO toDTO(User user) {
		UserDTO dto = new UserDTO(user.getId(), user.getName());
		return dto;
	}
}

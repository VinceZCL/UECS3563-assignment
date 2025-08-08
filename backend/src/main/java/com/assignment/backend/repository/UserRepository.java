package com.assignment.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.assignment.backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	public Optional<User> findByName(String name);

}

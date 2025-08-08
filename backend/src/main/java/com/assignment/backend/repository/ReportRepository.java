package com.assignment.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.assignment.backend.model.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long>{

	List<Report> findByUserId(long userId);
	
}

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

import com.assignment.backend.model.Report;
import com.assignment.backend.service.ReportService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class ReportController {

	@Autowired
	private ReportService reportService;
	
	@GetMapping("/reports")
	public ResponseEntity<List<Report>> getReports() {
		log.info("GET /api/reports invoked");
		return ResponseEntity.status(HttpStatus.OK).body(reportService.getAllReports());
	}

	@GetMapping("/report/{id}")
	public ResponseEntity<Report> getReport(@PathVariable Long id) {
		log.info("GET /api/report/{id} invoked with id=" + id);
		return ResponseEntity.ok(reportService.getReportById(id));
	}
	
	@PostMapping("/reports")
	public ResponseEntity<Report> addReport(@RequestBody Report rep) {
		log.info("POST /api/reports invoked");
		return ResponseEntity.status(HttpStatus.CREATED).body(reportService.saveReport(rep));
	}
	
}

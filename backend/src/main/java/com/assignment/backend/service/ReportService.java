package com.assignment.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.assignment.backend.exception.ReportNotFoundException;
import com.assignment.backend.model.Report;
import com.assignment.backend.repository.ReportRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class ReportService {

	@Autowired
	private ReportRepository reportRepository;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	public List<Report> getAllReports() {
		return reportRepository.findAll();
	}
	
	public Report getReportById(Long id) {
		Report rep = reportRepository.findById(id)
				.orElseThrow(() -> new ReportNotFoundException("Report with id " + id + " not found."));
		return rep;
	}
	
	@Transactional
	public Report saveReport(Report rep) {
		Report saved = reportRepository.save(rep);
		entityManager.refresh(saved);
		return saved;
	}
	
	public List<Report> getReportsByUser(Long id) {
		List<Report> reps = reportRepository.findByUserId(id);
		return reps;
	}
	
	public void deleteReport(Long id) {
		Report rep = reportRepository.findById(id)
				.orElseThrow(() -> new ReportNotFoundException("Report with id " + id + " not found."));
		reportRepository.delete(rep);
	}
	
}

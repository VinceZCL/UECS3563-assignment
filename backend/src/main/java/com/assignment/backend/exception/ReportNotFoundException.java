package com.assignment.backend.exception;

public class ReportNotFoundException extends RuntimeException {
	public ReportNotFoundException(String message) {
		super(message);
	}
}

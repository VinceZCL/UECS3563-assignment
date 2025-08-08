package com.assignment.backend.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.assignment.backend.exception.ReportNotFoundException;
import com.assignment.backend.exception.UserNotFoundException;
import com.assignment.backend.dto.ErrorResponse;

@RestControllerAdvice
public class BackendExceptionHandler {
	
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException ex) {
		ErrorResponse err = new ErrorResponse(
			HttpStatus.NOT_FOUND.value(),
			"Not Found",
			ex.getMessage()
		);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
	}
	
	@ExceptionHandler(ReportNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleReportNotFound(ReportNotFoundException ex) {
		ErrorResponse err = new ErrorResponse(
			HttpStatus.NOT_FOUND.value(),
			"Not Found",
			ex.getMessage()
		);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
	}
}

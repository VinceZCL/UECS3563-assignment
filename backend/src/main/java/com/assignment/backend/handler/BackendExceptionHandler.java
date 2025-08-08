package com.assignment.backend.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.assignment.backend.exception.InvalidRequestException;
import com.assignment.backend.exception.ReportNotFoundException;
import com.assignment.backend.exception.UnauthorizedException;
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
	
	@ExceptionHandler(InvalidRequestException.class)
	public ResponseEntity<ErrorResponse> handleInvalidRequest(InvalidRequestException ex) {
		ErrorResponse err = new ErrorResponse(
			HttpStatus.FORBIDDEN.value(),
			"Invalid Request",
			ex.getMessage()
		);
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err);
	}
	
	@ExceptionHandler(NoResourceFoundException.class)
	public ResponseEntity<ErrorResponse> handleNoResourceFound(NoResourceFoundException ex) {
		ErrorResponse err = new ErrorResponse(
				HttpStatus.NOT_FOUND.value(),
				"Invalid Endpoint",
				"Endpoint not found"
		);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
	}
	
	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<ErrorResponse> handleHttpMessageNotReadle(HttpMessageNotReadableException ex) {
		ErrorResponse err = new ErrorResponse(
				HttpStatus.BAD_REQUEST.value(),
				"Bad Request",
				"Invalid or Malformed JSON body"
		);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}
	
	@ExceptionHandler(UnauthorizedException.class)
	public ResponseEntity<ErrorResponse> handleUnauthorized(UnauthorizedException ex) {
		ErrorResponse err = new ErrorResponse(
				HttpStatus.UNAUTHORIZED.value(),
				"Unauthorized",
				ex.getMessage()
		);
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(err);
	}
}

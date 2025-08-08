package com.assignment.backend.model;

import java.time.OffsetDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

@Entity
@Table(name="reports")
public class Report {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="report_id")
	private Long id;
	@Column(name="user_id")
	private Long userId;
	private String yesterday;
	private String today;
	private String blockers;
	@Column(name="submitted_at", insertable=false, updatable=false)
	private OffsetDateTime submitted_at;
}

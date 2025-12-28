package com.example.tmdb.dto;

import java.util.List;

import lombok.Data;

@Data
public class MovieResponse {
	
	private int page;
	private List<MovieSummary> results;
	private int total_pages;
	private int total_results;
	
	@Data
	public static class MovieSummary {
		private Long id;
		private String title;
		private String poster_path;
		private String backdrop_path;
		private String overview;
		private String release_date;
		private Double vote_average;
	}

}

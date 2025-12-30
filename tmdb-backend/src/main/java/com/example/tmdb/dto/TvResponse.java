package com.example.tmdb.dto;

import java.util.List;

import com.example.tmdb.dto.MovieResponse.MovieSummary;

import lombok.Data;

@Data
public class TvResponse {
	
	private int page;
	private List<TvShow> results;
	private int total_pages;
	private int total_results;
	
	@Data
	public static class TvShow {
		private Long id;
		private String name;
		private String original_name;
		private String overview;
		private String first_air_date;
		private String poster_path;
		private String backdrop_path;
		private Double vote_average;
	}

}

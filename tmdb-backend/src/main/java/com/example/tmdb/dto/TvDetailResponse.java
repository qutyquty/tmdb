package com.example.tmdb.dto;

import java.util.List;

import com.example.tmdb.dto.MovieDetailResponse.Genre;

import lombok.Data;

@Data
public class TvDetailResponse {
	
	private Long id;
	private String name;
	private String overview;
	private String poster_path;
	private String backdrop_path;
	private String first_air_date;
	private Integer number_of_seasons;
	private Double vote_average;
	private Integer vote_count;
	
	private List<Genre> genres;
	
	@Data
	public static class Genre {
		private Long id;
		private String name;
	}

}

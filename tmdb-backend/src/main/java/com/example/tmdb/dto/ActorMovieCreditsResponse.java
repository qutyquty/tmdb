package com.example.tmdb.dto;

import java.util.List;

import lombok.Data;

@Data
public class ActorMovieCreditsResponse {
	
	private List<MovieSummary> cast;
	
	@Data
	public static class MovieSummary {
		private Long id;
		private String title;
		private String poster_path;
		private String release_date;
		private String character; // 배우가 맡은 역할
	}

}

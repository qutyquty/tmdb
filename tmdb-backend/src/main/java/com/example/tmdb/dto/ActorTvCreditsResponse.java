package com.example.tmdb.dto;

import java.util.List;

import lombok.Data;

@Data
public class ActorTvCreditsResponse {
	
	private List<TvSummary> cast;
	
	@Data
	public static class TvSummary {
		private Long id;
		private String name;
		private String character;
		private String first_air_date;
		private String poster_path;
	}

}

package com.example.tmdb.dto;

import java.util.List;

import lombok.Data;

@Data
public class TvCreditsResponse {
	
	private List<TvCast> cast;
	
	@Data
	public static class TvCast {
		private Long id;
		private String name;
		private String profile_path;
		private String first_air_date;
		private String character;
	}

}

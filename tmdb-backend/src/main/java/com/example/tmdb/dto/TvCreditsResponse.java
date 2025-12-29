package com.example.tmdb.dto;

import java.util.List;

import lombok.Data;

@Data
public class TvCreditsResponse {
	
	private List<Cast> cast;
	
	@Data
	public static class Cast {
		private Long id;
		private String name;
		private String character;
		private String profile_path;
	}

}

package com.example.tmdb.dto;

import java.util.List;

import lombok.Data;

@Data
public class MovieDetailResponse {
	
	private Long id;
	private String title;
	private String poster_path;
	private String backdrop_path;
	private String overview;
	private String release_date;
	private Integer runtime;
	private Double vote_average;
	
	private List<Genre> genres;
	private List<CastDTO> cast; // 배우 목록 추가
	
	@Data
	public static class Genre {
		private Long id;
		private String name;
	}

}

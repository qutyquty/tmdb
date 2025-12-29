package com.example.tmdb.dto;

import lombok.Data;

@Data
public class TvDetailResponse {
	
	private Long id;
	private String name;
	private String overview;
	private String poster_path;
	private String first_air_date;
	private Integer number_of_seasons;
	private Double vote_average;
	private Integer vote_count;

}

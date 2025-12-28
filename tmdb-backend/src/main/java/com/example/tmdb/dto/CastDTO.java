package com.example.tmdb.dto;

import lombok.Data;

@Data
public class CastDTO {
	
	private Long id;
	private String name;
	private String character;
	private String profile_path;

}

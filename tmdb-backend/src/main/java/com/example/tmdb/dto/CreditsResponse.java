package com.example.tmdb.dto;

import java.util.List;

import lombok.Data;

@Data
public class CreditsResponse {
	
	private List<CastDTO> cast;
	private List<Crew> crew;
	
	@Data
	public static class Crew {
		private Long id;
		private String name; // 스태프 이름
		private String department; // 부서 (예: Directing, Writing)
		private String job; // 직무 (예: Director, Screenplay)
		private String profile_path; // 프로필 이미지 경로
	}

}

package com.example.tmdb.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.tmdb.dto.ActorDetailResponse;
import com.example.tmdb.dto.ActorDetailResponseUp;
import com.example.tmdb.dto.ActorMovieCreditsResponse;
import com.example.tmdb.dto.ActorTvCreditsResponse;
import com.example.tmdb.dto.CreditsResponse;
import com.example.tmdb.dto.MovieDetailResponse;
import com.example.tmdb.dto.MovieResponse;
import com.example.tmdb.dto.TvCreditsResponse;
import com.example.tmdb.dto.TvDetailResponse;
import com.example.tmdb.dto.TvResponse;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class TmdbService {
	
	private final WebClient webClient;
	
	@Value("${tmdb.api.key}")
	private String apiKey;
	
	// tmdb 영화 api 호출
	// 인기 영화	
	public Mono<MovieResponse> getPopularMovies() {
		return webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/movie/popular")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR") // 한국어 추가
						.build())
				.retrieve()
				.bodyToMono(MovieResponse.class);
	}
	
	// 영화 상세 조회
	public Mono<MovieDetailResponse> getMovieDetail(Long movieId) {
		Mono<MovieDetailResponse> detailMono = webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/movie/{id}")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.build(movieId))
				.retrieve()
				.bodyToMono(MovieDetailResponse.class);
		
		Mono<CreditsResponse> creditsMono = webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/movie/{id}/credits")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.build(movieId))
				.retrieve()
				.bodyToMono(CreditsResponse.class);
		
		return Mono.zip(detailMono, creditsMono)
				.map(tuple -> {
					MovieDetailResponse detail = tuple.getT1();
					CreditsResponse credits = tuple.getT2();
					detail.setCast(credits.getCast());
					return detail;
				});
	}
	
	// 영화 검색
	public Mono<MovieResponse> searchMovies(String query) {
		return webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/search/movie")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.queryParam("query", query)
						.build())
				.retrieve()
				.bodyToMono(MovieResponse.class);
	}
	
	// 배우 출연 영화 목록
	public Mono<ActorMovieCreditsResponse> getActorMovieCredits(Long actorId) {
		return webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/person/{id}/movie_credits")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.build(actorId))
				.retrieve()
				.bodyToMono(ActorMovieCreditsResponse.class)
				.map(response -> {
					// release_date 기준 최신순 정렬
					List<ActorMovieCreditsResponse.MovieCast> sorted = response.getCast().stream()
							.filter(m -> m.getRelease_date() != null && !m.getRelease_date().isEmpty())
							.sorted((m1, m2) -> m2.getRelease_date().compareTo(m1.getRelease_date()))
							.collect(Collectors.toList());
					response.setCast(sorted);
					return response;
				});
	}
	
	// 배우 기본 정보 + 배우 출연 영화 목록
	public Mono<ActorDetailResponse> getActorDetailWithMovies(Long actorId) {
		// 배우 기본 정보
		Mono<ActorDetailResponse.Actor> actorMono = webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/person/{id}")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.build(actorId))
				.retrieve()
				.bodyToMono(ActorDetailResponse.Actor.class);
		
		// 출연 영화 목록
		Mono<ActorDetailResponse> moviesMono = webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/person/{id}/movie_credits")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.build(actorId))
				.retrieve()
				.bodyToMono(ActorDetailResponse.class);
		
		// 두 API 결과 합치기
		return Mono.zip(actorMono, moviesMono)
				.map(tuple -> {
					ActorDetailResponse.Actor actor = tuple.getT1();
					ActorDetailResponse credits = tuple.getT2();
					
					// 최신순 정렬
					List<ActorDetailResponse.MovieSummary> sortedMovies = credits.getCast().stream()
							.filter(m -> m.getRelease_date() != null && !m.getRelease_date().isEmpty())
							.sorted((m1, m2) -> m2.getRelease_date().compareTo(m1.getRelease_date()))
							.collect(Collectors.toList());
					
					ActorDetailResponse response = new ActorDetailResponse();
					response.setActor(actor);
					response.setCast(sortedMovies);
					return response;
				});
	}
	// ===================================================================================

	// tmdb 티비쇼 api 호출
	// 인기 티비쇼	
	public Mono<TvResponse> getPopularTVShows() {
		return webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/tv/popular")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR") // 한국어 추가
						.build())
				.retrieve()
				.bodyToMono(TvResponse.class);
	}
	
	
	// 티비쇼 검색
	public Mono<TvResponse> searchTvShows(String query) {
		return webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/search/tv")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.queryParam("query", query)
						.build())
				.retrieve()
				.bodyToMono(TvResponse.class);
	}
	
	// 티비쇼 상세 정보 가져오기
	public Mono<TvDetailResponse> getTvShowDetail(Long tvId) {
		return webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/tv/{id}")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.build(tvId))
				.retrieve()
				.bodyToMono(TvDetailResponse.class);
	}
	
	// 티비쇼 출연 배우 가져오기
	public Mono<TvCreditsResponse> getTvShowCredits(Long tvId) {
		return webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/tv/{id}/credits")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.build(tvId))
				.retrieve()
				.bodyToMono(TvCreditsResponse.class);
	}

	
	// 배우 출연 TV 목록
	public Mono<ActorTvCreditsResponse> getActorTvCredits(Long actorId) {
		return webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/person/{id}/tv_credits")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.build(actorId))
				.retrieve()
				.bodyToMono(ActorTvCreditsResponse.class)
				.map(response -> {
					// release_date 기준 최신순 정렬
					List<ActorTvCreditsResponse.TvCast> sorted = response.getCast().stream()
							.filter(tv -> tv.getFirst_air_date() != null && !tv.getFirst_air_date().isEmpty())
							.sorted((t1, t2) -> t2.getFirst_air_date().compareTo(t1.getFirst_air_date()))
							.collect(Collectors.toList());
					response.setCast(sorted);
					return response;
				});
	}
	// ===================================================================================

	// 배우 기본 정보 + 출연 영화 목록 + 출연 티비쇼 목록
	public Mono<ActorDetailResponseUp> getActorDetailUp(Long actorId) {
		// 배우 기본 정보
		Mono<ActorDetailResponseUp.Actor> actorMono = webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/person/{id}")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.build(actorId))
				.retrieve()
				.bodyToMono(ActorDetailResponseUp.Actor.class);
		
		// 출연 영화 목록
		Mono<ActorMovieCreditsResponse> moviesMono = webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/person/{id}/movie_credits")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.build(actorId))
				.retrieve()
				.bodyToMono(ActorMovieCreditsResponse.class);
		
		// 출연 티비쇼 목록
		Mono<ActorTvCreditsResponse> tvMono = webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/person/{id}/tv_credits")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.build(actorId))
				.retrieve()
				.bodyToMono(ActorTvCreditsResponse.class);
		
		// 세 API 결과 합치기
		return Mono.zip(actorMono, moviesMono, tvMono)
				.map(tuple -> {
					ActorDetailResponseUp.Actor actor = tuple.getT1();
					ActorMovieCreditsResponse movieCredits = tuple.getT2();
					ActorTvCreditsResponse tvCredits = tuple.getT3();
					
					// 영화 최신순 정렬
					List<ActorDetailResponseUp.MovieSummary> sortedMovies = movieCredits.getCast().stream()
							.filter(m -> m.getRelease_date() != null && !m.getRelease_date().isEmpty())
							.sorted((m1, m2) -> m2.getRelease_date().compareTo(m1.getRelease_date()))
							.map(m -> {
								ActorDetailResponseUp.MovieSummary dto = new ActorDetailResponseUp.MovieSummary();
								dto.setId(m.getId());
								dto.setTitle(m.getTitle());
								dto.setPoster_path(m.getPoster_path());
								dto.setRelease_date(m.getRelease_date());
								dto.setCharacter(m.getCharacter());
								return dto;
							})
							.collect(Collectors.toList());
					
					// TV 최신순 정렬
					List<ActorDetailResponseUp.TvSummary> sortedTv = tvCredits.getCast().stream()
							.filter(m -> m.getFirst_air_date() != null && !m.getFirst_air_date().isEmpty())
							.sorted((m1, m2) -> m2.getFirst_air_date().compareTo(m1.getFirst_air_date()))
							.map(t -> {
								ActorDetailResponseUp.TvSummary dto = new ActorDetailResponseUp.TvSummary();
								dto.setId(t.getId());
								dto.setName(t.getName());
								dto.setPoster_path(t.getPoster_path());
								dto.setFirst_air_date(t.getFirst_air_date());
								dto.setCharacter(t.getCharacter());
								return dto;
							})
							.collect(Collectors.toList());
					
					ActorDetailResponseUp response = new ActorDetailResponseUp();
					response.setActor(actor);
					response.setMovies(sortedMovies);
					response.setTvShows(sortedTv);
					return response;
				});
	}
}

package com.example.tmdb.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.tmdb.dto.ActorDetailResponse;
import com.example.tmdb.dto.ActorMovieCreditsResponse;
import com.example.tmdb.dto.ActorTvCreditsResponse;
import com.example.tmdb.dto.MovieDetailResponse;
import com.example.tmdb.dto.MovieResponse;
import com.example.tmdb.dto.TvCreditsResponse;
import com.example.tmdb.dto.TvDetailResponse;
import com.example.tmdb.dto.TvResponse;
import com.example.tmdb.service.TmdbService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

//@CrossOrigin(origins = "*") // 모든 Origin 허용
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TmdbController {
	
	private final TmdbService tmdbService;
	
	@GetMapping("/movies/popular")
	public Mono<MovieResponse> getPopularMovies() {
		return tmdbService.getPopularMovies();
	}
	
	@GetMapping("/movies/{id}")
	public Mono<MovieDetailResponse> getMovieDetail(@PathVariable("id") Long id) {
		return tmdbService.getMovieDetail(id);
	}
	
	@GetMapping("/movies/search")
	public Mono<MovieResponse> searchMovies(@RequestParam("query") String query) {
		return tmdbService.searchMovies(query);
	}
	
	@GetMapping("/movies/actors/{id}/movies")
	public Mono<ActorMovieCreditsResponse> getActorMovies(@PathVariable("id") Long id) {
		return tmdbService.getActorMovieCredits(id);
	}
	
	@GetMapping("/movies/actors/{id}/detail")
	public Mono<ActorDetailResponse> getActorDetailWithMovies(@PathVariable("id") Long id) {
		return tmdbService.getActorDetailWithMovies(id);
	}
	
	@GetMapping("/tv/popular")
	public Mono<TvResponse> getPopularTVShows() {
		return tmdbService.getPopularTVShows();
	}
	
	@GetMapping("/tv/search")
	public Mono<TvResponse> searchTvShows(@RequestParam("query") String query) {
		return tmdbService.searchTvShows(query);
	}
	
	@GetMapping("/tv/{id}")
	public Mono<TvDetailResponse> getTvShowDetail(@PathVariable("id") Long id) {
		return tmdbService.getTvShowDetail(id);
	}
	
	@GetMapping("/tv/{id}/credits")
	public Mono<TvCreditsResponse> getTvCredits(@PathVariable("id") Long id) {
		return tmdbService.getTvShowCredits(id);
	}
	
	@GetMapping("/person/{id}/movie_credits")
	public Mono<ActorMovieCreditsResponse> getActorMovieCredits(@PathVariable("id") Long id) {
		return tmdbService.getActorMovieCredits(id);
	}
	
	@GetMapping("/person/{id}/tv_credits")
	public Mono<ActorTvCreditsResponse> getActorTvCredits(@PathVariable("id") Long id) {
		return tmdbService.getActorTvCredits(id);
	}
}

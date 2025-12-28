package com.example.tmdb.controller;

import java.util.Map;
import java.util.Objects;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.tmdb.dto.ActorDetailResponse;
import com.example.tmdb.dto.ActorMovieCreditsResponse;
import com.example.tmdb.dto.MovieDetailResponse;
import com.example.tmdb.dto.MovieResponse;
import com.example.tmdb.service.MovieService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

//@CrossOrigin(origins = "*") // 모든 Origin 허용
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/movies")
public class MovieController {
	
	private final MovieService movieService;
	
	@GetMapping("/popular")
	public Mono<MovieResponse> getPopularMovies() {
		return movieService.getPopularMovies();
	}
	
	@GetMapping("/{id}")
	public Mono<MovieDetailResponse> getMovieDetail(@PathVariable("id") Long id) {
		return movieService.getMovieDetail(id);
	}
	
	@GetMapping("/search")
	public Mono<MovieResponse> searchMovies(@RequestParam("query") String query) {
		return movieService.searchMovies(query);
	}
	
	@GetMapping("/actors/{id}/movies")
	public Mono<ActorMovieCreditsResponse> getActorMovies(@PathVariable("id") Long id) {
		return movieService.getActorMovieCredits(id);
	}
	
	@GetMapping("/actors/{id}/detail")
	public Mono<ActorDetailResponse> getActorDetailWithMovies(@PathVariable("id") Long id) {
		return movieService.getActorDetailWithMovies(id);
	}
	
}

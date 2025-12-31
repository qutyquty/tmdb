package com.example.tmdb.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tmdb.entity.Comment;
import com.example.tmdb.service.CommentService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*") // 모든 Origin 허용
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CommentController {
	
	private final CommentService commentService;
	
	@GetMapping("/comments/{mtId}")
	public List<Comment> getComments(@PathVariable("mtId") Long mtId) {
		return commentService.findByMovieId(mtId);
	}
	
	@PostMapping("/comments")
	public Comment addComment(@RequestBody Comment comment) {
		return commentService.save(comment);
	}
	
	@DeleteMapping("/comments/{id}")
	public void deleteComment(@PathVariable("id") Long id) {
		commentService.delete(id);
	}

}

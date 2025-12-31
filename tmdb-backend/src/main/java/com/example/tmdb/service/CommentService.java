package com.example.tmdb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.tmdb.entity.Comment;
import com.example.tmdb.repository.CommentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {
	
	private final CommentRepository commentRepository;
	
	public List<Comment> findAll() {
		return commentRepository.findAll();
	}
	
	public List<Comment> findByMovieId(Long mtId) {
		return commentRepository.findByMtId(mtId);
	}
	
	public Comment save(Comment comment) {
		return commentRepository.save(comment);
	}
	
	public void delete(Long id) {
		commentRepository.deleteById(id);
	}

}

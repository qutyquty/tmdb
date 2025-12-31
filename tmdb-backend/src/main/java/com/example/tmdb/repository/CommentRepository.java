package com.example.tmdb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tmdb.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	
	List<Comment> findByMtId(Long mtId);

}

package com.example.tmdb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardController {
	
	// (.)이 없는 모든 경로를 index.html로 포워딩
	@RequestMapping("/{path:[^\\\\.]*}")
	public String forward() {
		return "forward:/index.html";
	}

}

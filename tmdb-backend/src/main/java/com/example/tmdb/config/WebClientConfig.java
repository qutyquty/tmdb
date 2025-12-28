package com.example.tmdb.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
	
	@Value("${tmdb.api.base-url}")
	private String baseUrl;
	
	@Bean
	public WebClient webClient(WebClient.Builder builder) {
		return builder
				.baseUrl(baseUrl)
				.codecs(configurer ->
					configurer.defaultCodecs().maxInMemorySize(16 * 1024 * 1024)
				)
				.build();
	}

}

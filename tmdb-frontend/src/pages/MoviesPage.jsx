import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { getPopularMovies, searchMovies } from '../api';
import ContentCard from "../components/ContentCard";
import SearchBar from '../components/SearchBar';

const MoviePage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const data = await getPopularMovies();
                setMovies(data.results);
            } catch (error) {
                console.error("인기 영화 조회 오류: ", error);
            } finally {
                
            }
        };

        fetchPopularMovies();
    }, []);

    const searchMoviesProp = async (query) => {
        try {
            const data = await searchMovies(query);
            console.log("MoviesPage.jsx => ", data);
            setMovies(data);
        } catch (error) {
            console.error("영화 검색 실패: ", error);
        }
    };

    // 인기 영화 중 첫 번재 영화의 backdrop 이미지 URL
    const backdropUrl = movies.length > 0
        ? `https://image.tmdb.org/t/p/w780${movies[0].backdrop_path}`
        : "https://placehold.co/800x200?text=Search+Background";

  return (
    <Container className="mt-4">
        <SearchBar onSearch={searchMoviesProp} placeholder="영화 제목 검색" backdropUrl={backdropUrl} />
        <Row className='mt-4'>
            {movies.map((movie) => (
                <Col key={movie.id} xs={6} sm={4} lg={3} className='mb-4'>
                    <ContentCard 
                        id={movie.id}
                        title={movie.title}
                        posterPath={movie.poster_path}
                        overview={movie.overview}
                        releaseDate={movie.release_date}
                        type="movie"
                    />
                </Col>
            ))}
        </Row>
    </Container>
  );
};

export default MoviePage;
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { getPopularMovies, searchMovies } from '../api/api';
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

  return (
    <Container className="mt-4">
        <SearchBar onSearch={searchMoviesProp} placeholder="영화 제목 검색" />
        <h3 className='mt-4'>인기 영화</h3>
        <Row>
            {movies.map((movie) => (
                <Col key={movie.id} xs={6} sm={4} lg={3} className='mb-4'>
                    <ContentCard 
                        id={movie.id}
                        title={movie.title}
                        posterPath={movie.poster_path}
                        overview={movie.overview}
                        releaseDate={movie.release_date}
                        voteAverage={movie.vote_average}
                        type="movie"
                    />
                </Col>
            ))}
        </Row>
    </Container>
  );
};

export default MoviePage;
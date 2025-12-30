import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner, Card, Form, Button } from 'react-bootstrap'

import { getPopularMovies, getPopularTvShows } from '../api/api';
import ContentCard from "../components/ContentCard";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularData = async () => {
      try {
        const mData = await getPopularMovies();
        setMovies(mData.results.slice(0, 10));

        const tData = await getPopularTvShows();
        setTvShows(tData.results.slice(0, 10));
      } catch (error) {
        console.error("인기 영화/티비쇼 조회 오류: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularData();
  }, []);

  if (loading) {
    return (
        <Container className='text-center mt-5'>
            <Spinner animation='border' variant='primary'></Spinner>
            <p>Loading ...</p>
        </Container>
    )
  }

  // 인기 영화 중 첫 번재 영화의 backdrop 이미지 URL
  const mBackdropUrl = movies.length > 0
    ? `https://image.tmdb.org/t/p/w780${movies[0].backdrop_path}`
    : "https://placehold.co/800x200?text=Search+Background";

  // 인기 티비쇼 중 첫 번재 티비쇼의 backdrop 이미지 URL
  const tBackdropUrl = tvShows.length > 0
    ? `https://image.tmdb.org/t/p/w780${tvShows[0].backdrop_path}`
    : "https://placehold.co/800x200?text=Search+Background";

  return (
    <Container className="mt-4">
      <div style={{ backgroundImage: `url(${mBackdropUrl})`, 
        backgroundSize: "cover", backgroundPosition: "center",
        height: "400px", display: "flex", alignItems: "flex-end",
        padding: "20px", borderRadius: "10px", 
        color: "white", fontWeight: "bold", fontSize: "2rem",
        textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
        }}
      >
        인기 영화 TOP 10        
      </div>

      <Row className='mt-4'>
        {movies.map((movie) => (
          <Col key={movie.title} xs={12} sm={6} md={4} lg={3} className='mb-4'>
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

      <div style={{ backgroundImage: `url(${tBackdropUrl})`, 
        backgroundSize: "cover", backgroundPosition: "center",
        height: "400px", display: "flex", alignItems: "flex-end",
        padding: "20px", borderRadius: "10px", 
        color: "white", fontWeight: "bold", fontSize: "2rem",
        textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
        }}
      >
        인기 티비쇼 TOP 10        
      </div>
      <Row className='mt-4'>
        {tvShows.map((tv) => (
          <Col key={tv.name} xs={12} sm={6} md={4} lg={3} className='mb-4'>
            <ContentCard 
                id={tv.id}
                title={tv.name}
                posterPath={tv.poster_path}
                overview={tv.overview}
                releaseDate={tv.first_air_date}
                voteAverage={tv.vote_average}
                type="tv"
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage
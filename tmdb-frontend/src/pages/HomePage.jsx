import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner, Card, Form, Button } from 'react-bootstrap'

import { getPopularMovies, searchMovies } from '../api/api';
import MovieCard from "../components/MovieCard";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data.results);
      } catch (error) {
        console.error("인기 영화 조회 오류: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    const results = await searchMovies(query);
    setSearchResults(results);
  };

  if (loading) {
    return (
        <Container className='text-center mt-5'>
            <Spinner animation='border' variant='primary'></Spinner>
            <p>Loading ...</p>
        </Container>
    )
  }

  // 인기 영화 중 첫 번재 영화의 backdrop 이미지 URL
  const backdropUrl = movies.length > 0
    ? `https://image.tmdb.org/t/p/w780${movies[0].backdrop_path}`
    : "https://placehold.co/800x200?text=Search+Background";

  return (
    <Container className="mt-4">
      <div style={{ backgroundImage: `url(${backdropUrl})`, 
        backgroundSize: "cover", backgroundPosition: "center",
        height: "400px", display: "flex", alignItems: "flex-end",
        padding: "20px", borderRadius: "10px", }}
      >
        {/** 검색창 */}
        <Form onSubmit={handleSearch} className="w-100 mb-1">
          <Row>
            <Col md={10}>
              <Form.Control
                type="text"
                placeholder="영화 제목을 입력하세요..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Col>
            <Col md={2}>
              <Button type="submit" variant="primary" className="w-100">
                검색
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      {/** 검색 결과 */}
      {searchResults.length > 0 ? (
        <>
          <h3 className='mt-4'>검색 결과</h3>
          <Row>
            {searchResults.map((movie) => (
              <Col md={3} key={movie.id} className="mb-4">
                <Card
                  className="h-100 text-center shadow-sm"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/movies/${movie.id}`)} // 👉 클릭 시 상세 페이지 이동
                >
                  <Card.Img
                    variant="top"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : "https://placehold.co/150x225?text=No+Image"
                    }
                    alt={movie.title}
                    style={{
                      width: "150px",
                      height: "225px",
                      objectFit: "cover",
                      margin: "10px auto",
                    }}
                  />
                  <Card.Body>
                    <Card.Title style={{ fontSize: "1rem" }}>{movie.title}</Card.Title>
                    <Card.Text style={{ fontSize: "0.85rem" }}>
                      개봉일: {movie.release_date || "정보 없음"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>        
          <h3 className='mt-4'>인기 영화</h3>
          <Row>
            {movies.map((movie) => (
              <Col key={movie.title} xs={12} sm={6} md={4} lg={3} className='mb-4'>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </>
      )}
      </Container>
  );
}

export default HomePage
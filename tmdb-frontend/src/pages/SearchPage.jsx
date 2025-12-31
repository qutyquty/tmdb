import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { searchMovies } from '../api';

function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await searchMovies(query);
      setMovies(data);
    } catch (error) {
      console.error("검색 에러: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      {/* 검색창 */}
      <Form onSubmit={handleSearch} className="mb-4">
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

      {/* 로딩 표시 */}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>검색 중...</p>
        </div>
      )}

      {/* 검색 결과 */}
      <Row>
        {movies.map((movie) => (
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
    </Container>
  );
}

export default SearchPage;
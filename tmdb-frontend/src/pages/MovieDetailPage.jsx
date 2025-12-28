import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Row, Col, Card, Badge, Spinner } from "react-bootstrap"

import { getMovieDetail } from '../api/api';

const MovieDetailPage = () => {
  const { id } = useParams() // URL에서 영화 ID 추출
  const [movie, setMovie] = useState(null)
  const [actorMovies, setActorMovies] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedActor, setSelectedActor] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const data = await getMovieDetail(id);
        setMovie(data);
      } catch (error) {
        console.error("영화 상세 조회 API 호출 에러: ", error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie) {
    return (
      <Container className='text-center mt-5'>
        <Spinner animation='border' variant='primary' />
        <p>Loading...</p>
      </Container>
    )
  }

  const handleActorClick = (actor) => {
    setSelectedActor(actor);
    axios.get(`http://localhost:8080/api/movies/actors/${actor.id}/movies`)
      .then((response) => {
        setActorMovies(response.data.cast);
        setShowModal(true);
      })
      .catch((error) => console.error(error));
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image"

  return (
    <Container className='mt-4'>
      {/** 상단 배너: backdrop 이미지 */}
      <Card className='bg-dark text-white mb-4'>
        <Card.Img src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={movie.title}
          style={{ height: "500px", objectFit: "cover" }}
        />
        <Card.ImgOverlay className='d-flex flex-column justify-content-end'>
          <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "10px" }}>
            <Card.Title className='fw-bold'>{movie.title}</Card.Title>
            <Card.Text>
              개봉일: {movie.release_date} | 상영시간: {movie.runtime}분 | 평점: {movie.vote_average} / 10
            </Card.Text>
          </div>
        </Card.ImgOverlay>
      </Card>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant='top' src={posterUrl} alt={movie.title} />
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Text>
                <strong>줄거리:</strong><br />{movie.overview ? movie.overview : "줄거리 정보 없음"}              
              </Card.Text>

              {/* 장르 표시 */}
              <div className='mb-3'>
                <strong>장르:</strong>{" "}
                {movie.genres && movie.genres.map((genre) => (
                  <Badge bg="secondary" key={genre.id} className='me-1'>
                    {genre.name}
                  </Badge>
                ))}
              </div>

              <div>
                <strong>출연 배우:</strong>
                <Row className='mt-2'>
                  {movie.cast && movie.cast.slice(0, 10).map((actor) => (
                    <Col md={4} key={actor.id} className='mb-3'>
                      <Card className='text-center shadow-sm' onClick={() => navigate(`/actors/${actor.id}/movies`)} style={{ cursor: "pointer" }}>
                        <Card.Img variant='top'
                          src={actor.profile_path 
                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                            : "https://via.placeholder.com/200x300?text=No+Image"}
                          alt={actor.name}
                          style={{ width: "120px", height: "180px", objectFit: "cover", margin: "10px auto", borderRadius: "8px", }}
                        />
                        <Card.Body>
                          <Card.Title style={{ fontSize: "1rem" }}>{actor.name}</Card.Title>
                          <Card.Text style={{ fontSize: "0.85rem" }}>역할: {actor.character}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default MovieDetailPage
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Row, Col, Card, Badge, Spinner } from "react-bootstrap"

import { getMovieDetail } from '../api/api';
import DetailLayoutUp from '../components/DetailLayoutUp';

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

  return (
    <DetailLayoutUp
      posterPath={movie.poster_path}
      title={movie.title}
      overview={movie.overview}
      releaseDate={movie.release_date}
      extraInfo={`상영 시간: ${movie.runtime}분`}
      genres={movie.genres}
      backdropPath={movie.backdrop_path}
      voteAverage={movie.vote_average}
      credits={movie.cast}
    />
  )
}

export default MovieDetailPage
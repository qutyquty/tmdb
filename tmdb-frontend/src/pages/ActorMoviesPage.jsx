import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap'

import { getActorDetail } from '../api'

const ActorMoviesPage = () => {
    const { id } = useParams()
    const [actor, setActor] = useState(null)
    const [movies, setMovies] = useState([])    
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchActorDetail = async () => {
            try {
            const data = await getActorDetail(id); // 👉 api.jsx 함수 호출
            setActor(data.actor);
            setMovies(data.cast);
            } catch (error) {
            console.error("배우 상세 조회 에러:", error);
            } finally {
            setLoading(false);
            }
        };

        fetchActorDetail(); // 👉 정의한 함수를 실제로 실행
    }, [id]);

    if (loading) {
        return (
            <Container className='text-center mt-5'>
                <Spinner animation='border' variant='primary'></Spinner>
                <p>Loading ...</p>
            </Container>
        )
    }

    const actorImg = actor?.profile_path
        ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
        : "http://via.placeholder.com/150x225?text=No+Image";

  return (
    <Container className='mt-5'>
        {/** 배우 정보 */}
        <Row className='mb-4'>
            {/** 왼쪽: 프로필 사직 */}
            <Col md={4} className='text-center'>
                <img src={actorImg} alt={actor?.name}
                    style={{ width: "100%", maxWidth: "200px", height: "auto", objectFit: "cover", borderRadius: "8px" }}
                />
            </Col>
            {/** 오른쪽: 배우 정보 */}
            <Col md={8}>
                <h2>{actor?.name}</h2>
                <p><strong>생년월일:</strong> {actor?.birthday || "정보 없음"}</p>
                <p><strong>출생지:</strong> {actor?.place_of_birth || "정보 없음"}</p>
                <p style={{ whiteSpace: "pre-line" }}>
                    {actor?.biography ? actor.biography : "약력 정보 없음"}
                </p>
            </Col>
        </Row>

        {/** 출연 영화 목록 */}
        <Row className='mt-4'>
            {movies.map((movie) => (
                <Col md={3} key={movie.id} className='mb-4'>
                    <Card className='h-100 text-center shadow-sm'>
                        <Card.Img variant='top'
                            src={movie.poster_path
                                    ? `https:///image.tmdb.org/t/p/w200${movie.poster_path}`
                                    : "https://placehold.co/150x225?text=No+Image"
                            }
                            alt={movie.title}
                            style={{ width: "150px", height: "225px", objectFit: "cover", margin: "10px auto", cursor: "pointer", }}
                            onClick={() => navigate(`/movies/${movie.id}`)}
                        />
                        <Card.Body>
                            <Card.Title style={{ fontSize: "1rem" }}>{movie.title}</Card.Title>
                            <Card.Text style={{ fontSize: "0.85rem" }}>
                                개봉일: {movie.release_date} <br />
                                역할: {movie.character}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
  )
}

export default ActorMoviesPage
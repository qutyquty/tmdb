import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Comments from './Comments';

const DetailLayoutUp = ({
    mtId,
    posterPath,
    title,
    overview,
    releaseDate,
    extraInfo,
    genres,
    backdropPath,
    voteAverage,
    credits
}) => {
    const navigate = useNavigate();

  return (
    <Container className='mt-4'>
        {/** 상단 배너: backdrop 이미지 */}
        <Card className='bg-dark text-white mb-4'>
            <Card.Img src={`https://image.tmdb.org/t/p/w780${backdropPath}`}
            alt={title}
            style={{ height: "500px", objectFit: "cover" }}
            />
            <Card.ImgOverlay className='d-flex flex-column justify-content-end'>
            <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "10px" }}>
                <Card.Title className='fw-bold'>{title}</Card.Title>
                <Card.Text>
                개봉/첫 방영일: {releaseDate} | 평점: ⭐ {voteAverage} / 10
                </Card.Text>
            </div>
            </Card.ImgOverlay>
        </Card>

        <Row>
            <Col md={4}>
                <Card>
                    <Card.Img variant='top' src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
                </Card>
                <Comments mtId={mtId} />
            </Col>
            <Col md={8}>
                <Card>
                    <Card.Body>
                        <Card.Text>
                            <strong>추가 정보:</strong>{" "}
                            <Badge bg="secondary" key={extraInfo} className='me-1'>
                                {extraInfo}
                            </Badge>
                        </Card.Text>
                        <Card.Text>
                            <strong>줄거리:</strong><br />{overview ? overview : "줄거리 정보 없음"}
                        </Card.Text>

                        {/* 장르 표시 */}
                        <div className='mb-3'>
                            <strong>장르:</strong>{" "}
                            {genres && genres.map((genre) => (
                            <Badge bg="secondary" key={genre.id} className='me-1'>
                                {genre.name}
                            </Badge>
                            ))}
                        </div>

                        <div>
                            <strong>출연 배우:</strong>
                            <Row className='mt-2'>
                            {credits && credits.slice(0, 10).map((actor) => (
                                <Col md={4} key={actor.id} className='mb-3'>
                                <Card className='text-center shadow-sm' onClick={() => navigate(`/person/${actor.id}/detail`)} style={{ cursor: "pointer" }}>
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
  );
};

export default DetailLayoutUp;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DetailLayout = ({
    posterPath,
    title,
    overview,
    releaseDate,
    extraInfo,
    credits
}) => {
    const navigate = useNavigate();

  return (
    <Container>
        <Row>
            <Col md={4}>
                <img src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                    alt={title} className='img-fluid'
                />
            </Col>
            <Col md={8}>
                <h2>{title}</h2>
                <p><strong>개봉/첫 방영일:</strong> {releaseDate}</p>
                {extraInfo && <p><strong>추가 정보:</strong> {extraInfo}</p>}
                <p>{overview}</p>
                <h4>출연 배우</h4>
                <ul>
                    {credits?.map(actor => (
                        <li key={actor.cast_id || actor.credit_id} style={{ marginBottom: "1rem" }}>
                            <img src={actor.profile_path 
                                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                : "https://placehold.co/150x225?text=No+Image"}
                                alt={actor.name}
                                onClick={() => navigate(`/person/${actor.id}/credits`)}
                                style={{ width: "80px", borderRadius: "8px", marginRight: "10px", cursor: "pointer" }}
                            />
                            <span>{actor.name} ({actor.character})</span>
                        </li>
                    ))}
                </ul>
            </Col>
        </Row>
    </Container>
  );
};

export default DetailLayout;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';

import { getActorMovieCredits, getActorTvCredits } from '../api';

const ActorDetailPage = () => {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const movieCredits = await getActorMovieCredits(id);
                setMovies(movieCredits.cast);

                const tvCredits = await getActorTvCredits(id);
                setTvShows(tvCredits.cast);
            } catch (error) {
                console.error("배우 출연 목록 불러오기 실패: ", error);
            }
        };

        fetchCredits();
    }, [id]);

  return (
    <Container>
        <h2>배우 출연작</h2>
        <Tabs defaultActiveKey="movies" className='mb-3'>

            {/** 영화 탭 */}
            <Tab eventKey="movies" title="영화">
                <Row>
                    {movies.map(movie => (
                        <Col key={movie.credit_id || movie.id} xs={6} md={4} lg={3}>
                            <div style={{ marginBottom: "1rem" }}>
                                <img src={movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                                        : ""}
                                    alt={movie.title} className='img-fluid'                                
                                />
                                <p>{movie.title} ({movie.character})</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Tab>

            {/** 드라마 탭 */}
            <Tab eventKey="tv" title="TV Show">
                <Row>
                    {tvShows.map(tv => (
                        <Col key={tv.credit_id || tv.id} xs={6} md={4} lg={3}>
                            <div style={{ marginBottom: "1rem" }}>
                                <img src={tv.poster_path
                                        ? `https://image.tmdb.org/t/p/w200${tv.poster_path}`
                                        : ""}
                                    alt={tv.name}
                                    className='img-fluid'
                                />
                                <p>{tv.name} ({tv.character})</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Tab>
        </Tabs>
    </Container>
  );
};

export default ActorDetailPage;

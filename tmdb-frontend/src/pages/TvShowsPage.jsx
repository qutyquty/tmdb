import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { getPopularTvShows, searchTvShows } from '../api/api';
import ContentCard from "../components/ContentCard";
import SearchBar from '../components/SearchBar';

const TvShowsPage = () => {
    const [tvShows, setTvShows] = useState([]);

    useEffect(() => {
        const fetchPopularTvShows = async () => {
            try {
                const data = await getPopularTvShows();
                setTvShows(data.results);
            } catch (error) {
                console.error("인기 티비쇼 조회 오류: ", error);
            } finally {

            }
        };

        fetchPopularTvShows();
    }, []);

    const searchTvShowsProp = async (query) => {
        try {
            const data = await searchTvShows(query);
            console.log("TvShowsPage.jsx => ", data);
            setTvShows(data);
        } catch (error) {
            console.error("티비쇼 검색 실패: ", error);
        }
    };

    const backdropUrl = tvShows.length > 0
        ? `https://image.tmdb.org/t/p/w780${tvShows[0].backdrop_path}`
        : "https://placehold.co/800x200?text=Search+Background";

  return (
    <Container className="mt-4">
        <SearchBar onSearch={searchTvShowsProp} placeholder="티비쇼 제목 검색" backdropUrl={backdropUrl} />
        <Row className='mt-4'>
            {tvShows.map((tv) => (
                <Col key={tv.id} xs={6} sm={4} lg={3} className='mb-4'>
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
};

export default TvShowsPage;
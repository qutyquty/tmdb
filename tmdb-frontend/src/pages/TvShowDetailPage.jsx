import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getTvShowDetail, getTvShowCredits } from '../api/api';
import DetailLayout from '../components/DetailLayout';

const TvShowDetailPage = () => {
    const { id } = useParams();
    const [tvShow, setTvShow] = useState(null);
    const [credits, setCredits] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const detail = await getTvShowDetail(id);
                setTvShow(detail);

                const creditsData = await getTvShowCredits(id);
                setCredits(creditsData.cast);
            } catch (error) {
                console.error("티비쇼 상세/출연진 불러오기 실패: ", error);
            }
        };

        fetchData();
    }, [id]);

    if (!tvShow) return <p>Loading ...</p>;

  return (
    <DetailLayout
        posterPath={tvShow.poster_path}
        title={tvShow.name}
        overview={tvShow.overview}
        releaseDate={tvShow.first_air_date}
        extraInfo={`시즌 수: ${tvShow.number_of_seasons}`}
        credits={credits}
     />
  );
};

export default TvShowDetailPage;

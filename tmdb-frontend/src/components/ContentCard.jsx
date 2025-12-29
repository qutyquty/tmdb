import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ContentCard = ({ id, title, posterPath, overview, releaseDate, voteAverage, type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === "movie") {
      navigate(`/movies/${id}`);
    } else if (type === "tv") {
      navigate(`/tv/${id}`);
    }
  };

  return (
    <Card style={{ width: '14rem', cursor: "pointer" }}
      onClick={handleClick}
    >
        <Card.Img variant='top' src={`https://image.tmdb.org/t/p/w500${posterPath}`} />
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{overview?.slice(0, 80)} ...</Card.Text>
            <small>{releaseDate}</small><br />
            <small>⭐ {voteAverage}</small>
        </Card.Body>
    </Card>
  );
};

export default ContentCard;
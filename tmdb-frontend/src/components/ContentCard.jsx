import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ContentCard = ({ id, title, posterPath, overview, releaseDate, type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === "movie") {
      navigate(`/movies/${id}`);
    } else if (type === "tv") {
      navigate(`/tv/${id}`);
    }
  };

  return (
    <Card className='mb-4 shadow-sm h-100' style={{ width: '18rem', cursor: "pointer" }}
      onClick={handleClick}
    >
        <Card.Img variant='top' src={`https://image.tmdb.org/t/p/w500${posterPath}`} />
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>
                {releaseDate}
            </Card.Subtitle>
            {overview !== undefined && (
              <Card.Text>
                  {overview && overview.trim() !== ""
                      ? overview.slice(0, 100) + "..."
                      : "No decription available"}
              </Card.Text>
            )}
        </Card.Body>
    </Card>
  );
};

export default ContentCard;
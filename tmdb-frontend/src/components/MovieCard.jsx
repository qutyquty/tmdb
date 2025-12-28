import React from 'react'
import { Link } from "react-router-dom";

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const MovieCard = ({ movie }) => {
    // TMDB 이미지 기본 URL
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image"; // 포스터 없을 때 대체 이미지

  return (
    <Card className='mb-4 shadow-sm' style={{ width: "18rem" }}>
        <Card.Img variant='top' src={posterUrl} alt={movie.title} />
        <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>
                {movie.release_date}
            </Card.Subtitle>
            <Card.Text>
                {movie.overview
                    ? movie.overview.slice(0, 100) + "..."
                    : "No decription available"}
            </Card.Text>
            {/* 상세 페이지로 이동하는 링크 */}
            <Link to={`/movies/${movie.id}`}>
                <Button variant='primary'>상세보기</Button>
            </Link>
        </Card.Body>
    </Card>
  )
}

export default MovieCard
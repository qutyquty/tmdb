import React from 'react'
import { Navbar as Nb, Container, Nav } from 'react-bootstrap'

const Navbar = () => {
  return (
    <Nb bg="dark" varient="dark" expand="lg" fixed="top">
        <Container>
            <Nb.Brand href="/">My Movie App</Nb.Brand>
            <Nav className='me-auto'>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/movies">Movies</Nav.Link>
                <Nav.Link href="/tvshows">TV Shows</Nav.Link>
                <Nav.Link href="/search">Search</Nav.Link>
            </Nav>
        </Container>
    </Nb>
  )
}

export default Navbar
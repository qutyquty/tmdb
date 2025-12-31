import React from 'react'
import { Navbar as Nb, Container, Nav } from 'react-bootstrap'

const Navbar = () => {
  return (
    <Nb bg="dark" varient="dark" expand="lg" fixed="top">
        <Container>
            <Nb.Brand href="/">My Movie/Drama/Show App</Nb.Brand>
            <Nav className='me-auto'>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/movies">Movies</Nav.Link>
                <Nav.Link href="/tvshows">Drama/Show</Nav.Link>
                <Nav.Link href="/search">Search</Nav.Link>
            </Nav>
        </Container>
    </Nb>
  )
}

export default Navbar
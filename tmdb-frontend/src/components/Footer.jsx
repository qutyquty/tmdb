import React from 'react'
import { Container } from "react-bootstrap"

const Footer = () => {
  return (
    <footer className='bg-dark text-light text-center py-3 fixed-bottom'>
        <Container>
            <small>© 2025 My Movie App. All rights reserved.</small>
        </Container>
    </footer>
  )
}

export default Footer
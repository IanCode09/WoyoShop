import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import { Container, Navbar, Nav } from 'react-bootstrap'


const header = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Woyo<span className="text-secondary">Shop</span></Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link style={{marginRight: '30px'}}><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/login'>
                                <Nav.Link><i className="fas fa-user"></i> Sign In</Nav.Link>
                            </LinkContainer>                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default header

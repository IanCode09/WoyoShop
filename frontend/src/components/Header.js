import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'


const header = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Woyo<span className="text-secondary">Shop</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/cart" style={{marginRight: '30px'}}><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            <Nav.Link href="/login" ><i className="fas fa-user"></i> Sign In</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default header

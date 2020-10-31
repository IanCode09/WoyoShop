import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userAction'
import SearchBox from './SearchBox'


const Header = () => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Woyo<span className="text-secondary">Shop</span></Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Route render={({ history }) => <SearchBox history={history} />} />

                        <Nav className="ml-auto">
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin User' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                            
                            {userInfo ? (
                               <NavDropdown title={userInfo.name} id='username'>
                                   <LinkContainer to='/profile'>
                                       <NavDropdown.Item>Profile</NavDropdown.Item>
                                   </LinkContainer>
                                   <NavDropdown.Item onClick={logoutHandler}>
                                       Logout
                                   </NavDropdown.Item>
                               </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className="fas fa-user"></i> Sign In</Nav.Link>
                                </LinkContainer>                            
                            )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header

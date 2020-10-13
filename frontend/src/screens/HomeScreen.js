import React from 'react'
import products from '../json/products'
import Product from '../components/Product'
import Hero from '../components/Hero'

import { Col, Row, Container } from 'react-bootstrap'

const HomeScreen = () => {
    return (
        <>
            <Hero />
            <Container>
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>  
            </Container>
            
        </>
    )
}

export default HomeScreen

import React from 'react'
import products from '../json/products'
import Product from '../components/Product'

import { Col, Row } from 'react-bootstrap'

const HomeScreen = () => {
    return (
        <>
            <Row>
                {products.map(product => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                 ))}
            </Row>  
        </>
    )
}

export default HomeScreen

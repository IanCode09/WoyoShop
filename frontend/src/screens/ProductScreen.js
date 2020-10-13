import React from 'react'
import { Link } from 'react-router-dom'

import {Row, Col, Image, ListGroup, Button } from 'react-bootstrap'

import products from '../json/products'
import Rating from '../components/Rating'

const ProductScreen = ({ match }) => {
    const product = products.find((p) => p._id === match.params.id )
    // console.log(product);

    return (
        <>
            <Link to='/' className='btn btn-primary my-5' >Back</Link>
            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>{product.name}</h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating 
                                value={product.rating}  
                            />
                            {product.numReviews} Reviews
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: <span style={{fontSize: '20px', color: 'blue'}}>${product.price}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span style={{ fontWeight: 'bold', fontSize: '18px'}}>Description:</span>  {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={4}>Status :</Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock' }
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className='btn-block' disabled={product.countInStock === 0} type='button'>Add to Cart</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen

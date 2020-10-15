import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'

import {Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ match }) => {
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch])

    return (
        <>
            <Link to='/' className='btn btn-primary my-5' >Back</Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
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
            }
        </>
    )
}

export default ProductScreen

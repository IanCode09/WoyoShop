import React from 'react'
import { Card } from 'react-bootstrap'

import Rating from './Rating'

const Product = ({product}) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/product/${product._id}`}>
                <Card.Img src={product.image} varian='top' />
            </a>
            <Card.Body>
                <a href={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        {product.name}
                    </Card.Title>
                </a>
                
                <Card.Text as='div'>
                    <div>
                        <Rating value={product.rating} /> 
                        <span style={{color: '#144FC3'}}>{product.numReviews} reviews</span>
                        <p style={{fontSize: '20px', marginTop: '10px'}}>${product.price}</p>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product

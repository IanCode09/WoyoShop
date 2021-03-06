import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
// import Hero from '../components/Hero'
import { Col, Row, Container } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1 

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta />
            {/* <Hero /> */}
            {!keyword ? ( <ProductCarousel /> 
            ) : (
                <Container>
                    <Link to='/' className='btn btn-primary my-5'>
                        Go Back
                    </Link>
                </Container>
            )}
                <Container>
                    { loading ? (
                        <Loader />
                    ) : error ? ( 
                        <Message variant='danger'>{error}</Message> 
                    ) : (
                        <>
                            <Row>
                                {products.map((product) => (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                ))}
                            </Row> 
                            
                            <Paginate 
                                pages={pages}
                                page={page}
                                keyword={keyword ? keyword : ''}
                            />
                        </>
                    )
                    }
                </Container>
        </>
    )
}

export default HomeScreen

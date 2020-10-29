import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup, Row, Col, Image, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

const OrderScreen = ({ match }) => {
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { loading, order, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    if (!loading) {
        //   Calculate prices
        const addDecimals = (num) => {
          return (Math.round(num * 100) / 100).toFixed(2)
        }
    
        order.itemsPrice = addDecimals(
          order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            // console.log(clientId)
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async=true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        } else if(!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, order])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    return (
        <div className='my-5'>  
            {loading ? ( 
                <Loader /> 
            ) : error ? ( 
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {/* <h3>Order {order._id}</h3> */}
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h4 style={{ marginBottom: '20px' }}>SHIPPING</h4>
                                <p>
                                    <strong>Name : </strong>
                                    {order.user.name}
                                </p>
                                <p>
                                    <strong>Email : </strong>
                                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                </p>
                                <p>
                                    <strong>Address : </strong>
                                    {order.shippingAddress.address}, {' '}  
                                    {order.shippingAddress.city}{' '} 
                                    {order.shippingAddress.postalCode}, {' '}  
                                    {order.shippingAddress.country}{' '}
                                </p>
                                {order.isDelivered ? (
                                    <Message variant='success'>Delivered</Message> 
                                ) : (
                                    <Message variant='warning'>Not Delivered</Message>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h4>Payment Method</h4>
                                <p>
                                    <strong>Method : </strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                    <Message variant='success'>Paid on {order.paidAt}</Message> 
                                ) : (
                                    <Message variant='warning'>Paid off</Message>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h4>Order Items</h4>
                                {order.orderItems.length === 0 ? (
                                    <Message>Your Cart is Empty</Message> 
                                ) : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.name} style={{ width: '70px' }} rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x {item.price} = <span style={{ fontWeight: 'bold' }}>${(item.qty * item.price).toFixed(2)}</span>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h4>ORDER SUMMARY</h4>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col><span style={{ fontWeight:'bold' }}>TOTAL</span></Col>
                                        <Col><span style={{ fontWeight:'bold' }}>${order.totalPrice}</span></Col>
                                    </Row>
                                </ListGroup.Item>
                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader />}
                                        {!sdkReady ? (
                                            <Loader />
                                        ) : (
                                            <PayPalButton
                                                amount={order.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            />
                                        )}  
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    )
}

export default OrderScreen

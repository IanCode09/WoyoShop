import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    if(!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod({ paymentMethod }))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <Form onSubmit={submitHandler}>
                <h4>Payment Method</h4>
                <Form.Group>
                    <Form.Label as='legend' style= {{ fontSize: '15px', marginBottom: '30px' }}>Select Method</Form.Label>
                        <Col>
                            <Form.Check 
                                type='radio'
                                label='PayPal or CreditCard'
                                id='PayPal'
                                name='paymentMethod'
                                value='PayPal'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            {/* <Form.Check 
                                type='radio'
                                label='BCA'
                                id='BCA'
                                name='paymentMethod'
                                value='BCA'
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            /> */}
                        </Col>
                </Form.Group>
                <Button type='submit' varianty='primary' style={{ marginTop: '10px' }}>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen

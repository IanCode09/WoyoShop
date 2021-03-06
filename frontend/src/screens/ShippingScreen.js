import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({ history }) => {
    // const cart = useSelector((state) => state.cart)
    // const { shippingAddress } = cart

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <Form onSubmit={submitHandler}>
                <h4>Shipping</h4>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Address" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter City" 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control 
                        type="nummber" 
                        placeholder="Enter Postal Code" 
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Country" 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' varianty='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen

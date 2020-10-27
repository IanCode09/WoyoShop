import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

// @desc      Create New Order
// @router    POST /api/orders
// @access    Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No Order Items')
        return 
    } else {
        const order = new Order ({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
    }

    const createOrder = await order.save()

    res.statatus(201).json(createOrder)
})

export { addOrderItems }
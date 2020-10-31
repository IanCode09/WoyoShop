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
        const createOrder = await order.save()
        res.status(201).json(createOrder)
    }    
})


// @desc      Get Order by ID
// @router    GET /api/orders/:id
// @access    Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})



// @desc      Update Order to Paid
// @router    GET /api/orders/:id/pay
// @access    Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body._id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updateOrder = await order.save()
        res.json(updateOrder)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})


// @desc      Update Order to Delivered
// @router    GET /api/orders/:id/delivered
// @access    Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        
        const updateOrder = await order.save()
        res.json(updateOrder)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})


// @desc      Get logged in user orders
// @router    GET /api/orders/myorders
// @access    Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})


// @desc      Get All Orders
// @router    GET /api/orders
// @access    Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})

export { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders }
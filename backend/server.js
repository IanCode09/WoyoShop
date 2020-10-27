import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

import connectDB from './config/db.js'
import { notFound, errorHandler } from  './middleware/errorMiddleware.js'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Api Is Running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log('Server running on port 8000'.yellow.bold))
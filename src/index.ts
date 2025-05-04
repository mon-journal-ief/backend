import express from 'express'
import cors from 'cors'
import programRoutes from './routes/programRoutes'
import authRoutes from './routes/authRoutes'

const app = express()
app.use(express.json())
app.use(cors())

// Routes
app.get('/', async (req, res) => {
    res.json({ message: 'Welcome to the Program API!' })
})

app.use('/programs', programRoutes)
app.use('/auth', authRoutes)

app.listen(4000, () => {
    console.log('Express server is running on port 4000')
})

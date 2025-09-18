import express from 'express'
import cors from 'cors'
import { addMorganMiddlewares } from './config/morgan'
import programRoutes from './routes/programRoutes'
import programTemplateRoutes from './routes/programTemplateRoutes'
import programElementRoutes from './routes/programElementRoutes'
import authRoutes from './routes/authRoutes'
import childRoutes from './routes/childRoutes'
import journalEntryRoutes from './routes/journalEntryRoutes'
import exportRoutes from './routes/exportRoutes'
import contactRoutes from './routes/contactRoutes'
import userRoutes from './routes/userRoutes'

const app = express()

addMorganMiddlewares(app)

app.use(express.json())
app.use(cors())

// Routes
app.get('/', async (req, res) => {
    res.json({ message: 'Welcome to the Program API!' })
})

app.use('/program/element', programElementRoutes)
app.use('/program/template', programTemplateRoutes)
app.use('/program', programRoutes)
app.use('/auth', authRoutes)
app.use('/children', childRoutes)
app.use('/journal-entries', journalEntryRoutes)
app.use('/export', exportRoutes)
app.use('/contact', contactRoutes)
app.use('/user', userRoutes)


app.listen(4000, () => {
    console.log('Express server is running on port 4000')
})

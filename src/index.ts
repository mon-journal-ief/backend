import express from 'express'
import cors from 'cors'
import path from 'path'
import programRoutes from './routes/programRoutes'
import programTemplateRoutes from './routes/programTemplateRoutes'
import programElementRoutes from './routes/programElementRoutes'
import authRoutes from './routes/authRoutes'
import childRoutes from './routes/childRoutes'
import journalEntryRoutes from './routes/journalEntryRoutes'
import exportRoutes from './routes/exportRoutes'
import uploadRoutes from './routes/uploadRoutes'

const app = express()
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
app.use('/uploads', uploadRoutes)

// Serve static files for uploaded images with security headers
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'), {
  maxAge: '1d', // Cache for 1 day
  setHeaders: (res, filePath) => {
    // Security headers for static files
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('Cache-Control', 'public, max-age=86400') // 1 day cache
    
    // Only serve image files
    const ext = path.extname(filePath).toLowerCase()
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      res.status(403).end()
      return
    }
  }
}))

app.listen(4000, () => {
    console.log('Express server is running on port 4000')
})

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

// 🏚️ Default Route
// This is the Default Route of the API
app.get('/', async (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the Program API!' })
})

// Get all programs
// This is the Route for getting all programs via GET Method
app.get('/programs', async (req: Request, res: Response) => {
    const programs = await prisma.program.findMany()
    res.json(programs)
})

// Get single program
// This is the Route for getting a single program via GET Method
app.get('/programs/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const program = await prisma.program.findUnique({
        where: {
            id: id
        }
    })
    res.json(program)
})

// Create  new program
// This is the Route for creating a new program via POST Method
app.post('/programs', async (req: Request, res: Response) => {
    const { name, description } = req.body
    const program = await prisma.program.create({ 
        data: {
            name,
            grade: "CP"
        }
    })
    res.json(program)
})

// Delete program with id
// This is the Route for deleting a program via DELETE Method
app.delete('/programs/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const program = await prisma.program.delete({
        where: {
            id: id
        }
    })
    res.json(program)
})

app.listen(4000, () => {
    console.log('Express server is running on port 4000')
})

import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import { router_solutions } from './src/routes/solutions.js'
import { corsMiddleware } from './src/middlewares/cors.js'
import { routerCategory } from './src/routes/categories.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(corsMiddleware())

app.use('/api', router_solutions)
app.use('/api', routerCategory)

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
}

export default app

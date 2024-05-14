import express from 'express'
import { config } from 'dotenv'
import { mongoConnection } from './data/data.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
config({ path: './config/.env' })

mongoConnection()
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api/user', userRouter)

app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
    console.log(`server is working on port ${process.env.PORT}`)
})


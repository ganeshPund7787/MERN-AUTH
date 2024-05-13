import express from 'express'
import { config } from 'dotenv'
import { mongoConnection } from './data/data.js'

config({ path: './config/.env' })

mongoConnection()
const app = express()
app.listen(process.env.PORT, () => {
    console.log(`server is working on port ${process.env.PORT}`)
})


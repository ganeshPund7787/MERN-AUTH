import express from 'express'
import { config } from 'dotenv'
config({ path: './config/.env' })
const app = express()
app.listen(process.env.PORT, () => {
    console.log(`server is working on port ${process.env.PORT}`)
})


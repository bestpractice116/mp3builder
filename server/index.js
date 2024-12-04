import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import router from './src/routes/core.routes.js'

dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
}))

app.use(express.json())
app.use(fileUpload())
app.use(router)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})

import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/user.route.js"
import explorerRoutes from "./routes/explorer.route.js"
import authRoutes from "./routes/auth.route.js"
import connectMongoDB from "./db/conn.js"

dotenv.config()

const app = express()

app.use(cors())

app.get("/",(req,res) => {
    res.send('ok')
})
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/explore',explorerRoutes)


app.listen(5000,() => {
    console.log('Server running')
    connectMongoDB()
})
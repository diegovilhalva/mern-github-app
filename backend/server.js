import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import passport from "passport"
import session from "express-session"
import "./passport/github.auth.js"
import userRoutes from "./routes/user.route.js"
import explorerRoutes from "./routes/explorer.route.js"
import authRoutes from "./routes/auth.route.js"
import connectMongoDB from "./db/conn.js"
import path from "path"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors())


app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/explore',explorerRoutes)

app.use(express.static(path.join(__dirname,'/frontend/dist')))

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'frontend','dist','index.html'))
})

app.listen(5000,() => {
    console.log(`Server running on ${PORT}`)
    connectMongoDB()
})

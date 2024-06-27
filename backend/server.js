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

dotenv.config()

const app = express()
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

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
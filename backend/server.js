import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectDB from "./db/db.js"
import userRoutes from "./routes/user.route.js"
import companyRoutes from "./routes/company.route.js"
import jobRoutes from "./routes/jobs.route.js"
import applicationRoutes from "./routes/application.route.js"

const app = express()
dotenv.config()

const corsOptions = {
    origin:['http://localhost:5173', 'https://code-hire-iota.vercel.app/'],
    credentials:true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

//default routes
app.get("/api", (req, res) => {
    res.send("Welcome to the Code-Hire Backend API! 🚀");
  });
  

app.use("/users", userRoutes)
app.use("/companies", companyRoutes)
app.use("/jobs", jobRoutes)
app.use("/applications", applicationRoutes)

connectDB()
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server is running on :http://localhost:4000`)
})
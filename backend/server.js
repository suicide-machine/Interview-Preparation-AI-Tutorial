require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const connectDB = require("./config/db")

const authRoutes = require("./routes/auth.route")
const sessionRoutes = require("./routes/session.route")
const questionRoutes = require("./routes/question.route")
const { protect } = require("./middlewares/auth.middleware")
const {
  generateInterviewQuestions,
  generateConceptExplanation,
} = require("./controllers/ai.controller")

const app = express()

// Middleware to handle CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

connectDB()

app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/sessions", sessionRoutes)
app.use("/api/questions", questionRoutes)

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions)
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation)

// Server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hashSync(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    })

    // Return user data with JWT
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

const getUserProfile = async (req, res) => {}

module.exports = { registerUser, loginUser, getUserProfile }

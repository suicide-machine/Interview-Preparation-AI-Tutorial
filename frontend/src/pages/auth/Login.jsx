import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../../components/inputs/Input"
import { validateEmail } from "../../utils/helper"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError("")

    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      })

      const { token } = response.data

      if (token) {
        localStorage.setItem("token", token)
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
  }

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h3>
      <p className="text-gray-600 mb-6">Please enter your details to log in</p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="example@gmail.com"
          type="text"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
        >
          LOGIN
        </button>

        <p className="text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <button
            className="text-blue-600 ml-1 hover:text-blue-800 font-medium"
            onClick={() => {
              setCurrentPage("signup")
            }}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login

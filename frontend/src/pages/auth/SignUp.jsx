import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../../components/inputs/Input"
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector"
import { validateEmail } from "../../utils/helper"

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()

    let profileImageUrl = ""

    if (!fullName) {
      setError("Please enter full name")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError("")

    // SignUp API Call
    try {
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
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        Create an Account
      </h3>
      <p className="text-gray-600 mb-6">
        Join us today by entering your details below
      </p>

      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="Enter your full name"
          type="text"
        />

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
          SIGN UP
        </button>

        <p className="text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <button
            className="text-blue-600 ml-1 hover:text-blue-800 font-medium"
            onClick={() => {
              setCurrentPage("login")
            }}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  )
}

export default SignUp

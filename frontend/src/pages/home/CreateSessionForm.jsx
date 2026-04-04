import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../../components/inputs/Input"
import { FiLoader } from "react-icons/fi"

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }))
  }

  const handleCreateSession = async (e) => {
    e.preventDefault()

    const { role, experience, topicsToFocus } = formData

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all required fields")
      return
    }

    setError("")
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl my-8">
      <h3 className="text-2xl md:text-3xl font-bold  mb-4 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Start a New Interview Journey
      </h3>

      <p className="text-gray-600 mb-8 text-base md:text-lg">
        Fill out a few quick details and unlock your personalized set of
        interview questions!
      </p>

      <form onSubmit={handleCreateSession} className="space-y-6">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label={"Target Role"}
          placeholder={"(e.g., Frontend Developer, UI/UX Designer, etc.)"}
          type={"text"}
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label={"Years of Experience"}
          placeholder={"(e.g., 1 year, 3 years, 5+ years)"}
          type={"number"}
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label={"Topics to Focus On"}
          placeholder={"(Comma-separated e.g., React, MongoDB, Node.js)"}
          type={"text"}
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label={"Description (optional)"}
          placeholder={"(Any specific goals or notes for this session)"}
          type={"text"}
        />

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-base md:text-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <FiLoader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              Creating Session...
            </span>
          ) : (
            "Create Session"
          )}
        </button>
      </form>
    </div>
  )
}

export default CreateSessionForm

import React, { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="mb-4">
      {label && <label className="block mb-1 text-gray-700">{label}</label>}

      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-xl"
          value={value}
          onChange={onChange}
          style={
            type === "password" && !showPassword
              ? {
                  fontFamily: "monospace",
                  fontSize: "1.25rem",
                  letterSpacing: "0.1em",
                }
              : {}
          }
        />

        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaRegEye size={20} />
            ) : (
              <FaRegEyeSlash size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default Input

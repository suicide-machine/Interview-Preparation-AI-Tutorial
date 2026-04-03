import React, { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { useNavigate } from "react-router-dom"

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    clearUser()
    navigate("/")
  }

  return (
    user && (
      <div className="flex items-center">
        <img
          src={user.profileImageUrl}
          alt="Profile pic"
          className="w-12 h-12 bg-gray-300 rounded-full mr3"
        />

        <div className="ml-2">
          <div className="text-xl text-black font-bold leading-3">
            {user.name || ""}
          </div>

          <button
            className="text-amber-600 text-lg font-semibold cursor-pointer hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  )
}

export default ProfileInfoCard

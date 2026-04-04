import React from "react"
import { Link } from "react-router-dom"
import ProfileInfoCard from "../cards/ProfileInfoCard"

const Navbar = () => {
  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to={"/dashboard"}>
          <h2 className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
            Interview Preparation AI
          </h2>
        </Link>

        <ProfileInfoCard />
      </div>
    </div>
  )
}

export default Navbar

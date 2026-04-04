import React, { useEffect, useState } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { data, useNavigate } from "react-router-dom"
import { LuPlus } from "react-icons/lu"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"

const Dashboard = () => {
  const navigate = useNavigate()

  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [sessions, setSessions] = useState([])
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  })

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL)
      setSessions(response.data)
    } catch (error) {
      console.log("Error fetching session data: ", error)
    }
  }

  const deleteSession = async () => {}

  useEffect(() => {
    fetchAllSessions()
  }, [])

  console.log(sessions)

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8"></div>

        <button
          className="fixed bottom-8 right-8 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 group"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Add New
        </button>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard

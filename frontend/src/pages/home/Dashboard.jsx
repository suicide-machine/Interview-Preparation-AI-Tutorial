import React, { useEffect, useState } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { data, useNavigate } from "react-router-dom"
import { LuPlus } from "react-icons/lu"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"
import SummaryCard from "../../components/cards/SummaryCard"
import { CARD_BG } from "../../utils/data"
import moment from "moment"
import Modal from "../../components/Modal"
import CreateSessionForm from "./CreateSessionForm"
import toast from "react-hot-toast"
import DeleteAlertContent from "../../components/DeleteAlertContent"

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

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id))

      toast.success("Session Deleted Successfully")

      setOpenDeleteAlert({
        open: false,
        data: null,
      })

      fetchAllSessions()
    } catch (error) {
      console.log("Error deleting session data: ", error)
    }
  }

  useEffect(() => {
    fetchAllSessions()
  }, [])

  return (
    <DashboardLayout>
      <div className="p-8 bg-linear-to-br from-gray-50 to-white min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {sessions?.map((data, index) => (
            <SummaryCard
              key={data._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || ""}
              experience={data?.experience || "-"}
              questions={data?.questions || []}
              description={data?.description || ""}
              lastUpdated={
                data?.updatedAt
                  ? moment(data.updatedAt).format("Do MMM YYYY")
                  : ""
              }
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>

        <button
          className="fixed bottom-8 right-8 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 group"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Add New
        </button>
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false)
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm />
        </div>
      </Modal>

      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleteAlert({ open: false, data: null })
        }}
        title={"Delete Alert"}
      >
        <div className="w-[30vw]">
          <DeleteAlertContent
            content="Are you sure you want to delete this session detail?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default Dashboard

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import RoleInfoHeader from "../../components/RoleInfoHeader"
import moment from "moment"

const InterviewPrep = () => {
  const { sessionId } = useParams()

  const [sessionData, setSessionData] = useState(null)
  const [errorMsg, setErrorMsg] = useState("")

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false)
  const [explanation, setExplanation] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const [isUpdateLoader, setIsUpdateLoader] = useState(false)

  const fetchSessionDetailsById = async () => {}

  const generateConceptExplanation = async (question) => {}

  const toggleQuestionPinStatus = async (questionId) => {}

  const uploadMoreQuestions = async () => {}

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById()
    }

    return () => {}
  }, [])

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />
    </DashboardLayout>
  )
}

export default InterviewPrep

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import RoleInfoHeader from "../../components/RoleInfoHeader"
import moment from "moment"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"
import { AnimatePresence, motion } from "framer-motion"
import QuestionCard from "../../components/cards/QuestionCard"
import Drawer from "../../components/Drawer"
import { LuCircleAlert, LuListCollapse } from "react-icons/lu"
import AIResponsePreview from "../../components/AIResponsePreview"
import SkeletonLoader from "../../components/loader/SkeletonLoader"
import toast from "react-hot-toast"
import { FaSpinner } from "react-icons/fa"

const InterviewPrep = () => {
  const { sessionId } = useParams()

  const [sessionData, setSessionData] = useState(null)
  const [errorMsg, setErrorMsg] = useState("")

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false)
  const [explanation, setExplanation] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const [isUpdateLoader, setIsUpdateLoader] = useState(false)

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId),
      )

      if (response.data && response.data.session) {
        setSessionData(response.data.session)
      }
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("")
      setExplanation(null)
      setIsLoading(true)
      setOpenLearnMoreDrawer(true)

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question },
      )

      if (response.data) {
        const explanationData = Array.isArray(response.data)
          ? response.data[0]
          : response.data

        setExplanation(explanationData)
      }
    } catch (error) {
      setExplanation(null)
      setErrorMsg("Failed to generate explanation, Try again later")
      console.log("Error: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId),
      )

      if (response.data && response.data.question) {
        fetchSessionDetailsById()
      }
    } catch (error) {
      console.log("error: ", error)
    }
  }

  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true)

      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTION,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        },
      )

      const generatedQuestions = aiResponse.data

      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions,
        },
      )

      if (response.data) {
        toast.success("Added more Q&A!")
        fetchSessionDetailsById()
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message)
      } else {
        setErrorMsg("Something went wrong. Please try again.")
      }
    } finally {
      setIsUpdateLoader(false)
    }
  }

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

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        <h2 className="text-xl font-semibold text-blue-900">Interview Q&A</h2>

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div
            className={`col-span-12 ${openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"}`}
          >
            <div className="flex flex-col gap-4">
              <AnimatePresence>
                {sessionData?.questions?.map((data, index) => {
                  return (
                    <motion.div
                      key={data._id || index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.4,
                        type: "spring",
                        stiffness: 100,
                        delay: index * 0.1,
                        damping: 15,
                      }}
                      layout
                      layoutId={`question-${data._id || index}`}
                    >
                      <>
                        <QuestionCard
                          question={data?.question}
                          answer={data?.answer}
                          onLearnMore={() =>
                            generateConceptExplanation(data.question)
                          }
                          isPinned={data?.isPinned}
                          onTogglePin={() => toggleQuestionPinStatus(data._id)}
                        />

                        {!isLoading &&
                          sessionData?.questions?.length === index + 1 && (
                            <div className="flex justify-center mt-8">
                              <button
                                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                disabled={isLoading || isUpdateLoader}
                                onClick={uploadMoreQuestions}
                              >
                                {isUpdateLoader ? (
                                  <>
                                    <FaSpinner className="animate-spin" />
                                    <span>Loading...</span>
                                  </>
                                ) : (
                                  <>
                                    <LuListCollapse />
                                    <span>Load More</span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                      </>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div>
          <Drawer
            isOpen={openLearnMoreDrawer}
            onClose={() => setOpenLearnMoreDrawer(false)}
            title={(!isLoading && explanation?.title) || "Concept Explanation"}
          >
            {errorMsg && (
              <p className="flex gap-2 text-lg text-amber-600 font-medium">
                <LuCircleAlert className="mt-1" /> {errorMsg}
              </p>
            )}

            {isLoading && <SkeletonLoader />}

            {!isLoading && explanation && (
              <AIResponsePreview content={explanation?.explanation} />
            )}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default InterviewPrep

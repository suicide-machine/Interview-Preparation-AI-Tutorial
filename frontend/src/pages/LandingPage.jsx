import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  LuBrain,
  LuChevronRight,
  LuSparkles,
  LuTarget,
  LuTrendingUp,
  LuUsers,
  LuZap,
} from "react-icons/lu"
import { APP_FEATURE } from "../utils/data"
import Modal from "../components/Modal"
import Login from "./auth/Login"
import SignUp from "./auth/SignUp"
import { UserContext } from "../context/UserContext"
import ProfileInfoCard from "../components/cards/ProfileInfoCard"

const LandingPage = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const [openAuthModal, setOpenAuthModal] = useState(false)
  const [currentPage, setCurrentPage] = useState("login")

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true)
    } else {
      navigate("/dashboard")
    }
  }

  const featureIcons = [LuZap, LuTarget, LuBrain, LuTrendingUp, LuUsers]

  return (
    <>
      <div className="w-full min-h-screen bg-linear-to-b from-[#FFFCEF] via-white to-amber-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-linear-to-br from-amber-200/30 to-orange-200/20 rounded-full blur-3xl" />

          <div className="absolute top-1/3 -right-20 w-60 h-60 bg-linear-to-tr from-yellow-200/20 to-amber-100/30 rounded-full blur-3xl" />

          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-linear-to-r from-amber-100/40 to-yellow-100/30 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 pt-8 pb-48 relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-br from-[#FF9324] to-[#FCD760] rounded-xl flex items-center justify-center">
                <LuBrain className="w-6 h-6 text-white" />
              </div>

              <div className="text-2xl font-bold bg-linear-to-r from-amber-500 to-amber-900 bg-clip-text text-transparent">
                Interview Preparation AI
              </div>
            </div>

            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="group bg-linear-to-r from-[#FF9324] via-[#F9A83A] to-[#FCD760] text-sm font-semibold text-white px-8 py-3 rounded-full hover:shadow-lg hover:shadow-amber-200/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] relative overflow-hidden"
                onClick={() => setOpenAuthModal(true)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <LuChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>

                <div className="absolute inset-0 bg-linear-to-r from-amber-600 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            )}
          </header>

          {/* Hero Content */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-8 mb-32">
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-3 text-sm text-amber-700 font-semibold bg-linear-to-r from-amber-50 to-yellow-50 px-4 py-2.5 rounded-full border border-amber-200 mb-8 shadow-sm">
                <div className="w-8 h-8 bg-linear-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <LuSparkles className="w-4 h-4 text-white" />
                </div>

                <span className="bg-linear-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                  AI-Powered • Personalized • Effective
                </span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Ace Your Next
                <span className="block">
                  <span className="relative">
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF9324] via-[#F9A83A] to-[#FCD760]">
                      Interview
                    </span>

                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-amber-400/50 to-yellow-300/50 rounded-full" />
                  </span>
                </span>
              </h1>

              <p className="text-xl text-gray-700 mb-10 leading-relaxed max-w-2xl">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and build the confidence to excel in
                your next interview with structured, AI-guided preparation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <button className="group bg-linear-to-r from-gray-900 to-black text-base font-semibold text-white px-10 py-4 rounded-xl hover:shadow-2xl hover:shadow-gray-900/30 transition-all duration-300 cursor-pointer hover:scale-[1.02] relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-3">
                    Start Free Trial
                    <LuChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>

                  <div className="absolute inset-0 bg-linear-to-r from-amber-700 to-amber-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <div className="flex items-center gap-3 text-gray-600">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        className="w-10 h-10 bg-linear-to-br from-amber-100 to-yellow-100 rounded-full border-2 border-white flex items-center justify-center text-sm font-bold text-amber-700"
                        key={i}
                      >
                        {i}+
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      5,000+ professionals
                    </p>

                    <p className="text-sm">already leveled up their skills</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-linear-to-r from-amber-400/20 via-yellow-300/10 to-amber-400/20 rounded-3xl blur-xl" />

                <img
                  src="https://images.pexels.com/photos/5474295/pexels-photo-5474295.jpeg"
                  alt="Hero Image"
                  className="relative rounded-2xl shadow-2xl w-full h-auto transform hover:scale-[1.01] transition-transform duration-500"
                />

                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-linear-to-br from-green-500  to-emerald-400 rounded-xl flex items-center justify-center">
                      <LuSparkles className="w-7 h-7 text-white" />
                    </div>

                    <div>
                      <p className="text-2xl font-bold text-gray-900">94%</p>
                      <p className="text-sm text-gray-600">Success rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative pb-40">
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-amber-50/50 to-white" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Everything you need to{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-amber-800">
                  shine brighter
                </span>
              </h2>

              <p className="text-xl text-gray-600">
                Our AI-powered platform adapts to your learning style, career
                goals, and interview needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {APP_FEATURE.slice(0, 3).map((feature, index) => {
                const Icon = featureIcons[index]

                return (
                  <div
                    className="group bg-linear-to-br from-white to-amber-50/50 p-8 rounded-3xl border border-amber-100/50 hover:border-amber-200 shadow-lg hover:shadow-2xl hover:shadow-amber-100/30 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                    key={feature.id}
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-16 h-16 bg-linear-to-br from-amber-400/10 to-amber-600/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-amber-600" />
                      </div>

                      <span className="text-4xl font-bold text-amber-100 group-hover:text-amber-200 transition-colors">
                        {feature.id}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-amber-700 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="mt-6 pt-6 border-t border-amber-100/50">
                      <button className="flex items-center gap-2 text-amber-600 font-semibold group-hover:text-amber-700 transition-colors">
                        Learn More{" "}
                        <LuChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />{" "}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {APP_FEATURE.slice(3).map((feature, index) => {
                const Icon = featureIcons[index + 3]

                return (
                  <div
                    key={feature.id}
                    className="group bg-linear-to-br from-white to-yellow-50/50 p-8 rounded-3xl border border-yellow-100/50 hover:border-yellow-200 shadow-lg hover:shadow-xl hover:shadow-yellow-100/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 bg-linear-to-br from-yellow-400/10 to-yellow-600/10 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-amber-600" />
                      </div>

                      <span className="text-3xl font-bold text-amber-100 group-hover:text-amber-200 transition-colors">
                        {feature.id}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-amber-700 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600">{feature.description}</p>

                    <div className="mt-6 pt-6 border-t border-amber-100/50">
                      <button className="flex items-center gap-2 text-amber-600 font-semibold group-hover:text-amber-700 transition-colors">
                        Learn More{" "}
                        <LuChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />{" "}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="container mx-auto px-4 pt-20 pb-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-linear-to-r from-amber-50/80 to-yellow-50/80 px-8 py-4 rounded-2xl border border-amber-100/80 shadow-md mb-8">
              <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center animate-pulse">
                <LuSparkles className="w-6 h-6 text-white" />
              </div>

              <div className="text-left">
                <p className="font-bold text-gray-900">
                  Ready to transform your interview skills?
                </p>

                <p className="text-sm text-gray-600">
                  Join thousands of successful candidates
                </p>
              </div>

              <button className="ml-4 bg-linear-to-r from-amber-600 to-amber-800 text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg hover:shadow-amber-200 transition-all">
                Start Free Trial
              </button>
            </div>

            <div className="text-gray-500 text-sm mt-12 pt-8 border-t border-gray-200/50">
              <p className="flex items-center justify-center gap-2">
                Made with <span className="text-red-500 animate-pulse">❤️</span>
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                Happy Coding
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                Empower your journey
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false)
          setCurrentPage("login")
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}

          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  )
}

export default LandingPage

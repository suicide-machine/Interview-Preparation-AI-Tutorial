import React from "react"
import { HiOutlineCalendar, HiOutlineTrash } from "react-icons/hi"
import { BsQuestionCircle } from "react-icons/bs"

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  const questionCount = Array.isArray(questions) ? questions.length : 0
  const previousQuestions = Array.isArray(questions)
    ? questions.slice(0, 2).map((q) => q.question)
    : []

  return (
    <div
      className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
      onClick={onSelect}
    >
      <div
        className="rounded-2xl p-6 overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        style={{ background: colors.bgcolor }}
      >
        <div className="relative">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/40 backdrop-blur-md flex items-center justify-center shadow-md border border-white/50">
              <span className="text-xl font-bold bg-linear-to-br from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {role?.charAt(0) || "Q"}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 truncate pr-8 mb-1">
                    {role || "Untitled Role"}
                  </h2>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-white/40 backdrop-blur-sm rounded-full text-sm text-gray-700 border border-white/50">
                      Experience: {experience} years
                    </span>
                  </div>
                </div>

                <button
                  className="p-2 rounded-xl bg-white/40 hover:bg-white/60 backdrop-blur-md text-gray-600 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100 border border-white/50 shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete()
                  }}
                >
                  <HiOutlineTrash className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-gray-700/90 line-clamp-1 mt-2 font-medium">
                {topicsToFocus || "No topics specified"}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/40 backdrop-blur-md rounded-xl border border-white/50 shadow-sm">
              <BsQuestionCircle className="w-4 h-4 text-indigo-600" />

              <span className="font-semibold text-gray-800">
                {questionCount}
              </span>

              <span className="text-xs text-gray-600">questions</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/40 backdrop-blur-md rounded-xl border border-white/50 shadow-sm">
              <HiOutlineCalendar className="w-4 h-4 text-indigo-600" />

              <span className="text-xs text-gray-600">
                Last Updated: {lastUpdated || "N/A"}
              </span>
            </div>
          </div>

          {previousQuestions.length > 0 && (
            <div className="mt-5 p-4 bg-white/30 backdrop-blur-md rounded-xl border border-white/50 shadow-sm">
              <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-indigo-600 rounded-full"></span>
                Featured Questions
              </p>

              <div className="space-y-2">
                {previousQuestions.map((question, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-500 text-xs font-bold">
                      {idx + 1}
                    </span>

                    <p className="text-xs text-gray-700/90 line-clamp-1 flex-1 font-medium">
                      {question}
                    </p>
                  </div>
                ))}
              </div>

              {questionCount > 2 && (
                <button className="mt-3 text-xs font-semibold text-indigo-700 hover:text-indigo-800 transition-colors flex items-center gap-1 group">
                  View all {questionCount} questions
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              )}
            </div>
          )}

          {description && (
            <div className="mt-4 p-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
              <p className="text-xs text-gray-700 line-clamp-2 italic">
                "{description}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SummaryCard

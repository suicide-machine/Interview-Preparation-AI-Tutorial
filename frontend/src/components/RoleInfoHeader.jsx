import React from "react"

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="relative bg-white border-b border-gray-100">
      <div className="conatiner mx-auto px-10 ">
        <div className="h-60 flex flex-col justify-center relative z-10 ">
          <div className="flex items-start">
            <div className="grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                    {role}
                  </h2>

                  <p className="text-base md:text-lg font-medium text-gray-600 mt-2 max-w-2xl">
                    {topicsToFocus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <div className="text-xs font-semibold text-white bg-linear-to-r from-gray-900 to-gray-700 px-4 py-1.5 rounded-full shadow-sm">
              Experience: {experience} {experience === 1 ? "Year" : "Years"}
            </div>

            <div className="text-xs font-semibold text-white bg-linear-to-r from-gray-900 to-gray-700 px-4 py-1.5 rounded-full shadow-sm">
              {questions} Q&A
            </div>

            <div className="text-xs font-semibold text-white bg-linear-to-r from-gray-900 to-gray-700 px-4 py-1.5 rounded-full shadow-sm">
              Last Updated: {lastUpdated}
            </div>
          </div>

          {description && (
            <p className="text-sm text-gray-600 mt-4 max-w-3xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default RoleInfoHeader

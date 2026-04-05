import React, { useEffect, useRef, useState } from "react"
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu"
import AIResponsePreview from "../AIResponsePreview"

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [height, setHeight] = useState(0)

  const contentRef = useRef(null)

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight
      setHeight(contentHeight + 10)
    } else {
      setHeight(0)
    }
  }, [isExpanded])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-gray-200">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-base shadow-lg shadow-indigo-200">
                Q
              </span>
            </div>

            <h3
              className="flex-1 text-gray-900 font-semibold text-lg cursor-pointer hover:text-indigo-600 transition-colors duration-200 line-clamp-2 leading-relaxed"
              onClick={toggleExpand}
            >
              {question}
            </h3>
          </div>

          <div className="flex items-center justify-between mt-6 pl-14">
            <div
              className={`flex items-center gap-3 transition-all duration-300 ${isExpanded ? "flex opacity-100" : "md:hidden group-hover:flex group-hover:opacity-100 opacity-0"}`}
            >
              <button
                className="p-2.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 active:scale-95"
                onClick={onTogglePin}
                title={isPinned ? "Unpin question" : "Pin question"}
              >
                {isPinned ? (
                  <LuPinOff className="w-4 h-4" />
                ) : (
                  <LuPin className="w-4 h-4" />
                )}
              </button>

              <button
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-indigo-50 via-purple-50 to-pink-50 hover:from-indigo-100 hover:via-purple-100 hover:to-pink-100 text-indigo-700 rounded-xl text-sm font-medium transition-all duration-200 border border-indigo-200 hover:border-indigo-300 shadow-sm hover:shadow active:scale-95"
                onClick={() => {
                  setIsExpanded(true)
                  onLearnMore()
                }}
              >
                <LuSparkles className="w-4 h-4" />
                <span>Learn More</span>
              </button>
            </div>

            <button
              className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 active:scale-95"
              onClick={toggleExpand}
              title={isExpanded ? "Show Less" : "Show More"}
            >
              <LuChevronDown
                size={22}
                className={`transform transition-all duration-500 ease-in ${isExpanded ? "rotate-180 text-indigo-600" : ""}`}
              />
            </button>
          </div>
        </div>

        <div
          className="overflow-hidden transition-all duration-500 ease-in-out bg-linear-to-br from-gray-50 to-white"
          style={{ maxHeight: `${height}px` }}
        >
          <div className="p-6 pt-2 border-t border-gray-100" ref={contentRef}>
            <AIResponsePreview content={answer} />
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionCard

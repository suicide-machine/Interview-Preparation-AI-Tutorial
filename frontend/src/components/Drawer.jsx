import React from "react"
import { LuX } from "react-icons/lu"

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed top-16 right-0 z-50 h-[calc(100dvh-64px)] p-4 overflow-y-auto transition-transform bg-white w-full md:w-[40vw] shadow-2xl shadow-cyan-800/10 border-r border-l-gray-800 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      tabIndex={"-1"}
      aria-labelledby="drawer-right-label"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5
          id="drawer-right-label"
          className="flex items-center text-lg font-semibold text-black"
        >
          {title}
        </h5>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg w-8 h-8 inline-flex items-center justify-center"
        >
          <LuX className="text-lg" />
        </button>
      </div>

      <div className="text-lg mx-3 mb-6 text-black">{children}</div>
    </div>
  )
}

export default Drawer

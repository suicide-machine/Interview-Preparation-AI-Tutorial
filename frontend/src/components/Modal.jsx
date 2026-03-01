import React from "react"
import { IoClose } from "react-icons/io5"

const Modal = ({ children, isOpen, onClose, hideHeader, title }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300">
      {/* Blur Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-lg bg-white/30 backdrop-filter"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white/95 backdrop-blur-xl backdrop-filter rounded-3xl shadow-2xl border border-white/20 transform transition-all duration-300 scale-100">
        <div className="absolute inset-0 bg-linear-to-r from-white/40 to-transparent rounded-3xl" />

        {/* Modal Header */}
        {!hideHeader && (
          <div className="relative flex items-center justify-between p-6 border-b border-gray-200/50">
            <h3 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </h3>
          </div>
        )}

        {/* Close Button */}
        <button
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-red-400 transition-all duration-200 hover:scale-110 hover:shadow-xl z-10 border-gray-200/50"
          type="button"
          onClick={onClose}
          aria-label="Close Modal"
        >
          <IoClose className="w-5 h-5" />
        </button>

        <div className="relative overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          <div className="text-gray-800">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal

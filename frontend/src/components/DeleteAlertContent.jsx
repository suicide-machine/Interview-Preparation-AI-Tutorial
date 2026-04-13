import React from "react"

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-4">
      <p className="text-gray-600 mb-4">{content}</p>

      <div className="flex justify-end">
        <button
          type="button"
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteAlertContent

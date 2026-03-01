import React, { useRef, useState } from "react"
import { LuTrash, LuUpload, LuUser } from "react-icons/lu"

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      setImage(file)

      const preview = URL.createObjectURL(file)

      if (setPreview) {
        setPreview(preview)
      }

      setPreviewUrl(preview)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setPreviewUrl(null)

    if (setPreview) {
      setPreview(null)
    }
  }

  const onChooseFile = () => {
    inputRef.current.click()
  }

  return (
    <div className="flex justify-center">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="relative">
          <LuUser className="w-32 h-32 text-gray-400 border-2 border-dashed border-gray-300 rounded-full p-6" />

          <button
            type="button"
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
            onClick={onChooseFile}
          >
            <LuUpload size={20} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview || previewUrl}
            alt="Profile Photo"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />

          <button
            type="button"
            className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
            onClick={handleRemoveImage}
          >
            <LuTrash size={20} />
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfilePhotoSelector

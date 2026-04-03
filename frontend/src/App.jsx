import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/home/Dashboard"
import InterviewPrep from "./pages/interviewPreparation/InterviewPrep"
import UserProvider from "./context/UserContext"

import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <UserProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/interview-prep/:sessionId"
              element={<InterviewPrep />}
            />
          </Routes>
        </BrowserRouter>

        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "14px",
            },
          }}
        />
      </div>
    </UserProvider>
  )
}

export default App

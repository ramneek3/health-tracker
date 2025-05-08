import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { FitnessProvider } from "./contexts/FitnessContext"
import Dashboard from "./pages/Dashboard"
import WorkoutTracker from "./pages/WorkoutTracker"
import NutritionTracker from "./pages/NutritionTracker"
import Profile from "./pages/Profile"
import Navbar from "./components/Navbar"
import "./index.css"

function App() {
  return (
    <Router>
      <FitnessProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/workouts" element={<WorkoutTracker />} />
              <Route path="/nutrition" element={<NutritionTracker />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </FitnessProvider>
    </Router>
  )
}

export default App

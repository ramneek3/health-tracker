"use client"

import { useState } from "react"
import { useFitness } from "../contexts/FitnessContext"
import WorkoutCard from "../components/WorkoutCard"
import { FiPlus, FiActivity, FiFilter, FiX } from "react-icons/fi"

const WorkoutTracker = () => {
  const { workouts, addWorkout, loading } = useFitness()
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState("all")
  const [formData, setFormData] = useState({
    type: "Cardio",
    duration: 30,
    calories: 300,
    notes: "",
    exercises: [{ name: "", sets: 3, reps: 10, weight: 0 }],
  })

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle exercise input changes
  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...formData.exercises]
    updatedExercises[index] = { ...updatedExercises[index], [field]: value }
    setFormData((prev) => ({ ...prev, exercises: updatedExercises }))
  }

  // Add new exercise field
  const addExerciseField = () => {
    setFormData((prev) => ({
      ...prev,
      exercises: [...prev.exercises, { name: "", sets: 3, reps: 10, weight: 0 }],
    }))
  }

  // Remove exercise field
  const removeExerciseField = (index) => {
    const updatedExercises = [...formData.exercises]
    updatedExercises.splice(index, 1)
    setFormData((prev) => ({ ...prev, exercises: updatedExercises }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.type || formData.duration <= 0) {
      alert("Please fill in all required fields")
      return
    }

    // Filter out empty exercises
    const validExercises = formData.exercises.filter((ex) => ex.name.trim() !== "")

    // Add workout
    addWorkout({
      ...formData,
      exercises: validExercises,
      duration: Number(formData.duration),
      calories: Number(formData.calories),
    })

    // Reset form
    setFormData({
      type: "Cardio",
      duration: 30,
      calories: 300,
      notes: "",
      exercises: [{ name: "", sets: 3, reps: 10, weight: 0 }],
    })

    // Hide form
    setShowForm(false)
  }

  // Filter workouts
  const filteredWorkouts = filter === "all" ? workouts : workouts.filter((workout) => workout.type === filter)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Workout Tracker</h1>
          <p className="text-gray-600">Track and manage your workouts</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary flex items-center mt-4 md:mt-0">
          {showForm ? <FiX className="mr-1" /> : <FiPlus className="mr-1" />}
          {showForm ? "Cancel" : "Add Workout"}
        </button>
      </div>

      {/* Add Workout Form */}
      {showForm && (
        <div className="card">
          <h2 className="text-lg font-bold mb-4">Add New Workout</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="type" className="form-label">
                  Workout Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="Cardio">Cardio</option>
                  <option value="Strength">Strength</option>
                  <option value="Flexibility">Flexibility</option>
                  <option value="HIIT">HIIT</option>
                </select>
              </div>

              <div>
                <label htmlFor="duration" className="form-label">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="form-input"
                  min="1"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="calories" className="form-label">
                Calories Burned (estimated)
              </label>
              <input
                type="number"
                id="calories"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                className="form-input"
                min="0"
              />
            </div>

            {/* Exercises Section (only for Strength workouts) */}
            {formData.type === "Strength" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-medium">Exercises</h3>
                  <button
                    type="button"
                    onClick={addExerciseField}
                    className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center"
                  >
                    <FiPlus className="mr-1" /> Add Exercise
                  </button>
                </div>

                {formData.exercises.map((exercise, index) => (
                  <div key={index} className="p-4 border rounded-md bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Exercise {index + 1}</h4>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeExerciseField(index)}
                          className="text-sm text-red-500 hover:text-red-700"
                        >
                          <FiX />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                      <div>
                        <label className="form-label">Exercise Name</label>
                        <input
                          type="text"
                          value={exercise.name}
                          onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                          className="form-input"
                          placeholder="e.g., Bench Press"
                        />
                      </div>

                      <div>
                        <label className="form-label">Weight (lbs)</label>
                        <input
                          type="number"
                          value={exercise.weight}
                          onChange={(e) => handleExerciseChange(index, "weight", Number(e.target.value))}
                          className="form-input"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Sets</label>
                        <input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => handleExerciseChange(index, "sets", Number(e.target.value))}
                          className="form-input"
                          min="1"
                        />
                      </div>

                      <div>
                        <label className="form-label">Reps</label>
                        <input
                          type="number"
                          value={exercise.reps}
                          onChange={(e) => handleExerciseChange(index, "reps", Number(e.target.value))}
                          className="form-input"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div>
              <label htmlFor="notes" className="form-label">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-input"
                rows="3"
                placeholder="How did the workout feel? Any achievements?"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">
                Save Workout
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center mr-2">
          <FiFilter className="mr-1 text-gray-500" />
          <span className="text-sm text-gray-500">Filter:</span>
        </div>
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 text-sm rounded-full ${filter === "all" ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Cardio")}
          className={`px-3 py-1 text-sm rounded-full ${filter === "Cardio" ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Cardio
        </button>
        <button
          onClick={() => setFilter("Strength")}
          className={`px-3 py-1 text-sm rounded-full ${filter === "Strength" ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Strength
        </button>
        <button
          onClick={() => setFilter("Flexibility")}
          className={`px-3 py-1 text-sm rounded-full ${filter === "Flexibility" ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Flexibility
        </button>
        <button
          onClick={() => setFilter("HIIT")}
          className={`px-3 py-1 text-sm rounded-full ${filter === "HIIT" ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          HIIT
        </button>
      </div>

      {/* Workouts List */}
      {filteredWorkouts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="card bg-gray-50 flex flex-col items-center justify-center py-12">
          <FiActivity className="text-gray-400 mb-2" size={40} />
          <p className="text-gray-500">No workouts found</p>
          <button onClick={() => setShowForm(true)} className="mt-4 btn btn-primary">
            Add Your First Workout
          </button>
        </div>
      )}
    </div>
  )
}

export default WorkoutTracker

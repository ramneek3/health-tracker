"use client"

import { useState } from "react"
import { useFitness } from "../contexts/FitnessContext"
import NutritionCard from "../components/NutritionCard"
import { FiPlus, FiCoffee, FiFilter, FiX } from "react-icons/fi"

const NutritionTracker = () => {
  const { nutrition, addNutrition, loading } = useFitness()
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState("all")
  const [formData, setFormData] = useState({
    name: "",
    meal: "Breakfast",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    notes: "",
  })

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || formData.calories <= 0) {
      alert("Please fill in all required fields")
      return
    }

    // Add nutrition entry
    addNutrition({
      ...formData,
      calories: Number(formData.calories),
      protein: Number(formData.protein),
      carbs: Number(formData.carbs),
      fat: Number(formData.fat),
    })

    // Reset form
    setFormData({
      name: "",
      meal: "Breakfast",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      notes: "",
    })

    // Hide form
    setShowForm(false)
  }

  // Filter nutrition entries
  const filteredNutrition = filter === "all" ? nutrition : nutrition.filter((entry) => entry.meal === filter)

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
          <h1 className="text-2xl font-bold text-gray-800">Nutrition Tracker</h1>
          <p className="text-gray-600">Track your meals and nutrition intake</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary flex items-center mt-4 md:mt-0">
          {showForm ? <FiX className="mr-1" /> : <FiPlus className="mr-1" />}
          {showForm ? "Cancel" : "Log Meal"}
        </button>
      </div>

      {/* Add Nutrition Form */}
      {showForm && (
        <div className="card">
          <h2 className="text-lg font-bold mb-4">Log New Meal</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="form-label">
                  Meal Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Chicken Salad"
                  required
                />
              </div>

              <div>
                <label htmlFor="meal" className="form-label">
                  Meal Type
                </label>
                <select
                  id="meal"
                  name="meal"
                  value={formData.meal}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="calories" className="form-label">
                Calories
              </label>
              <input
                type="number"
                id="calories"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                className="form-input"
                min="0"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="protein" className="form-label">
                  Protein (g)
                </label>
                <input
                  type="number"
                  id="protein"
                  name="protein"
                  value={formData.protein}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                />
              </div>

              <div>
                <label htmlFor="carbs" className="form-label">
                  Carbs (g)
                </label>
                <input
                  type="number"
                  id="carbs"
                  name="carbs"
                  value={formData.carbs}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                />
              </div>

              <div>
                <label htmlFor="fat" className="form-label">
                  Fat (g)
                </label>
                <input
                  type="number"
                  id="fat"
                  name="fat"
                  value={formData.fat}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                />
              </div>
            </div>

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
                placeholder="Any additional details about this meal"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">
                Save Meal
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
          onClick={() => setFilter("Breakfast")}
          className={`px-3 py-1 text-sm rounded-full ${filter === "Breakfast" ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Breakfast
        </button>
        <button
          onClick={() => setFilter("Lunch")}
          className={`px-3 py-1 text-sm rounded-full ${filter === "Lunch" ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Lunch
        </button>
        <button
          onClick={() => setFilter("Dinner")}
          className={`px-3 py-1 text-sm rounded-full ${filter === "Dinner" ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Dinner
        </button>
        <button
          onClick={() => setFilter("Snack")}
          className={`px-3 py-1 text-sm rounded-full ${filter === "Snack" ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Snack
        </button>
      </div>

      {/* Nutrition List */}
      {filteredNutrition.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNutrition.map((entry) => (
            <NutritionCard key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="card bg-gray-50 flex flex-col items-center justify-center py-12">
          <FiCoffee className="text-gray-400 mb-2" size={40} />
          <p className="text-gray-500">No meals logged yet</p>
          <button onClick={() => setShowForm(true)} className="mt-4 btn btn-primary">
            Log Your First Meal
          </button>
        </div>
      )}
    </div>
  )
}

export default NutritionTracker

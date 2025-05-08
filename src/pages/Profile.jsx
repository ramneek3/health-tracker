"use client"

import { useState } from "react"
import { useFitness } from "../contexts/FitnessContext"
import { FiUser, FiTarget, FiSave, FiEdit, FiActivity, FiTrendingUp } from "react-icons/fi"

const Profile = () => {
  const { goals, updateGoals, loading, userData, updateUserData } = useFitness()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    dailyCalories: goals.dailyCalories,
    weeklyWorkouts: goals.weeklyWorkouts,
    weightGoal: goals.weightGoal,
  })

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Update user data
    updateUserData({
      name: formData.name,
      email: formData.email,
    })

    // Update goals
    updateGoals({
      dailyCalories: Number(formData.dailyCalories),
      weeklyWorkouts: Number(formData.weeklyWorkouts),
      weightGoal: formData.weightGoal,
    })

    // Exit edit mode
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-600">Manage your account and fitness goals</p>
        </div>
        <button
          onClick={() => (isEditing ? handleSubmit() : setIsEditing(true))}
          className="btn btn-primary flex items-center mt-4 md:mt-0"
        >
          {isEditing ? <FiSave className="mr-1" /> : <FiEdit className="mr-1" />}
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Information */}
        <div className="card md:col-span-1">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <FiUser className="w-12 h-12 text-emerald-600" />
            </div>
            {isEditing ? (
              <div className="w-full space-y-4">
                <div>
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-gray-500">{userData.email}</p>
              </>
            )}
            <div className="mt-6 w-full">
              <h3 className="text-lg font-medium mb-2">Account Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Member Since</span>
                  <span>May 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Login</span>
                  <span>Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fitness Goals */}
        <div className="card md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Fitness Goals</h2>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="dailyCalories" className="form-label">
                  Daily Calorie Goal
                </label>
                <input
                  type="number"
                  id="dailyCalories"
                  name="dailyCalories"
                  value={formData.dailyCalories}
                  onChange={handleChange}
                  className="form-input"
                  min="1000"
                  max="5000"
                  required
                />
              </div>

              <div>
                <label htmlFor="weeklyWorkouts" className="form-label">
                  Weekly Workout Goal
                </label>
                <input
                  type="number"
                  id="weeklyWorkouts"
                  name="weeklyWorkouts"
                  value={formData.weeklyWorkouts}
                  onChange={handleChange}
                  className="form-input"
                  min="1"
                  max="14"
                  required
                />
              </div>

              <div>
                <label htmlFor="weightGoal" className="form-label">
                  Weight Goal
                </label>
                <select
                  id="weightGoal"
                  name="weightGoal"
                  value={formData.weightGoal}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="lose">Lose Weight</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="gain">Gain Weight</option>
                </select>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <FiTarget className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-center font-medium">Daily Calories</h3>
                  <p className="text-2xl text-center font-bold">{goals.dailyCalories}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <FiActivity className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-center font-medium">Weekly Workouts</h3>
                  <p className="text-2xl text-center font-bold">{goals.weeklyWorkouts}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <FiTrendingUp className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-center font-medium">Weight Goal</h3>
                  <p className="text-2xl text-center font-bold capitalize">{goals.weightGoal}</p>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                <h3 className="font-medium text-emerald-800 mb-2">Goal Progress</h3>
                <p className="text-sm text-emerald-700">
                  Based on your activity, you're on track to meet your weekly workout goal. Keep up the good work!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Additional Settings */}
        <div className="card md:col-span-3">
          <h2 className="text-xl font-bold mb-4">Preferences</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive emails about your activity and progress</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Workout Reminders</h3>
                <p className="text-sm text-gray-500">Receive reminders for scheduled workouts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-gray-500">Switch between light and dark themes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

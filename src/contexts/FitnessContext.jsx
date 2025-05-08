"use client"

import { createContext, useState, useEffect, useContext } from "react"

const FitnessContext = createContext()

export const useFitness = () => useContext(FitnessContext)

export const FitnessProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([])
  const [nutrition, setNutrition] = useState([])
  const [goals, setGoals] = useState({
    dailyCalories: 2000,
    weeklyWorkouts: 5,
    weightGoal: "maintain", // 'lose', 'maintain', 'gain'
  })
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({
    name: "Guest User",
    email: "guest@example.com",
  })

  // Load data on initial load
  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    setLoading(true)
    try {
      // Fetch workouts
      const workoutsResponse = await fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
      const workoutsData = await workoutsResponse.json()

      // Transform the data to fit our workout model
      const transformedWorkouts = workoutsData.slice(0, 10).map((item) => ({
        id: item.id,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
        type: ["Cardio", "Strength", "Flexibility", "HIIT"][Math.floor(Math.random() * 4)],
        duration: Math.floor(Math.random() * 60) + 15, // 15-75 minutes
        calories: Math.floor(Math.random() * 500) + 100, // 100-600 calories
        notes: item.body.substring(0, 50),
        exercises: Array(Math.floor(Math.random() * 5) + 1)
          .fill()
          .map((_, i) => ({
            name: ["Push-ups", "Squats", "Lunges", "Plank", "Burpees", "Deadlifts", "Bench Press"][
              Math.floor(Math.random() * 7)
            ],
            sets: Math.floor(Math.random() * 4) + 1,
            reps: Math.floor(Math.random() * 12) + 5,
            weight: Math.floor(Math.random() * 100) + 5,
          })),
      }))

      setWorkouts(transformedWorkouts)

      // Fetch nutrition data
      const nutritionResponse = await fetch("https://jsonplaceholder.typicode.com/comments?postId=1")
      const nutritionData = await nutritionResponse.json()

      // Transform the data to fit our nutrition model
      const transformedNutrition = nutritionData.slice(0, 15).map((item) => ({
        id: item.id,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
        meal: ["Breakfast", "Lunch", "Dinner", "Snack"][Math.floor(Math.random() * 4)],
        calories: Math.floor(Math.random() * 800) + 100,
        protein: Math.floor(Math.random() * 50) + 5,
        carbs: Math.floor(Math.random() * 100) + 10,
        fat: Math.floor(Math.random() * 30) + 2,
        name: item.name.substring(0, 30),
        notes: item.body.substring(0, 50),
      }))

      setNutrition(transformedNutrition)

      // Load user goals (in a real app, this would come from the backend)
      setGoals({
        dailyCalories: 2000,
        weeklyWorkouts: 5,
        weightGoal: "maintain",
      })
    } catch (error) {
      console.error("Error fetching fitness data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Add a new workout
  const addWorkout = (workout) => {
    const newWorkout = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...workout,
    }
    setWorkouts((prev) => [newWorkout, ...prev])
    return newWorkout
  }

  // Add a new nutrition entry
  const addNutrition = (entry) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...entry,
    }
    setNutrition((prev) => [newEntry, ...prev])
    return newEntry
  }

  // Update user goals
  const updateGoals = (newGoals) => {
    setGoals((prev) => ({ ...prev, ...newGoals }))
    return goals
  }

  // Update user data
  const updateUserData = (newUserData) => {
    setUserData((prev) => ({ ...prev, ...newUserData }))
    return userData
  }

  // Get workout stats
  const getWorkoutStats = () => {
    if (workouts.length === 0) return { totalWorkouts: 0, totalDuration: 0, totalCalories: 0 }

    const totalWorkouts = workouts.length
    const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0)
    const totalCalories = workouts.reduce((sum, workout) => sum + workout.calories, 0)

    return { totalWorkouts, totalDuration, totalCalories }
  }

  // Get nutrition stats
  const getNutritionStats = () => {
    if (nutrition.length === 0) return { totalCalories: 0, avgProtein: 0, avgCarbs: 0, avgFat: 0 }

    const totalCalories = nutrition.reduce((sum, entry) => sum + entry.calories, 0)
    const avgProtein = Math.round(nutrition.reduce((sum, entry) => sum + entry.protein, 0) / nutrition.length)
    const avgCarbs = Math.round(nutrition.reduce((sum, entry) => sum + entry.carbs, 0) / nutrition.length)
    const avgFat = Math.round(nutrition.reduce((sum, entry) => sum + entry.fat, 0) / nutrition.length)

    return { totalCalories, avgProtein, avgCarbs, avgFat }
  }

  const value = {
    workouts,
    nutrition,
    goals,
    loading,
    userData,
    addWorkout,
    addNutrition,
    updateGoals,
    updateUserData,
    getWorkoutStats,
    getNutritionStats,
  }

  return <FitnessContext.Provider value={value}>{children}</FitnessContext.Provider>
}

"use client"
import { Link } from "react-router-dom"
import { useFitness } from "../contexts/FitnessContext"
import StatCard from "../components/StatCard"
import WorkoutCard from "../components/WorkoutCard"
import NutritionCard from "../components/NutritionCard"
import { FiActivity, FiClock, FiTrendingUp, FiTarget, FiPlus, FiCoffee } from "react-icons/fi"

const Dashboard = () => {
  const { workouts, nutrition, goals, loading, getWorkoutStats, getNutritionStats, userData } = useFitness()

  // Get stats
  const workoutStats = getWorkoutStats()
  const nutritionStats = getNutritionStats()

  // Get recent workouts and nutrition entries
  const recentWorkouts = workouts.slice(0, 3)
  const recentNutrition = nutrition.slice(0, 3)

  // Prepare chart data
  const last7DaysWorkouts = workouts
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-7)
    .map((workout) => workout.duration)

  const last7DaysCalories = nutrition
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-7)
    .map((entry) => entry.calories)

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
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {userData.name}!</h1>
          <p className="text-gray-600">Here's an overview of your fitness journey</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Link to="/workouts" className="btn btn-primary flex items-center">
            <FiPlus className="mr-1" /> Add Workout
          </Link>
          <Link to="/nutrition" className="btn btn-secondary flex items-center">
            <FiPlus className="mr-1" /> Log Meal
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Workouts"
          value={workoutStats.totalWorkouts}
          icon={<FiActivity size={20} />}
          color="emerald"
        />
        <StatCard
          title="Workout Minutes"
          value={workoutStats.totalDuration}
          icon={<FiClock size={20} />}
          color="blue"
        />
        <StatCard
          title="Calories Burned"
          value={workoutStats.totalCalories}
          icon={<FiTrendingUp size={20} />}
          color="amber"
        />
        <StatCard title="Daily Calorie Goal" value={goals.dailyCalories} icon={<FiTarget size={20} />} color="violet" />
      </div>

      {/* Stats and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-bold mb-4">Workout Summary</h2>
          <div className="space-y-4">
            <div className="bg-emerald-50 p-4 rounded-lg">
              <h3 className="font-medium text-emerald-800 mb-2">Recent Activity</h3>
              <p className="text-sm text-emerald-700">
                You've completed {workoutStats.totalWorkouts} workouts for a total of {workoutStats.totalDuration}{" "}
                minutes.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Calories Burned</h3>
              <p className="text-sm text-blue-700">
                You've burned approximately {workoutStats.totalCalories} calories through your workouts.
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <h2 className="text-lg font-bold mb-4">Nutrition Summary</h2>
          <div className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="font-medium text-amber-800 mb-2">Calorie Intake</h3>
              <p className="text-sm text-amber-700">
                Your average daily calorie intake is{" "}
                {Math.round(nutritionStats.totalCalories / (nutrition.length || 1))} calories.
              </p>
            </div>
            <div className="bg-violet-50 p-4 rounded-lg">
              <h3 className="font-medium text-violet-800 mb-2">Macronutrients</h3>
              <p className="text-sm text-violet-700">
                Average daily: {nutritionStats.avgProtein}g protein, {nutritionStats.avgCarbs}g carbs,{" "}
                {nutritionStats.avgFat}g fat.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Workouts */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Workouts</h2>
            <Link to="/workouts" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              View All
            </Link>
          </div>

          {recentWorkouts.length > 0 ? (
            <div className="space-y-4">
              {recentWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          ) : (
            <div className="card bg-gray-50 flex flex-col items-center justify-center py-8">
              <FiActivity className="text-gray-400 mb-2" size={40} />
              <p className="text-gray-500">No workouts recorded yet</p>
              <Link to="/workouts" className="mt-4 btn btn-primary">
                Add Your First Workout
              </Link>
            </div>
          )}
        </div>

        {/* Recent Nutrition */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Nutrition</h2>
            <Link to="/nutrition" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              View All
            </Link>
          </div>

          {recentNutrition.length > 0 ? (
            <div className="space-y-4">
              {recentNutrition.map((entry) => (
                <NutritionCard key={entry.id} entry={entry} />
              ))}
            </div>
          ) : (
            <div className="card bg-gray-50 flex flex-col items-center justify-center py-8">
              <FiCoffee className="text-gray-400 mb-2" size={40} />
              <p className="text-gray-500">No meals logged yet</p>
              <Link to="/nutrition" className="mt-4 btn btn-primary">
                Log Your First Meal
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

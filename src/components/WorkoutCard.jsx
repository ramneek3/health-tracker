import { FiClock, FiCalendar, FiFlag } from "react-icons/fi"

const WorkoutCard = ({ workout }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-emerald-700">{workout.type} Workout</h3>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <FiCalendar className="mr-1" />
            <span>{formatDate(workout.date)}</span>
          </div>
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">{workout.calories} cal</span>
      </div>

      <div className="mt-4 flex items-center text-gray-700">
        <FiClock className="mr-1" />
        <span>{workout.duration} minutes</span>
      </div>

      {workout.exercises && workout.exercises.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium text-sm text-gray-700 mb-2">Exercises:</h4>
          <div className="space-y-2">
            {workout.exercises.map((exercise, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                <div className="font-medium">{exercise.name}</div>
                <div className="text-gray-600 text-xs mt-1">
                  {exercise.sets} sets × {exercise.reps} reps
                  {exercise.weight ? ` • ${exercise.weight} lbs` : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {workout.notes && (
        <div className="mt-4 text-sm text-gray-600">
          <FiFlag className="inline mr-1" />
          <span>Notes: {workout.notes}</span>
        </div>
      )}
    </div>
  )
}

export default WorkoutCard

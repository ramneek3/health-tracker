import { FiCalendar, FiCoffee } from "react-icons/fi"

const NutritionCard = ({ entry }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-emerald-700">{entry.name}</h3>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <FiCalendar className="mr-1" />
            <span>{formatDate(entry.date)}</span>
          </div>
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">{entry.meal}</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="bg-gray-50 p-2 rounded">
          <div className="text-xs text-gray-500">Calories</div>
          <div className="font-bold">{entry.calories}</div>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <div className="text-xs text-gray-500">Protein</div>
          <div className="font-bold">{entry.protein}g</div>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <div className="text-xs text-gray-500">Carbs</div>
          <div className="font-bold">{entry.carbs}g</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="bg-gray-50 p-2 rounded text-center w-full">
          <div className="text-xs text-gray-500">Fat</div>
          <div className="font-bold">{entry.fat}g</div>
        </div>
      </div>

      {entry.notes && (
        <div className="mt-4 text-sm text-gray-600">
          <FiCoffee className="inline mr-1" />
          <span>Notes: {entry.notes}</span>
        </div>
      )}
    </div>
  )
}

export default NutritionCard

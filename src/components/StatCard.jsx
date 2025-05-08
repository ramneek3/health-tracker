const StatCard = ({ title, value, icon, color = "emerald" }) => {
  const colorClasses = {
    emerald: "bg-emerald-100 text-emerald-800",
    blue: "bg-blue-100 text-blue-800",
    amber: "bg-amber-100 text-amber-800",
    rose: "bg-rose-100 text-rose-800",
    violet: "bg-violet-100 text-violet-800",
  }

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${colorClasses[color]} mr-4`}>{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default StatCard

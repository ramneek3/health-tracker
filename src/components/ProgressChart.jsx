"use client"

import { useEffect, useRef, useState } from "react"
import Chart from "chart.js/auto"

const ProgressChart = ({ data, type = "line", title, labels }) => {
  const chartRef = useRef(null)
  const canvasRef = useRef(null)
  const [chartId] = useState(`chart-${Math.random().toString(36).substr(2, 9)}`)

  useEffect(() => {
    // Wait for the canvas to be in the DOM
    if (!canvasRef.current) return

    // Destroy previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy()
    }

    // Create new chart
    const ctx = canvasRef.current.getContext("2d")

    chartRef.current = new Chart(ctx, {
      type,
      data: {
        labels: labels || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: title || "Progress",
            data: data,
            backgroundColor: "rgba(16, 185, 129, 0.2)",
            borderColor: "rgba(16, 185, 129, 1)",
            borderWidth: 2,
            tension: 0.4,
            pointBackgroundColor: "rgba(16, 185, 129, 1)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
      },
    })

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [data, type, title, labels, chartId])

  return (
    <div className="h-64 w-full">
      <canvas ref={canvasRef} id={chartId}></canvas>
    </div>
  )
}

export default ProgressChart

import React, { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

const BarGraph = ({ data }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d')
    let myChart

    if (data) {
      Chart.register(...registerables)

      if (typeof Chart === 'function') {
        myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.labels,
            datasets: [
              {
                label: 'Planned Hires',
                data: data.plannedHires,
                backgroundColor: 'rgba(75, 192, 192, 0.5)' // Customize the color as needed
              },
              {
                label: 'Student Hires',
                data: data.studentHires,
                backgroundColor: 'rgba(255, 99, 132, 0.5)' // Customize the color as needed
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                type: 'linear',
                beginAtZero: true
              }
            }
          }
        })
      }
    }

    return () => {
      // Clean up the chart when the component unmounts
      if (myChart) {
        myChart.destroy()
      }
    }
  }, [data])

  return <canvas ref={chartRef} />
}

export default BarGraph

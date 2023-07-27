import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip } from 'chart.js';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

export default function RetentionGraphComponent() {
    const data = {
        labels: ['2017', '2019', '2020', '2021', '2022', '2023'],
        datasets: [
          {
            label: 'Retention Rate',
            data: [10, 30, 20, 40, 25, 35],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
          },
        ],
      };
    
      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    
      return (
        <div className='bg-white mt-4 p-4'>
          <h2 className='text-center pt-2 pl-2 text-xl font-bold text-black mb-4'>Students' average retention rate in companies</h2>
          <Line data={data} options={options} />
        </div>
      )
}
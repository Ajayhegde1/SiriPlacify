// src/RadarChart.js
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart, Legend, Tooltip } from 'chart.js';
import { RadialLinearScale } from 'chart.js';

Chart.register(RadialLinearScale, Legend, Tooltip);

const TopThreeSectorComponents = () => {
    const data = {
        labels: ['Automobile', 'Consulting', 'Conglomerate'],
        datasets: [
            {
                label: 'Top Hiring Sectors',
                backgroundColor: 'rgba(0, 100, 0, 1)',
                borderColor: 'rgba(0, 100, 0, 1)',
                pointBackgroundColor: 'rgba(0, 100, 0, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(0, 100, 0, 1)',
                data: [85, 70, 100]
            }
        ]
    };

    const options = {
        plugins: {
            tooltip: {
                enabled: true, // Set to true to enable tooltips
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
                },
            },
        },
        // Add other chart options as needed
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                beginAtZero: true,
            },
        },
    }

    return (
        <div className='bg-white mt-4 px-4 py-4 flex flex-col rounded-lg'>
            <h1 className="text-left pt-4 mb-6 pl-4 text-4xl font-bold text-black">Top Hiring Sectors</h1>
            <div>
                <Radar
                    data={data}
                    width={350}
                    height={350}
                    options={options}
                />
            </div>
        </div>
    )
}

export default TopThreeSectorComponents;

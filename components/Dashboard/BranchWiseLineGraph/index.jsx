import { Line } from 'react-chartjs-2';
import {
    Chart,Tooltip
} from 'chart.js';

Chart.register(Tooltip)

export default function BranchWiseLineGraph() {
    const branchData = [
        {
            name: 'CSE',
            recruitingStats: [45, 20, 85, 50, 40], // Replace with your data for CSE branch
            color: 'rgba(255, 99, 132, 1)', // Line color for CSE branch
        },
        {
            name: 'ECE',
            recruitingStats: [20, 80, 65, 65, 70], // Replace with your data for ECE branch
            color: 'rgba(54, 162, 235, 1)', // Line color for ECE branch
        },
        {
            name: 'Mech',
            recruitingStats: [55, 75, 45, 75, 25], // Replace with your data for Mech branch
            color: 'rgba(255, 206, 86, 1)', // Line color for Mech branch
        },
    ]

    const chartData = {
        labels: ['2019', '2020', '2021', '2022', '2023'], // Months or X-axis labels
        datasets: branchData.map((branch) => ({
            label: branch.name, // Branch name as the label for each dataset
            data: branch.recruitingStats, // Recruiting statistics for the branch
            borderColor: branch.color, // Border color for the line
            fill: false, // Do not fill the area under the line
        })),
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true, 
            },
            x: {
                beginAtZero: true, 
            }
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'start', 
            },
            tooltip: {
              enabled: true, // Enable tooltips
              mode: 'index', // Show a single tooltip item when hovering over multiple datasets
              intersect: false, // Disable intersect mode to avoid overlapping tooltips
            }
        }
    }

    return (
        <div className='mt-10 bg-white rounded-lg shadow-lg p-4'>
            <div className="text-left">
                <h2 className="relative ml-6 text-lg md:text-3xl font-bold mt-1 md:mt-5 mb-4 md:mb-6">
                    Branch-wise companies' recruiting statistics
                </h2>
            </div>
            <div className='w-full h-96'>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    )
}
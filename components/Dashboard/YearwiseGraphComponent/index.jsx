import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function YearwiseGraphComponent() {
    const chartData = {
        labels: ["2019", "2020", '2021', '2022', '2023'],
        datasets: [
            {
                label: "PPO's",
                data: [60, 70, 80, 85, 90],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'Students with Internship',
                data: [40, 50, 65, 70, 75],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
                label: 'Offers rolled out',
                data: [30, 45, 55, 60, 65],
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
            },
            {
                label: 'Companies Visited',
                data: [20, 30, 40, 45, 50],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Students Registered',
                data: [10, 20, 25, 30, 35],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
            },
        },
    }

    return (
        <div className='mt-10 mb-5 bg-white rounded-lg shadow-lg p-4'>
            <h2 className='text-lg md:text-4xl font-bold text-left ml-6 mt-5 mb-2 md:mb-10'>Placement growth/trend</h2>
            <div className='mt-4' style={{height: '450px'}}>
                <Bar data={chartData} options={options} />
            </div>
        </div>
    )
}
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

export default function PlannedVsActualGraph() {
    const data = {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [
            {
                label: 'Planned Hires',
                data: [50, 60, 70, 80, 90], // Replace with your actual planned hires data
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Actual Hires',
                data: [40, 55, 65, 75, 85], // Replace with your actual actual hires data
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    return (
        <div className='mt-4 mb-5 bg-white rounded-lg shadow-lg p-4'>
            <h2 className='text-lg md:text-4xl font-bold text-left ml-6 mt-5 mb-2 md:mb-10'>
                Planned hiring vs Actual hired
            </h2>
            <Bar data={data} options={options} />
        </div>
    )
}
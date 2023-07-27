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

export default function SectorTrendGraphComponent() {
    const chartData = {
        labels: ["2019", "2020", '2021', '2022', '2023'],
        datasets: [
            {
                label: "Core sector",
                data: [80,60,100,75,98],
                backgroundColor: '#E0C6FD',
            },
            {
                label: 'IT & ITeS',
                data: [25,75,54,90,60],
                backgroundColor: '#FFB7D1',
            }
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
            <h2 className='text-lg md:text-4xl font-bold text-left ml-6 mt-5 mb-2 md:mb-10'>
                Sector wise placement growth/trend
            </h2>
            <div className='mt-4' style={{height: '450px'}}>
                <Bar data={chartData} options={options} />
            </div>
        </div>
    )
}
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, Tooltip } from 'chart.js';
import { getBranchTrends } from '@/redux/Sagas/requests/features';
import { notificationTypes, openNotification } from '@/utils/notifications';
import { Spin } from 'antd';

Chart.register(Tooltip);

export default function BranchWiseLineGraph() {
    const [Data, setData] = useState({});
    const [years, setYears] = useState([]);

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    useEffect(() => {
        getBranchTrends()
            .then((res) => {
                if (res.data.status === 200) {
                    let data = res.data.data
                    setYears(data.years)
                    setData(data.departments)
                } else {
                    openNotification(notificationTypes.ERROR, 'Error', res.data.message);
                }
            })
            .catch((error) => {
                openNotification(
                    notificationTypes.ERROR,
                    'Error',
                    'Something went wrong'
                );
            });
    }, []);

    const chartData = {
        labels: years,
        datasets: Object.entries(Data).map(([deptName, hiringStats]) => ({
            label: deptName,
            data: hiringStats,
            borderColor: getRandomColor(),
            fill: false,
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
            },
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'start',
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
            },
        },
    };

    return (
        <div className="mt-10 bg-white rounded-lg shadow-lg p-4">
            <div className="text-left">
                <h2 className="relative ml-6 text-lg md:text-3xl font-bold mt-1 md:mt-5 mb-4 md:mb-6">
                    Branch-wise companies' recruiting statistics
                </h2>
            </div>
            {Object.keys(Data).length === 0 ? (
                <div className="flex justify-center items-center">
                    {Data === null ? <Spin size="large" /> : 'No Data To Show'}
                </div>
            ) : (
                <div className="w-full h-96">
                    <Line data={chartData} options={chartOptions} />
                </div>
            )}
        </div>
    );
}

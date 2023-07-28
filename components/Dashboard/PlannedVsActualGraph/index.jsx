import { useState, useEffect } from 'react';

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
import { getCompanyHires } from '@/redux/Sagas/requests/features';
import { notificationTypes, openNotification } from '@/utils/notifications';
import { Spin } from 'antd';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function PlannedVsActualGraph() {
    const [loading, setLoading] = useState(true)
    const [years, setYears] = useState([])
    const [plannedHires, setPlannedHires] = useState([])
    const [actualHires, setActualHires] = useState([])

    useEffect(() => {
        getCompanyHires()
            .then((res) => {
                if (res.data.status === 200) {
                    setLoading(false)
                    let responseData = res.data.data
                    let years = responseData.map((item) => item.year)
                    let plannedHires = responseData.map((item) => item.noOfPlannedHires)
                    let actualHires = responseData.map((item) => item.noOfHires)
                    setYears(years)
                    setPlannedHires(plannedHires)
                    setActualHires(actualHires)
                }
                else {
                    openNotification(
                        notificationTypes.ERROR,
                        'Error',
                        res.data.message
                    )
                }
            })
            .catch((err) => {
                openNotification(
                    notificationTypes.ERROR,
                    'Error',
                    'Error while fetching data'
                )
            })
    }, [])

    const data = {
        labels: years,
        datasets: [
            {
                label: 'Planned Hires',
                data: plannedHires,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Actual Hires',
                data: actualHires,
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
        <>
            {
                loading === true
                    ?
                    <Spin size={'large'} />
                    :
                    <div className='mt-4 mb-5 bg-white rounded-lg shadow-lg p-4'>
                        <h2 className='text-lg md:text-4xl font-bold text-left ml-6 mt-5 mb-2 md:mb-10'>
                            Planned hiring vs Actual hired
                        </h2>
                        <Bar data={data} options={options} />
                    </div>
            }
        </>
    )
}
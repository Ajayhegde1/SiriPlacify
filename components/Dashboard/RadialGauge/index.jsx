import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function RadialGauge({
    score, 
    color
}) {
    const [shouldRenderChart, setShouldRenderChart] = useState(false);

    useEffect(() => {
        try {
            if (window) {
                setShouldRenderChart(true);
            }
        } catch (error) {
            console.error('Error accessing the window object:', error);
        }
    }, []);

    const options = {
        chart: {
            type: 'radialBar',
            toolbar: {
                show: false, // Hide the default toolbar to save space
            },
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '55%',
                },
                dataLabels: {
                    name: {
                        show: false, // Hide the data label names (e.g., 'Cricket')
                    },
                    value: {
                        fontSize: '16px', 
                        offsetY: 8
                    },
                },
            },
        },
        labels: [''], 
        colors: [color],
        responsive: [
            {
                breakpoint: 480, // Adjust the breakpoint value as needed
                options: {
                    chart: {
                        height: '200px', // Set a smaller height for mobile view
                    },
                    plotOptions: {
                        radialBar: {
                            startAngle: -90,
                            endAngle: 90,
                            dataLabels: {
                                value: {
                                    fontSize: '12px', 
                                    offsetY: -4,
                                },
                            },
                        },
                    },
                },
            },
        ],
    };

    return shouldRenderChart ? (
        <div className='col-span-3'>
            <ReactApexChart options={options} series={[score]} type="radialBar" height="100%" />
        </div>
    ) : null;
}

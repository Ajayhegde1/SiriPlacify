import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, ArcElement, Legend } from 'chart.js';

Chart.register(ArcElement, Legend);

const Testdata = {
  labels: ['Placed', 'Unplaced'],
  datasets: [
    {
      data: [20, 20],
      backgroundColor: ['#FFFFFF', '#11CC46'],
      borderColor: ['#FFFFFF', '#11CC46'],
      borderWidth: 2,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      position: 'right',
      rtl: false,
      labels: {
        boxWidth: 12,
        fontColor: 'black',
        fontFamily: 'DM Sans',
        fontSize: 24, // Increase the font size here for the legend
        fontStyle: 'bold',
        padding: 20, // Increase the padding for the legend
      },
    },
    datalabels: {
      display: function (context) {
        return context.dataset.data[context.dataIndex] !== 0 // or >= 1 or ...
      },
      labels: {
        value: {
          color: 'black'
        }
      }
    }
  }
};

export default function PlacedGraphComponents() {
  return (
    <div className='mt-6 bg-blue-200 px-4 pt-4 rounded-lg flex flex-col'>
      <h1 className="text-left pt-2 pl-2 text-3xl font-bold text-black">Placement percentage</h1>
      <div className='flex-grow flex justify-center' style={{ height: '300px' }}> 
        <Doughnut
          data={Testdata}
          plugins={[ChartDataLabels]}
          options={options}
        />
      </div>
    </div>
  );
}

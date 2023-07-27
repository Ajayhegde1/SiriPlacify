import React from 'react';
import { Pie } from 'react-chartjs-2';

export default function SectorWisePlacementGraph() {
  const data = {
    labels: ['Automobile', 'Banking/Financial Services/Insurance', 'Conglomerate', 'Consulting', 'Consumer Durables', 'Engineering', 'FMCG'],
    datasets: [
      {
        data: [10, 20, 30, 5, 15, 8, 12],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#33FF99',
          '#FF9900',
          '#9966FF',
          '#FF33CC',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#33FF99',
          '#FF9900',
          '#9966FF',
          '#FF33CC',
        ],
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 20,
          fontColor: 'black',
          fontFamily: 'DM Sans',
          fontSize: 20,
          fontStyle: 'bold',
          padding: 16, // Adjust the padding for the legend
        },
        // Custom function to display three labels in one column
        generateLabels: function (chart) {
          const original = Chart.overrides.pie.plugins.legend.labels.generateLabels(chart);
          const labelsPerColumn = 3;
          const rows = Math.ceil(original.length / labelsPerColumn);
          const newLabels = [];

          for (let i = 0; i < rows; i++) {
            const rowLabels = original.slice(i * labelsPerColumn, (i + 1) * labelsPerColumn);
            newLabels.push(rowLabels);
          }

          return newLabels.flat(); // Return a flat array of labels
        },
      },
      datalabels: {
        display: function (context) {
          return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
        },
        labels: {
          value: {
            color: 'black',
          },
        },
      },
    }
  };


  return (
    <div className="mt-4 bg-white px-4 py-4 rounded-lg flex flex-col">
      <h1 className="text-left pt-4 pb-6 pl-4 text-lg md:text-4xl font-bold text-black">
        Placements across sectors
      </h1>
      <div className='flex-grow flex justify-center' style={{ height: '400px'}}>
        <Pie
          data={data}
          options={options}
        />
      </div>
    </div >
  )
}

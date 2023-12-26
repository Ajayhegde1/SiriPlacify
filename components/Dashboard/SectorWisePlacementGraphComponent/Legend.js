import React from "react";

const Legend = ({ chartData }) => {
  if (!chartData) return null;

  const labels = chartData.labels;
  const data = chartData.datasets[0].data;
  const backgroundColor = chartData.datasets[0].backgroundColor;

  // Calculate the number of columns based on a maximum of 4 rows
  const columns = Math.ceil(labels.length / 4);

  return (
    <div className="legend-container ml-[40px]">
      <div className="legend-columns">
        {[...Array(columns)].map((_, colIndex) => (
          <ul key={colIndex} className="legend-list">
            {labels
              .slice(colIndex * 4, (colIndex + 1) * 4)
              .map((label, index) => (
                <li key={index} className="legend-item">
                  <span
                    className="legend-color-box"
                    style={{
                      backgroundColor: backgroundColor[colIndex * 4 + index],
                    }}
                  ></span>
                  <span className="legend-label">{label}</span>
                  <span className="legend-data">
                    {data[colIndex * 4 + index]}
                  </span>
                </li>
              ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Legend;

import React, { useEffect, useRef, useState } from "react";

const PieChart = ({ chartData }) => {
  const canvasRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      //   console.log("Canvas not found");
      return;
    }

    const ctx = canvas.getContext("2d");

    if (chartData) {
      const data = chartData.datasets[0].data;
      const backgroundColor = chartData.datasets[0].backgroundColor;

      const total = data.reduce((acc, value) => acc + value, 0);
      let startAngle = 0;

      data.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;

        // Draw the slice
        ctx.beginPath();
        ctx.fillStyle = backgroundColor[index];
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 3,
          startAngle,
          startAngle + sliceAngle
        );
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        ctx.fill();

        // Update the start angle for the next slice
        startAngle += sliceAngle;
      });

      // Add mousemove event listener for the tooltip
      canvas.addEventListener("mousemove", handleMouseMove);
    }

    // Remove the event listener when the component is unmounted
    return () => {
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        // console.log("Event listener removed");
      }
    };
  }, [chartData]);

  //   const handleMouseMove = (e) => {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext("2d");

  //     const rect = canvas.getBoundingClientRect();
  //     const x = e.clientX - rect.left;
  //     const y = e.clientY - rect.top;

  //     const imageData = ctx.getImageData(x, y, 1, 1).data;
  //     const color = `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, ${
  //       imageData[3] / 255
  //     })`;

  //     // Find the index of the corresponding legend item
  //     const index = chartData.datasets[0].backgroundColor.findIndex(
  //       (bgColor) => bgColor === color
  //     );

  //     // Display the tooltip (you can customize this part)
  //     if (index !== -1) {
  //       const label = chartData.labels[index];
  //       const value = chartData.datasets[0].data[index];

  //       console.log(`Legend: ${label}, Color: ${color}, Value: ${value}`);
  //     }
  //   };

  const handleMouseMove = (e) => {
    // console.log("Mouse move event triggered");

    const canvas = canvasRef.current;
    if (!canvas) {
      //   console.log("Canvas not found");
      return;
    }

    const ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // console.log("Mouse coordinates:", x, y);

    const imageData = ctx.getImageData(x, y, 1, 1).data;
    const color = `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, ${
      imageData[3] / 255
    })`;

    // console.log("Color:", color);

    // Find the index of the corresponding legend item
    const index = chartData.datasets[0].backgroundColor.findIndex(
      (bgColor) => bgColor === color
    );

    // Display the tooltip (you can customize this part)
    if (index !== -1) {
      const label = chartData.labels[index];
      const value = chartData.datasets[0].data[index];

      setTooltip({
        label,
        color,
        value,
        x: e.clientX,
        y: e.clientY,
      });
    } else {
      setTooltip(null);
    }
  };

  const renderLegend = () => {
    if (!chartData) return null;

    const labels = chartData.labels;
    // const labels = ["a", "b", "c", "d", "e", "b", "c", "d", "e"];
    const data = chartData.datasets[0].data;

    const backgroundColor = chartData.datasets[0].backgroundColor;

    // Calculate the number of columns based on a maximum of 4 rows
    const columns = Math.ceil(labels.length / 4);

    return (
      <div className="legend-container">
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
  const renderTooltip = () => {
    // console.log("Rendering tooltip:", tooltip);
    if (!tooltip) return null;

    return (
      <div className="tooltip" style={{ top: tooltip.y, left: tooltip.x }}>
        <div>
          <span
            className="tooltip-color-box"
            style={{ backgroundColor: tooltip.color }}
          ></span>
          <span className="tooltip-label">{tooltip.label}</span>
        </div>
        <div className="tooltip-value">Value: {tooltip.value}</div>
      </div>
    );
  };
  return (
    <div className="flex-grow flex justify-center items-center">
      <canvas ref={canvasRef} id="pieChart" width="400" height="400"></canvas>
      {renderLegend()}
      {renderTooltip()}
    </div>
  );
};

export default PieChart;

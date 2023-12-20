import React, { useEffect, useState } from 'react';
import annotationPlugin from 'chartjs-plugin-annotation';
import './Attendance.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  annotationPlugin,
  Title,
  Tooltip,
  
);

interface AttendanceProps {
    darkMode: boolean
  }
  function Attendance({ darkMode }: AttendanceProps) {
    const dataValues = [76, 79, 90, 63, 98, 77];
    const backgroundColors = dataValues.map(value => (value < 75 ? '#FF8A00' : '#F8FBF5'));
const options = {
    scales: {
        x: {
            grid: {
                drawBorder: false,
                display: false, // Remove gridlines on the x-axis
            },
            border:{
                display:false
              }
            
          },
        y: {
          beginAtZero: false,
          min: 60,
          max: 100,
          ticks: {
            // forces step size to be 50 units
            stepSize: 10
          },
          grid: {
            drawBorder: false,
            display: false, // Remove gridlines on the x-axis
        },
        border:{
            display:false
          }
        },
        
      },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    elements: {
        bar: {
            topRight: 50,
            bottomRight: 50,
            bottomLeft: 50,
            topLeft: 50,
        },
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 75,
            yMax: 75,
            borderColor: 'white',
            borderWidth: 1,
            borderDash: ([10, 10]),
          }
        }
      },
    
    title: {
      display: true,
      text: 'Attendance',
    },
  },
};



 const data = {
    labels : [ 'CS-105','ICT-4456','MATH-5043','CS-105','ICT-4356','MATH-5443'],
    datasets: [
    {
      data: dataValues,
      backgroundColor: backgroundColors,
      hoverBackgroundColor: backgroundColors,
      borderWidth: 1,
      borderRadius: {
        topRight: 50,
        bottomRight: 50,
        bottomLeft: 50,
        topLeft: 50,
      },
      barThickness: 20,

    },
    
  ],
};
  return (
    <div className='attendance-component'>
        <Bar options={options} data={data} />
    </div>
  );
}

export default Attendance;
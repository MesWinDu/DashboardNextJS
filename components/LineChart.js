"use client"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import React from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart({ alldata, date, isloading, error }) {
  // Function to convert date and time pairs to formatted strings
  const convertToDateTimeStrings = (dateTimeArray) => {
    if (!dateTimeArray || !Array.isArray(dateTimeArray)) {
      return [];
    }

    return dateTimeArray.map(([date, time]) => {
      const [year, month, day] = date.split('-').map(Number);
      const [hours, minutes] = time.split(':').map(Number);

      // Adjust time zone to +7
      const adjustedHours = (hours + 7) % 24;

      // Format the date and time as per your requirement
      const formattedDateTime = `${day}/${month}/${year} ${adjustedHours}:${minutes}`;
      console.log(formattedDateTime)
      return formattedDateTime;
    });
  };

  // Call the function to get an array of formatted date and time strings
  const dateStringsArray = convertToDateTimeStrings(date);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      },
    },
  };

  const data = {
    labels: dateStringsArray,
    datasets: [
      {
        label: 'Dataset 1',
        data: alldata,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  if (isloading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  // console.log(alldata,dateStringsArray)
  return <Line options={options} data={data} />;
}

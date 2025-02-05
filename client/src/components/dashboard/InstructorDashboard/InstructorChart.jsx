import React, { useState, useMemo } from "react";
import { Chart, ArcElement, PieController, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement, PieController, Tooltip, Legend);

function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState('students');

  const getRandomColors = (numColors) => {
    return Array.from({ length: numColors }, () => 
      `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    );
  };

  const chartDataForStudents = useMemo(() => ({
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: getRandomColors(courses.length)
      }
    ]
  }), [courses]);

  const chartDataForIncome = useMemo(() => ({
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: getRandomColors(courses.length)
      }
    ]
  }), [courses]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Course Data Chart'
      }
    }
  };

  return (
    <div className="flex w-full bg-richblack-800 flex-col gap-4 p-6">
      <p className="text-richblack-25 text-2xl font-semibold">Visualise</p>
      <div className="flex flex-row gap-10">
        <button 
          className={`px-4 py-1 rounded ${currChart === 'students' ? 'text-yellow-25 bg-richblack-700' : 'text-yellow-200'}`}
          onClick={() => setCurrChart('students')}
        >
          Students
        </button>
        <button 
          className={`px-4 py-1 rounded ${currChart === 'income' ? 'text-yellow-25 bg-richblack-700' : 'text-yellow-200'}`}
          onClick={() => setCurrChart('income')}
        >
          Income
        </button>
      </div>
      <div className="mx-auto ">
        <Pie
          data={currChart === 'students' ? chartDataForStudents : chartDataForIncome}
          options={options}
        />
      </div>
    </div>
  );
}

export default InstructorChart;

import React from 'react';
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const HabitChart = ({ habits }) => {
    const data = {
        labels: habits.map((habit) => habit.name),
        datasets: [
            {
                label: 'Times Completed',
                data: habits.map((habit) => habit.completed_dates ? habit.completed_dates.length : 0),
                backgroundColor: 'rgba(99, 102, 241, 0.5)',
                borderColor: 'rgb(99, 102, 241)',
                borderWidth: 1,
            },
            {
                label: 'Target Frequency',
                data: habits.map((habit) => habit.target_frequency),
                backgroundColor: 'rgba(209, 213, 219, 0.5)',
                borderColor: 'rgb(209, 213, 219)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Habit Progress Overview',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <Bar data={data} options={options} />
        </div>
    );
};

export default HabitChart;

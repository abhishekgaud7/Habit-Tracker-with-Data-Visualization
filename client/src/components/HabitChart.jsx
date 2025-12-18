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
import { motion } from 'framer-motion';

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
                label: 'Completed',
                data: habits.map((habit) => habit.completed_dates ? habit.completed_dates.length : 0),
                backgroundColor: 'rgba(99, 102, 241, 0.8)', // Indigo-500
                borderRadius: 6,
                hoverBackgroundColor: '#6366f1',
            },
            {
                label: 'Target',
                data: habits.map((habit) => habit.target_frequency),
                backgroundColor: 'rgba(148, 163, 184, 0.2)', // Slate-400 similar
                borderRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#94a3b8', // slate-400
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12,
                    }
                }
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                },
                ticks: {
                    color: '#94a3b8',
                }
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#94a3b8',
                }
            }
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-xl"
        >
            <h3 className="text-lg font-semibold text-slate-200 mb-6">Overview</h3>
            <div className="h-64">
                <Bar data={data} options={options} />
            </div>
        </motion.div>
    );
};

export default HabitChart;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HabitList from './HabitList';
import AddHabitForm from './AddHabitForm';
import HabitChart from './HabitChart';

const Dashboard = () => {
    const [habits, setHabits] = useState([]);

    const fetchHabits = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/habits');
            setHabits(response.data);
        } catch (error) {
            console.error('Error fetching habits:', error);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">Habit Tracker</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AddHabitForm onHabitAdded={fetchHabits} />
                    <HabitChart habits={habits} />
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Habits</h2>
                    <HabitList
                        habits={habits}
                        onHabitUpdated={fetchHabits}
                        onHabitDeleted={fetchHabits}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

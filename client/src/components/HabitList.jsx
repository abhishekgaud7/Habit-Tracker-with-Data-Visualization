import React from 'react';
import axios from 'axios';

const HabitList = ({ habits, onHabitUpdated, onHabitDeleted }) => {
    const handleComplete = async (habit) => {
        const today = new Date().toISOString().split('T')[0];
        const completedDates = habit.completed_dates || [];

        if (completedDates.includes(today)) {
            alert('You already completed this habit today!');
            return;
        }

        try {
            await axios.patch(`http://localhost:5000/api/habits/${habit.id}`, {
                completed_dates: [...completedDates, today],
            });
            onHabitUpdated();
        } catch (error) {
            console.error('Error updating habit:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this habit?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/habits/${id}`);
            onHabitDeleted();
        } catch (error) {
            console.error('Error deleting habit:', error);
        }
    };

    return (
        <div className="space-y-4">
            {habits.map((habit) => (
                <div key={habit.id} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center transition hover:shadow-lg">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{habit.name}</h3>
                        <p className="text-gray-600">{habit.description}</p>
                        <p className="text-sm text-indigo-500 mt-1">
                            Target: {habit.target_frequency} times/week | Completed: {habit.completed_dates ? habit.completed_dates.length : 0} times
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleComplete(habit)}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            Mark Done
                        </button>
                        <button
                            onClick={() => handleDelete(habit.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            {habits.length === 0 && (
                <p className="text-center text-gray-500">No habits added yet. Start by adding one!</p>
            )}
        </div>
    );
};

export default HabitList;

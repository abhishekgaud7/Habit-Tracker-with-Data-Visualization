import React, { useState } from 'react';
import axios from 'axios';

const AddHabitForm = ({ onHabitAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [targetFrequency, setTargetFrequency] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/habits', {
                name,
                description,
                target_frequency: targetFrequency,
            });
            setName('');
            setDescription('');
            setTargetFrequency(1);
            onHabitAdded();
        } catch (error) {
            console.error('Error adding habit:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Habit</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Habit Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        placeholder="e.g., Drink Water"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Optional details"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Target Frequency (per week)</label>
                    <input
                        type="number"
                        min="1"
                        value={targetFrequency}
                        onChange={(e) => setTargetFrequency(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add Habit
                </button>
            </form>
        </div>
    );
};

export default AddHabitForm;

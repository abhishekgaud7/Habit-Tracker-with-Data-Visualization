import React, { useState } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const AddHabitForm = ({ onHabitAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [targetFrequency, setTargetFrequency] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-xl"
        >
            <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <Plus className="w-5 h-5 text-indigo-400" />
                </div>
                <h2 className="text-xl font-semibold text-slate-100">New Habit</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1.5">Habit Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                        required
                        placeholder="e.g., Morning Meditation"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1.5">Description (Optional)</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                        placeholder="Brief motivation or details"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1.5">Weekly Target: <span className="text-indigo-400 font-bold">{targetFrequency}</span> days</label>
                    <input
                        type="range"
                        min="1"
                        max="7"
                        value={targetFrequency}
                        onChange={(e) => setTargetFrequency(e.target.value)}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>1 day</span>
                        <span>7 days</span>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium py-3 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none"
                >
                    {isLoading ? 'Creating...' : 'Create Habit'}
                </button>
            </form>
        </motion.div>
    );
};

export default AddHabitForm;

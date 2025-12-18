import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HabitList from './HabitList';
import AddHabitForm from './AddHabitForm';
import HabitChart from './HabitChart';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [habits, setHabits] = useState([]);

    const fetchHabits = async () => {
        try {
            const response = await axios.get('/api/habits');
            setHabits(response.data);
        } catch (error) {
            console.error('Error fetching habits:', error);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-4 mb-8"
                >
                    <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20">
                        <Activity className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            Habit Tracker
                        </h1>
                        <p className="text-slate-400 text-sm">Visualize your consistency</p>
                    </div>
                </motion.header>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Form & List */}
                    <div className="lg:col-span-7 space-y-8">
                        <AddHabitForm onHabitAdded={fetchHabits} />

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-slate-200 flex items-center">
                                Your Habits
                                <span className="ml-3 px-2 py-0.5 text-xs bg-slate-800 text-slate-400 rounded-full border border-slate-700">
                                    {habits.length}
                                </span>
                            </h2>
                            <HabitList
                                habits={habits}
                                onHabitUpdated={fetchHabits}
                                onHabitDeleted={fetchHabits}
                            />
                        </section>
                    </div>

                    {/* Right Column: Charts */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-8">
                            <HabitChart habits={habits} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

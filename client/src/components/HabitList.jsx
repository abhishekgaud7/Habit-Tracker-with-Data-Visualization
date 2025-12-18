import React from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Trash2, Trophy } from 'lucide-react';

const HabitList = ({ habits, onHabitUpdated, onHabitDeleted }) => {
    const handleComplete = async (habit) => {
        const today = new Date().toISOString().split('T')[0];
        const completedDates = habit.completed_dates || [];

        if (completedDates.includes(today)) {
            return; // Already completed today
        }

        try {
            await axios.patch(`/api/habits/${habit.id}`, {
                completed_dates: [...completedDates, today],
            });
            onHabitUpdated();
        } catch (error) {
            console.error('Error updating habit:', error);
        }
    };

    const handleDelete = async (id) => {
        // Optimization: Add a custom modal instead of window.confirm in future
        if (!window.confirm('Delete this habit?')) return;
        try {
            await axios.delete(`/api/habits/${id}`);
            onHabitDeleted();
        } catch (error) {
            console.error('Error deleting habit:', error);
        }
    };

    return (
        <div className="space-y-4">
            <AnimatePresence>
                {habits.map((habit) => {
                    const completedCount = habit.completed_dates ? habit.completed_dates.length : 0;
                    const progress = Math.min((completedCount / (habit.target_frequency * 4)) * 100, 100); // Rough monthly progress example
                    const isCompletedToday = habit.completed_dates && habit.completed_dates.includes(new Date().toISOString().split('T')[0]);

                    return (
                        <motion.div
                            key={habit.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-5 rounded-2xl group hover:border-slate-600 transition-colors"
                        >
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-slate-100">{habit.name}</h3>
                                    {habit.description && <p className="text-sm text-slate-400">{habit.description}</p>}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleComplete(habit)}
                                        disabled={isCompletedToday}
                                        className={`p-2 rounded-xl transition-all ${isCompletedToday
                                                ? 'bg-green-500/20 text-green-400 cursor-default'
                                                : 'bg-slate-700 text-slate-400 hover:bg-indigo-600 hover:text-white'
                                            }`}
                                        title={isCompletedToday ? "Done for today" : "Mark as done"}
                                    >
                                        <Check className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(habit.id)}
                                        className="p-2 rounded-xl text-slate-500 hover:bg-red-500/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="flex justify-between text-xs text-slate-500 mb-1.5 middle-align">
                                    <div className="flex items-center space-x-1">
                                        <Trophy className="w-3 h-3 text-amber-500" />
                                        <span>Target: {habit.target_frequency}/week</span>
                                    </div>
                                    <span>{completedCount} total completions</span>
                                </div>
                                {/* Visual Progress Bar (Just for fun visualization) */}
                                <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min((completedCount % habit.target_frequency) / habit.target_frequency * 100, 100)}%` }}
                                        className="h-full bg-gradient-to-r from-indigo-500 to-pink-500"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>

            {habits.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-slate-500 bg-slate-800/20 rounded-2xl border border-dashed border-slate-700"
                >
                    <p>No habits yet. Create one to get started!</p>
                </motion.div>
            )}
        </div>
    );
};

export default HabitList;

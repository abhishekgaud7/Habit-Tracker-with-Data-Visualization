const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');

// GET all habits
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('habits')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
});

// POST a new habit
router.post('/', async (req, res) => {
    const { name, description, target_frequency } = req.body;
    const { data, error } = await supabase
        .from('habits')
        .insert([{ name, description, target_frequency }])
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data);
});

// PATCH update habit (e.g., mark complete)
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { completed_dates } = req.body; // Expecting array of dates

    const { data, error } = await supabase
        .from('habits')
        .update({ completed_dates })
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
});

// DELETE a habit
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase
        .from('habits')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: 'Habit deleted' });
});

module.exports = router;

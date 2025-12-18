const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const habitRoutes = require('./routes/habitRoutes');
app.use('/api/habits', habitRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Habit Tracker API is running');
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;

// server/server.js ke end mein ye line zaroor honi chahiye
// module.exports = app;
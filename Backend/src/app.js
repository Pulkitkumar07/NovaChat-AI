const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require('./routes/chat.routes');

const cors = require('cors');
const path = require("path");

const app = express();

/* Middleware */
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

/* Routes */
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

/* Serve frontend */
app.get('/*name', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;

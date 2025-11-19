const express=require("express");
const cookieParser=require('cookie-parser')
const authRoutes=require("./routes/auth.routes")
const chatRoutes=require('./routes/chat.routes')
const cors =require('cors')
const path = require('path');
/* Using middleware */
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://chat-gpt-clone-1-gz4v.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));



/* Using Routes */
app.use('/api/auth',authRoutes)
app.use('/api/chat',chatRoutes)

app.use(express.static(path.join(__dirname, '../public')));

app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports=app;
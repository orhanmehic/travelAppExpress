const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const travelRoutes = require('./routes/travelsRoutes')
const questionRoutes = require('./routes/questionsRoutes')
const cors = require('cors');
const app = express();
const port = 5000;
const session = require('express-session');

app.use(cors({
    origin: 'http://localhost:3000', // Update with your frontend URL
    credentials: true,
}));
app.use(express.json());
app.use(
    session({
        secret: 'ole123', // Change this to a secret key for session encryption
        resave: false,
        saveUninitialized: false,
    })
);
mongoose.connect('mongodb://localhost:27017/travelApp');
app.use('/api', userRoutes);
app.use('/api',travelRoutes);
app.use('/api', questionRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

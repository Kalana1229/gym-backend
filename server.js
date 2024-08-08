const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const cors = require('cors'); // Import cors package
require('dotenv').config();

//express app
const app = express();

//middleware
app.use(cors()); // Enable CORS
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
app.use('/api/workouts', workoutRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
        console.log('Connected to the db & listening on port', process.env.PORT);
    });
})
.catch((error) => {
    console.log("Error while connecting to the database", error);
});

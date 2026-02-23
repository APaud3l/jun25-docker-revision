const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/testdb';
const NODE_ENV = process.env.NODE_ENV || 'development';

mongoose.connect(MONGO_URL)
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.error('MongoDB connection error: ', err));

app.get('/', (request, response) => {
    response.json(
        {
            "message": "Express and Mongo Server is running!!"
        }
    )
});

app.get('/health', (request, response) => {
    response.json(
        {
            "status": "OK",
            env: NODE_ENV
        }
    )
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});
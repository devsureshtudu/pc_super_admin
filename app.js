const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');


const apartmentRoutes = require('./routes/apartment');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/v1/', apartmentRoutes);


mongoose.connect('mongodb://amdsubham:Suresh1234@31.220.21.195:27135/admin',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('You are connected to apartment-db!')
        app.listen(3000);
    })
    .catch((error) => {
        console.log('Connection to apartment-db failed', error)
    });


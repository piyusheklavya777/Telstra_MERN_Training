const express = require('express');
const app = express();

app.use('/', (req,res) => {
    console.log('main:index.js app.use(/) ')
    res.write('main:index.js app.use(/) ');
})
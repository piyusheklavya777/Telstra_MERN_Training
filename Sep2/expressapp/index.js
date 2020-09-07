const path = require('path')
const express = require('express');
const app = express();
const indexRouter = require('./routes')

app.use('/', (req,res, next) => {
    console.log('main:index.js app.use(/) ')
    //res.send('Dodo')
    //next()
})


app.use( express.static( path.join( __dirname, 'public' ) ) );

//the below code is a part of initializing localhost
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server started at http://localhost:${PORT}/`)
})
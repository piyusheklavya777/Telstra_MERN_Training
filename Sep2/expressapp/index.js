const path = require('path')
const express = require('express');
const app = express();
const indexRouter = require('./routes')

app.use('/', (req,res) => {
    console.log('main:index.js app.use(/) ')
  // res.write('main:index.js app.use(/) ')
  //  res.end('\n\nEOF res.end()')
})
app.use( express.static( path.join( __dirname, 'public' ) ) );

//the below code is a part of initializing localhost
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server started at http://localhost:${PORT}/`)
})
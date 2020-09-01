const express = require('express');
const app = express();

app.use('/', (req,res) => {
    console.log('main:index.js app.use(/) ')
    res.write('main:index.js app.use(/) ');
    res.end('\n\nEOF res.end()')
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server started at http://localhost:${PORT}/`)
})
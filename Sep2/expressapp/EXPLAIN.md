- Create a folder for this application. "ExpressApp". cmd, 'code .' . set up git...
- Now npm init -y in that folder to create package.json file.

# This application is to be run by npm start, so it needs a handler file; create it and connect it to npm start's endpoint.
- Create a file at project folder level: ExpressApp>index.js.
- In package.json :  "main": "index.js" .
- Also, for hot reload(this will create node_modules. gitignore it): npm i nodemon

# Express is used as a handler in index.js file.
- npm i express
- In index.js , require and instantiate express : const express = require('express'); const app = express();

# After express is called, it should show something somewhere. 

# SOMETHING : 
- Make a public folder that will contain all the HTML files. : ExpressApp>public
- Make an index.html file for the router to find by default when the expressapp() redirects it to the public folder.
- In index.js file app.use() the public folder : const path = require('path');  app.use( express.static( path.join( __dirname, 'public' ) ) );

# SOMEWHERE :
- const PORT = process.env.PORT || 3000;
- app.listen(   PORT , ()=>{ console.log(`server started at http://localhost:${PORT}/`) }   )

# Instead of returning the public folder files, other things can also be done. Do anything in app.use(), and then, use next() for the     execution cursor to move to the next app.use() which is the one given above. Next has to called for skip to next app.use() in index folder. All middleware i.e. app.use() has to be written before app.listen().
- app.use('/', (req,res,next)=>{ |DO WHATEVER THEN| next()})

# *In the case of PUT or POST requests, incoming objects have to be treated as JSON objects or STRINGS/ARRAY of STRINGS, for that use, body-parser functions: (* more clarity needed )
- to parse form data       : app.use( express.urlencoded() );
- ajax-submitted JSON data : app.use( express.json() );

# CONCEPT OF NEXT. index.js's first app.use() gets called first. it is executed and then the excu stays there. If no response is sent in this app.use(), nothing will be recieved by the PORT. To move excu to the next app.use(), use next().  The excu moves to the next app.use() in that file. Now this app.use() will be executed and excu will return to the first app.use(). excu is now right after next() in first app.use(). This FALLBACK strategy is used by excu. To extend this linearly to the next app.use() in the file, keep using next() with all app.use() unless u want a FALLBACK now. To create a tree kind structure :

# All routing cannot be done here in index.js. Less modular this way. Make a routes folder and in it two routing files and use them for products and default requests
- ExpressApp>routes>index.js+products.js ... for simplicity, this index file will be referred to as routeIndex.js in this explanation.
- In index.js const indexRouter = require( './routes/index' ); const productsRouter = require( './routes/products' );
- ###############################################################
- app.use( indexRouter ); app.use( productsRouter );
#  app.use('/products', productsRouter ); cannot be used as syntax is not supported. With a routing directory e.g. '/products' or '/' , only a callback fn can be used i.e. (req,res, next[op], err[op]). So we just say app.use( productsRouter ); in index.js and in the productsRouter file, we say router.get('/products', ( req, res ) => {DO WHATEVER})

# if there are two routes : app.use('/products', cb1) & app.use('/products/:id', cb2)  and a request /products/5 appears, callback2(cb2) will be run. The two app.use() are to be kept as siblings against instinct.

# Now in productsRouter we will either show the data in proper HTML format or we will return the data in json format if the req.query.format is json.
- Create ExpressApp>data>seed.json and put the json object of data there.
- In case of HTML option 
- In productsRouter file, 
 const data = require('../data/seed) res.json(data)

app.use('/', (req,res) => {
    console.log('main:index.js app.use(/) ')
})
